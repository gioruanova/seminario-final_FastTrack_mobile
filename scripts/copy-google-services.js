const fs = require('fs');
const path = require('path');

const source = process.env.GOOGLE_SERVICES_JSON;
const rootDestination = path.join(__dirname, '..', 'google-services.json');
const androidDestination = path.join(
  __dirname,
  '..',
  'android',
  'app',
  'google-services.json'
);

if (!source) {
  if (fs.existsSync(rootDestination)) {
    console.log('[hook] GOOGLE_SERVICES_JSON no provisto; usando archivo existente en la raíz.');
    fs.copyFileSync(rootDestination, androidDestination);
    console.log('[hook] Copiado archivo raíz a android/app/google-services.json');
    process.exit(0);
  } else {
    console.warn('[hook] GOOGLE_SERVICES_JSON no está definido y no existe archivo en la raíz. Continuando sin copiar.');
    process.exit(0);
  }
}

if (!fs.existsSync(source)) {
  console.error(`El archivo proporcionado por GOOGLE_SERVICES_JSON no existe: ${source}`);
  process.exit(1);
}

fs.copyFileSync(source, rootDestination);
console.log(`[hook] google-services.json copiado a ${rootDestination}`);

fs.copyFileSync(rootDestination, androidDestination);
console.log(`[hook] google-services.json copiado a ${androidDestination}`);

