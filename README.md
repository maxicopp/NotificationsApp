# NotificationApp

Aplicación React Native que simula un sistema de recepción de alertas vía push notifications con gestión completa de notificaciones.

## Características

- Listado de notificaciones estilo inbox
- Simulación de notificaciones push
- Distinción visual entre leídas/no leídas
- Pantalla de detalle 
- Animaciones 
- Soporte para tema claro/oscuro
- Badge con contador de no leídas

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

## Imágenes
<img width="1091" alt="Screenshot 2025-06-27 at 6 22 20 PM" src="https://github.com/user-attachments/assets/4448320b-e69f-425e-bf4c-8b76d22c9ce2" />
<img width="1103" alt="Screenshot 2025-06-27 at 6 22 08 PM" src="https://github.com/user-attachments/assets/be08f7b6-dfd8-4633-a106-5e6f5731beaf" />
<img width="1133" alt="Screenshot 2025-06-27 at 6 21 59 PM" src="https://github.com/user-attachments/assets/deb611cd-55d8-4408-ace5-392df1ae0e06" />
<img width="1171" alt="Screenshot 2025-06-27 at 6 21 34 PM" src="https://github.com/user-attachments/assets/00f48f0f-0b61-480d-a31f-0a65dd9f5aab" />
<img width="1083" alt="Screenshot 2025-06-27 at 6 21 15 PM" src="https://github.com/user-attachments/assets/8ccdf7bc-6c0d-4d47-b9ec-1f1816bec4fd" />
<img width="1122" alt="Screenshot 2025-06-27 at 6 21 02 PM" src="https://github.com/user-attachments/assets/a675f98d-cf5f-4cc2-944b-e18c50422893" />
<img width="1125" alt="Screenshot 2025-06-27 at 6 20 43 PM" src="https://github.com/user-attachments/assets/d32c5112-2ca4-4bcb-afc7-275272a6eed5" />


