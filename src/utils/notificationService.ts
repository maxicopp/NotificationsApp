import { Notification, AlertType } from '../types';

class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];
  private listeners: Array<(notifications: Notification[]) => void> = [];

  private constructor() {
    this.startSimulation();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public configure(): void {
    console.log('🔔 Servicio de notificaciones configurado');
  }

  public addListener(callback: (notifications: Notification[]) => void): void {
    this.listeners.push(callback);
  }

  public removeListener(
    callback: (notifications: Notification[]) => void,
  ): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }

  private startSimulation(): void {
    setInterval(() => {
      this.simulateNotification();
    }, 20000);
  }

  private getNotificationContent(type: AlertType): {
    title: string;
    description: string;
  } {
    const contentMap = {
      [AlertType.INFO]: {
        titles: [
          '📱 Nueva función disponible',
          '📊 Informe semanal listo',
          '🔄 Sincronización completa',
          '📈 Estadísticas actualizadas',
          '🌟 Descubre las novedades',
          '📚 Nuevo contenido disponible',
          '🎯 Objetivo alcanzado',
          '💡 Consejo del día',
        ],
        descriptions: [
          'Hemos añadido nuevas funcionalidades que mejorarán tu experiencia. Explora las últimas características.',
          'Tu informe semanal de actividad ya está disponible. Revisa tu progreso y logros.',
          'Todos tus datos se han sincronizado correctamente en la nube.',
          'Las estadísticas de tu cuenta han sido actualizadas con la información más reciente.',
          'Tenemos nuevas características emocionantes para que descubras. ¡No te las pierdas!',
          'Hay nuevo contenido esperándote. Mantente al día con las últimas actualizaciones.',
          'Felicidades, has completado tu objetivo diario. ¡Sigue así!',
          'Aquí tienes un consejo útil para optimizar tu uso de la aplicación.',
        ],
      },
      [AlertType.SUCCESS]: {
        titles: [
          '✅ Operación exitosa',
          '🎉 ¡Enhorabuena!',
          '🏆 Logro desbloqueado',
          '💫 Tarea completada',
          '🚀 Proceso finalizado',
          '🌟 Perfil actualizado',
          '💾 Guardado exitoso',
          '📤 Enviado correctamente',
        ],
        descriptions: [
          'La operación se ha completado satisfactoriamente sin ningún problema.',
          'Has alcanzado un nuevo hito en tu progreso. ¡Excelente trabajo!',
          'Has desbloqueado un nuevo logro. Tu dedicación está dando frutos.',
          'La tarea programada se ha ejecutado correctamente y sin errores.',
          'El proceso en segundo plano ha finalizado exitosamente.',
          'Tu información de perfil ha sido actualizada con éxito.',
          'Todos los cambios han sido guardados correctamente en el sistema.',
          'Tu mensaje ha sido enviado exitosamente al destinatario.',
        ],
      },
      [AlertType.WARNING]: {
        titles: [
          '⚠️ Atención requerida',
          '🔔 Recordatorio importante',
          '⏰ Acción pendiente',
          '📋 Revisión necesaria',
          '🔧 Mantenimiento programado',
          '📊 Límite próximo',
          '🔐 Verificación pendiente',
          '📱 Actualización recomendada',
        ],
        descriptions: [
          'Hay algunos elementos que requieren tu atención antes de continuar.',
          'No olvides completar las tareas pendientes en tu lista de actividades.',
          'Tienes acciones importantes que están esperando tu confirmación.',
          'Es recomendable que revises la configuración de tu cuenta.',
          'Se realizará mantenimiento programado en las próximas horas.',
          'Te estás acercando al límite de tu plan actual. Considera actualizar.',
          'Tu cuenta necesita verificación adicional por seguridad.',
          'Hay una nueva versión disponible con mejoras importantes.',
        ],
      },
      [AlertType.ERROR]: {
        titles: [
          '❌ Error detectado',
          '🚨 Problema crítico',
          '⛔ Acceso denegado',
          '💥 Fallo en el sistema',
          '🔒 Sesión expirada',
          '📶 Error de conexión',
          '💔 Proceso interrumpido',
          '🚫 Operación cancelada',
        ],
        descriptions: [
          'Se ha detectado un error en el sistema que requiere atención inmediata.',
          'Hay un problema crítico que está afectando el funcionamiento normal.',
          'No tienes permisos suficientes para realizar esta operación.',
          'El sistema ha experimentado un fallo inesperado durante la operación.',
          'Tu sesión ha expirado por seguridad. Necesitas iniciar sesión nuevamente.',
          'No se pudo establecer conexión con el servidor. Verifica tu internet.',
          'El proceso ha sido interrumpido debido a un error inesperado.',
          'La operación ha sido cancelada debido a restricciones de seguridad.',
        ],
      },
    };

    const content = contentMap[type];
    const randomTitle =
      content.titles[Math.floor(Math.random() * content.titles.length)];
    const randomDescription =
      content.descriptions[
        Math.floor(Math.random() * content.descriptions.length)
      ];

    return { title: randomTitle, description: randomDescription };
  }

  private simulateNotification(): void {
    const types = Object.values(AlertType) as AlertType[];
    const weights = [0.4, 0.3, 0.2, 0.1]; // INFO, SUCCESS, WARNING, ERROR

    let random = Math.random();
    let selectedType = AlertType.INFO;

    for (let i = 0; i < types.length; i++) {
      if (random < weights[i]) {
        selectedType = types[i];
        break;
      }
      random -= weights[i];
    }

    const { title, description } = this.getNotificationContent(selectedType);

    const notification: Notification = {
      id: `notification_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      title,
      description,
      type: selectedType,
      timestamp: Date.now(),
      isRead: false,
    };

    this.notifications.unshift(notification);

    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50);
    }

    this.notifyListeners();
  }

  public generateTestNotification(): void {
    this.simulateNotification();
  }

  public markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification && !notification.isRead) {
      notification.isRead = true;
      this.notifyListeners();
    }
  }

  public removeNotification(notificationId: string): void {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index > -1) {
      this.notifications.splice(index, 1);
      this.notifyListeners();
    }
  }

  public getNotifications(): Notification[] {
    return [...this.notifications];
  }

  public getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  public clearAll(): void {
    this.notifications = [];
    this.notifyListeners();
  }
}

export default NotificationService;
