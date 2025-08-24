import * as Notifications from 'expo-notifications';
import { Medication, MedicationSchedule } from './storage';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export class NotificationService {
  static async requestPermissions(): Promise<boolean> {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }

  static async scheduleMedicineReminder(
    medication: Medication,
    schedule: MedicationSchedule
  ): Promise<string> {
    try {
      // Parse the time (e.g., "09:00" -> 9 hours, 0 minutes)
      const [hours, minutes] = schedule.time.split(':').map(Number);
      const scheduleDate = new Date(schedule.date);
      scheduleDate.setHours(hours, minutes, 0, 0);

      // Don't schedule if the time has already passed
      if (scheduleDate <= new Date()) {
        return '';
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '💊 Medicine Reminder',
          body: `Time to take ${medication.name} (${medication.dosage})`,
          data: {
            medicationId: medication.id,
            scheduleId: schedule.id,
            medicationName: medication.name,
            dosage: medication.dosage,
            time: schedule.time,
            date: schedule.date,
          },
          sound: 'default',
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          date: scheduleDate,
        },
      });

      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return '';
    }
  }

  static async scheduleAllMedicineReminders(
    medications: Medication[],
    schedules: MedicationSchedule[]
  ): Promise<void> {
    try {
      // Cancel all existing notifications first
      await this.cancelAllNotifications();

      // Schedule new notifications for pending medications
      const pendingSchedules = schedules.filter(schedule => schedule.status === 'pending');
      
      for (const schedule of pendingSchedules) {
        const medication = medications.find(med => med.id === schedule.medicationId);
        if (medication) {
          await this.scheduleMedicineReminder(medication, schedule);
        }
      }
    } catch (error) {
      console.error('Error scheduling all notifications:', error);
    }
  }

  static async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }

  static async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling all notifications:', error);
    }
  }

  static async cancelNotificationsForMedication(medicationId: number): Promise<void> {
    try {
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      
      for (const notification of scheduledNotifications) {
        if (notification.content.data?.medicationId === medicationId) {
          await Notifications.cancelScheduledNotificationAsync(notification.identifier);
        }
      }
    } catch (error) {
      console.error('Error canceling notifications for medication:', error);
    }
  }

  static async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }

  static async showTestNotification(): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '💊 Test Medicine Reminder',
          body: 'This is a test notification for medicine reminder',
          sound: 'default',
        },
        trigger: {
          seconds: 5, // Show after 5 seconds
        },
      });
    } catch (error) {
      console.error('Error showing test notification:', error);
    }
  }
}

// Set up notification listeners
export const setupNotificationListeners = () => {
  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received:', notification);
  });

  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    console.log('Notification response:', response);
    // Handle notification tap here if needed
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
};
