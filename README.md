# Portal Fast Track

Portal Fast Track es la app que usan los perfiles "Profesionales" en el campo para seguir y gestionar reclamos, contactar clientes y mantenerse sincronizados con el portal web. 
Trabaja de manera directa con la API central desarrollada en Express JS.

## Objetivo del sistema
- Mostrar reclamos activos y finalizados asignados al usuario y el detalle de los mismos.
- Capacidad de gestion de reclamos en proceso.
- Contactos rapidos con empresa.
- Gestion de fila de trabajo para recibir / no recibir nuevos reclamos.
- Gestion de perfil.
- Envio de feedback al sistema.
- Notificaciones ante actualizaciones, recordatorios o asignaciones de reclamos.

## Estructura del proyecto
- `App.tsx` providers, navegación y ui global.
- `src/components` botones, headers, layouts y elementoss reutilizables, forms, inputs, menu, etc.
- `src/screens` capa para pantallas (auth, dashboard, claims, profile, etc.).
- `src/services` llamos a api y manejos de autenticacion y notificaciones.
- `android/` guardado de wrapper nativo gestionado por Expo `run:android` y EAS.


## Particularidades
- Capa aislada de navegacion para rapida implementacion de nuevas opciones `routes.config.ts`.
- Extensa reutilizacion de componentes para mantener equilibrio y balance del branding en la aplicacion.

## Dependencias y variables
- Expo SDK + React Native, navegación con `@react-navigation/*` (clave) y notificaciones vía `expo-notifications`.
- La selección de entorno se resuelve en `src/constants/config.ts`: `__DEV__` usa `dev.apiUrl` (LAN) y release cae en `prod.apiUrl`. Va a depender del entorno y contexto. Se recomienda revisar tambien el repositorio Backend.
- No hay `.env` aún; por ahora las credenciales (tokens, claves push) vienen del backend o de la configuración de Expo.

## Dev local
1. Node 18+ (o no tan antiguo) y la CLI de Expo (`npm install -g expo`) instalados.
2. `npm install` para instalar dependencias.
3. `npm start` abre Expo DevTools; escaneá el QR con Expo Go o usá `npm run android` / `npm run ios`.
4. Si algo se rompe, `npm run reset-project` limpia caches metro + Android.
5. Mantén la API dev (`http://192.168.0.37:8888`) accesible desde tu dispositivo/emulador. (validar ipconfing en cmd para actualizar ip)


## Deploy
- Configurá tu cuenta de Expo/EAS (`eas login`) y asegurate de tener los certificados cargados.
- `eas build --platform android --profile production` genera el arteefacto firmado; para iOS cambiá `--platform ios` (no testeado en profundidad)
- Validáa en dispositivos físicos y, si todo ok, `eas submit` lo envía a la store correspondiente.
- Cuando publiques un nuevo backend, recordá actualizar `config.ts` si la URL cambió y versionar la app para despejar cachés en clientes.


## Testings hechos:
- En dev:
    - Iphone 15 pro (fisico)
    - Samsung (fisico)
    - Xiaomi (fisico)
    - Pixel 6, 7 y 8 (emulado android studio)
    - Samsung (emulado android studio)
- En prod 
    - Iphone 15 pro (fisico)
    - Samsung (fisico)
    - Xiaomi (fisico)