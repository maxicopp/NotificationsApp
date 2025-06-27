# NotificationApp

Aplicación React Native que simula un sistema de recepción de alertas vía push notifications con gestión completa de notificaciones.

## Características

- 📱 Listado de notificaciones estilo inbox
- 🔔 Simulación de notificaciones push
- 👀 Distinción visual entre leídas/no leídas
- 📄 Pantalla de detalle completa
- 🎨 Animaciones fluidas
- 🌙 Soporte para tema claro/oscuro
- 📊 Badge con contador de no leídas

## Requisitos

- Node.js >= 18
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)

## Instalación

1. **Clonar e instalar dependencias:**
```bash
git clone https://github.com/maxicopp/NotificationsApp.git
cd NotificationApp
yarn install
```

2. **Para iOS (solo si vas a ejecutar en iOS):**
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

## Ejecutar la aplicación

### Iniciar Metro (servidor de desarrollo)
```bash
yarn start
```

### Android
En una nueva terminal:
```bash
yarn android
```

### iOS
En una nueva terminal:
```bash
yarn ios
```

## Uso

- **Generar notificación:** Toca el botón `+` para simular una nueva notificación
- **Ver detalle:** Toca cualquier notificación para ver el detalle completo
- **Actualizar:** Desliza hacia abajo para refrescar la lista
- **Limpiar:** Usa el botón "Limpiar todo" para eliminar todas las notificaciones

## Tecnologías

- React Native 0.80
- TypeScript
- React Navigation
- Context API para estado global
- Custom Hooks para lógica reutilizable

## Scripts disponibles

```bash
yarn start          # Iniciar Metro
yarn android        # Ejecutar en Android
yarn ios           # Ejecutar en iOS
yarn lint          # Verificar código con ESLint
```
