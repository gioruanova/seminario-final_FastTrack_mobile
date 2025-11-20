const fs = require('fs');
const path = require('path');

const source = process.env.GOOGLE_SERVICES_JSON;

if (!source) {
  console.error('GOOGLE_SERVICES_JSON secret no está disponible.');
  process.exit(1);
}

if (!fs.existsSync(source)) {
  console.error(`El archivo proporcionado por GOOGLE_SERVICES_JSON no existe: ${source}`);
  process.exit(1);
}

const destination = path.join(__dirname, '..', 'android', 'app', 'google-services.json');

fs.copyFileSync(source, destination);
console.log(`[hook] google-services.json copiado a ${destination}`);

