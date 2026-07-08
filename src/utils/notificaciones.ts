export const solicitarPermisoNotificacion = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn('Notificaciones no soportadas en este navegador.');
    return false;
  }
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const permiso = await Notification.requestPermission();
  return permiso === 'granted';
};

export const enviarNotificacion = (titulo: string, opciones?: NotificationOptions) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try {
    new Notification(titulo, opciones);
  } catch (error) {
    console.warn('Error al enviar notificación:', error);
  }
};
