// ⚠️ Datos provisionales: reemplazar con la información real del cliente.
export const site = {
  name: 'Autos para Latinos',
  domain: 'https://autosparalatinos.com',
  phone: '(000) 000-0000',
  phoneHref: '+10000000000',
  email: 'info@autosparalatinos.com',
  address: { street: '123 Main St, Suite 1', city: 'Tu Ciudad', state: 'CA', zip: '00000' },
  hours: { es: 'Lun–Sáb 9AM–8PM · Dom 11AM–6PM', en: 'Mon–Sat 9AM–8PM · Sun 11AM–6PM' },
  social: { facebook: '#', instagram: '#', tiktok: '#' },
  heroVideo: '/video/hero.webm',
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
};

export const flags = [
  ['mx','México'],['gt','Guatemala'],['sv','El Salvador'],['hn','Honduras'],['ni','Nicaragua'],
  ['cr','Costa Rica'],['pa','Panamá'],['co','Colombia'],['ve','Venezuela'],['ec','Ecuador'],
  ['pe','Perú'],['bo','Bolivia'],['cl','Chile'],['ar','Argentina'],['uy','Uruguay'],
  ['py','Paraguay'],['do','Rep. Dominicana'],['cu','Cuba'],['pr','Puerto Rico'],
] as const;
