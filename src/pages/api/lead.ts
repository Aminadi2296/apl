// Endpoint del servidor (función de Vercel) que recibe los formularios y los envía por correo con Resend.
// Para habilitar otro formulario (prequal, apply) basta con agregarlo a `forms` con sus campos permitidos.
// ⚠️ Nunca agregar SSN/ITIN, fecha de nacimiento ni datos bancarios: el correo no es un canal seguro.
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

type Field = { key: string; label: string; required?: boolean; max?: number };
type FormConfig = { subject: (d: Record<string, string>) => string; fields: Field[]; replyTo?: string };

const forms: Record<string, FormConfig> = {
  contact: {
    subject: (d) => `Nuevo mensaje de contacto: ${d.name}`,
    replyTo: 'email',
    fields: [
      { key: 'name', label: 'Nombre', required: true, max: 120 },
      { key: 'email', label: 'Correo', required: true, max: 200 },
      { key: 'phone', label: 'Teléfono', max: 40 },
      { key: 'message', label: 'Mensaje', required: true, max: 5000 },
    ],
  },
  // prequal: { ... }  → definir con el cliente
  // apply:   { ... }  → definir con el cliente (sin datos sensibles)
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.LEADS_TO_EMAIL;
  const from = import.meta.env.LEADS_FROM_EMAIL || 'Autos para Latinos <onboarding@resend.dev>';
  if (!apiKey || !to) {
    console.error('[lead] Faltan RESEND_API_KEY o LEADS_TO_EMAIL');
    return json(500, { error: 'not_configured' });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  // Honeypot: los bots llenan el campo oculto. Respondemos OK para no darles pistas.
  if (body.company) return json(200, { ok: true });

  const config = forms[String(body.form)];
  if (!config) return json(400, { error: 'unknown_form' });

  // Solo se toman los campos permitidos; cualquier otro dato se descarta.
  const data: Record<string, string> = {};
  for (const f of config.fields) {
    const value = typeof body[f.key] === 'string' ? (body[f.key] as string).trim().slice(0, f.max ?? 500) : '';
    if (f.required && !value) return json(400, { error: 'missing_field', field: f.key });
    data[f.key] = value;
  }
  if (data.email && !EMAIL_RE.test(data.email)) return json(400, { error: 'invalid_email' });

  const rows = config.fields
    .filter((f) => data[f.key])
    .map(
      (f) =>
        `<tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top;white-space:nowrap">${f.label}</td>` +
        `<td style="padding:8px 12px;white-space:pre-wrap">${esc(data[f.key])}</td></tr>`,
    )
    .join('');
  const html = `<div style="font-family:Arial,sans-serif;color:#16232a">
    <h2 style="color:#ff5804;margin:0 0 12px">${esc(config.subject(data))}</h2>
    <table style="border-collapse:collapse;background:#f2f5f6;border-radius:8px">${rows}</table>
    <p style="font-size:12px;color:#666;margin-top:16px">Enviado desde el formulario del sitio web.</p>
  </div>`;
  const text = config.fields.map((f) => `${f.label}: ${data[f.key] || '-'}`).join('\n');

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: to.split(',').map((s: string) => s.trim()),
    subject: config.subject(data),
    html,
    text,
    replyTo: config.replyTo ? data[config.replyTo] || undefined : undefined,
  });
  if (error) {
    console.error('[lead] Resend error', error);
    return json(502, { error: 'send_failed' });
  }
  return json(200, { ok: true });
};
