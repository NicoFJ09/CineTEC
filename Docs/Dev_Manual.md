# CineTEC - Manual de Desarrollador

Guia corta para ubicar el codigo y ejecutar los comandos principales.

## Estructura del Proyecto

### Raiz

- `Docs/`: Documentacion general.
- `Frontend/`: Aplicacion Ionic + React.

### Frontend/

- `src/`: Codigo fuente principal.
- `src/components/`: Componentes reutilizables de UI.
- `src/pages/`: Pantallas completas (por ejemplo Home, Login).
- `src/models/`: Tipos e interfaces compartidas.
- `src/services/`: Llamadas a API y logica de datos.
- `src/utils/`: Utilidades y helpers.
- `public/`: Archivos estaticos.
- `android/`: Proyecto nativo Android de Capacitor.

## Comandos Principales

Ejecutar desde `Frontend/`.

| Objetivo | Comando |
| --- | --- |
| Instalar dependencias | `npm install` |
| Desarrollo web | `npm run dev` |
| Build web | `npm run build:web` |
| Build movil (cliente-only, sin Admin) | `npm run build:mobile` |
| Sincronizar Android con build movil | `npm run sync:android` |
| Abrir Android Studio | `npm run android` |
| Generar APK debug | `npm run apk:debug` |
| Lint | `npm run lint` |
| Type check | `npm run type-check` |
| Tests unitarios | `npm run test.unit` |
| Tests e2e | `npm run test.e2e` |

## Flujo Rapido APK (Cliente-Only)

1. `npm run sync:android`
2. `npm run apk:debug`

APK generado en:

`Frontend/android/app/build/outputs/apk/debug/app-debug.apk`
