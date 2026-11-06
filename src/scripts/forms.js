// Maneja todos los formularios con [data-lead-form].
// Sin PUBLIC_FORM_ENDPOINT => MODO PRUEBA (no envía nada).
// ⚠️ SSN/ITIN: no enviar por correo ni guardar sin cifrado. Definir el destino con el cliente antes de publicar.
document.querySelectorAll('form[data-lead-form]').forEach((form) => {
  const status = form.querySelector('[data-status]');
  const btn = form.querySelector('button[type=submit]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    if (data.company) return; // honeypot anti-spam
    const endpoint = form.dataset.endpoint;
    const msg = JSON.parse(form.dataset.msg);
    btn.disabled = true; status.textContent = msg.sending; status.className = 'mt-3 font-bold';
    try {
      if (endpoint) {
        const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ form: form.dataset.leadForm, ...data }) });
        if (!r.ok) throw new Error(r.status);
      } else { await new Promise((r) => setTimeout(r, 500)); console.info('[MODO PRUEBA]', form.dataset.leadForm); }
      status.textContent = msg.ok + (endpoint ? '' : ' ' + msg.test);
      status.className = 'mt-3 rounded bg-green-100 p-3 font-bold text-green-900';
      form.reset();
    } catch {
      status.textContent = msg.err;
      status.className = 'mt-3 rounded bg-red-100 p-3 font-bold text-red-900';
    } finally { btn.disabled = false; }
  });
});
