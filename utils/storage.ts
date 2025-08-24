import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NotificationService } from './notificationService';

// Types
export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate: string;
  notes: string;
  createdAt: string;
}

export interface MedicationSchedule {
  id: number;
  medicationId: number;
  date: string;
  time: string;
  status: 'taken' | 'missed' | 'skipped' | 'pending';
}

// Storage Keys
const STORAGE_KEYS = {
  MEDICATIONS: 'medications',
  SCHEDULE: 'medication_schedule',
};

// Medication Storage Functions
export const saveMedication = async (medication: Medication): Promise<void> => {
  try {
    const existingMedications = await getMedications();
    const updatedMedications = [...existingMedications, medication];
    await AsyncStorage.setItem(STORAGE_KEYS.MEDICATIONS, JSON.stringify(updatedMedications));
  } catch (error) {
    console.error('Error saving medication:', error);
    throw error;
  }
};

export const getMedications = async (): Promise<Medication[]> => {
  try {
    const medicationsJson = await AsyncStorage.getItem(STORAGE_KEYS.MEDICATIONS);
    return medicationsJson ? JSON.parse(medicationsJson) : [];
  } catch (error) {
    console.error('Error getting medications:', error);
    return [];
  }
};

export const updateMedication = async (medication: Medication): Promise<void> => {
  try {
    const existingMedications = await getMedications();
    const updatedMedications = existingMedications.map(med => 
      med.id === medication.id ? medication : med
    );
    await AsyncStorage.setItem(STORAGE_KEYS.MEDICATIONS, JSON.stringify(updatedMedications));
  } catch (error) {
    console.error('Error updating medication:', error);
    throw error;
  }
};

export const deleteMedication = async (medicationId: number): Promise<void> => {
  try {
    // Delete the medication
    const existingMedications = await getMedications();
    const updatedMedications = existingMedications.filter(med => med.id !== medicationId);
    await AsyncStorage.setItem(STORAGE_KEYS.MEDICATIONS, JSON.stringify(updatedMedications));
    
    // Delete all schedule entries for this medication
    const existingSchedule = await getMedicationSchedule();
    const updatedSchedule = existingSchedule.filter(schedule => schedule.medicationId !== medicationId);
    await AsyncStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(updatedSchedule));
    
    // Cancel notifications for the deleted medication
    // await NotificationService.cancelNotificationsForMedication(medicationId);
  } catch (error) {
    console.error('Error deleting medication:', error);
    throw error;
  }
};

// Schedule Storage Functions
export const saveMedicationSchedule = async (schedule: MedicationSchedule): Promise<void> => {
  try {
    const existingSchedule = await getMedicationSchedule();
    const updatedSchedule = [...existingSchedule, schedule];
    await AsyncStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(updatedSchedule));
  } catch (error) {
    console.error('Error saving schedule:', error);
    throw error;
  }
};

export const getMedicationSchedule = async (): Promise<MedicationSchedule[]> => {
  try {
    const scheduleJson = await AsyncStorage.getItem(STORAGE_KEYS.SCHEDULE);
    return scheduleJson ? JSON.parse(scheduleJson) : [];
  } catch (error) {
    console.error('Error getting schedule:', error);
    return [];
  }
};

export const updateMedicationStatus = async (
  scheduleId: number, 
  status: 'taken' | 'missed' | 'skipped' | 'pending'
): Promise<void> => {
  try {
    const existingSchedule = await getMedicationSchedule();
    const updatedSchedule = existingSchedule.map(schedule => 
      schedule.id === scheduleId ? { ...schedule, status } : schedule
    );
    await AsyncStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(updatedSchedule));
    
    // If status is changed to taken/missed/skipped, cancel the notification
    if (status !== 'pending') {
      const schedule = existingSchedule.find(s => s.id === scheduleId);
      if (schedule) {
        const medications = await getMedications();
        const medication = medications.find(m => m.id === schedule.medicationId);
        if (medication) {
          // Cancel the specific notification for this schedule
          // const scheduledNotifications = await NotificationService.getScheduledNotifications();
          // for (const notification of scheduledNotifications) {
          //   if (notification.content.data?.scheduleId === scheduleId) {
          //     await NotificationService.cancelNotification(notification.identifier);
          //     break;
          //   }
          // }
        }
      }
    }
  } catch (error) {
    console.error('Error updating medication status:', error);
    throw error;
  }
};

// Helper function to generate schedule for a medication
export const generateMedicationSchedule = async (medication: Medication): Promise<void> => {
  try {
    const startDate = new Date(medication.startDate);
    const endDate = medication.endDate ? new Date(medication.endDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from now if no end date
    
    const schedule: MedicationSchedule[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      
      // Add schedule entries for each time
      medication.times.forEach(time => {
        schedule.push({
          id: Date.now() + Math.random(), // Generate unique ID
          medicationId: medication.id,
          date: dateString,
          time: time,
          status: 'pending',
        });
      });
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Save all schedule entries
    const existingSchedule = await getMedicationSchedule();
    const updatedSchedule = [...existingSchedule, ...schedule];
    await AsyncStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(updatedSchedule));
    
    // Schedule notifications for the new medication
    // await NotificationService.scheduleAllMedicineReminders([medication], schedule);
  } catch (error) {
    console.error('Error generating medication schedule:', error);
    throw error;
  }
};

// Helper function to regenerate schedule for an existing medication (for updates)
export const regenerateMedicationSchedule = async (medication: Medication): Promise<void> => {
  try {
    // First, remove existing schedule entries for this medication
    const existingSchedule = await getMedicationSchedule();
    const filteredSchedule = existingSchedule.filter(schedule => schedule.medicationId !== medication.id);
    
    // Cancel existing notifications for this medication
    // await NotificationService.cancelNotificationsForMedication(medication.id);
    
    // Generate new schedule entries
    const startDate = new Date(medication.startDate);
    const endDate = medication.endDate ? new Date(medication.endDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    
    const newSchedule: MedicationSchedule[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      
      // Add schedule entries for each time
      medication.times.forEach(time => {
        newSchedule.push({
          id: Date.now() + Math.random(), // Generate unique ID
          medicationId: medication.id,
          date: dateString,
          time: time,
          status: 'pending',
        });
      });
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Combine filtered existing schedule with new schedule
    const updatedSchedule = [...filteredSchedule, ...newSchedule];
    await AsyncStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(updatedSchedule));
    
    // Schedule new notifications for the updated medication
    // await NotificationService.scheduleAllMedicineReminders([medication], newSchedule);
  } catch (error) {
    console.error('Error regenerating medication schedule:', error);
    throw error;
  }
};

// Get medications for a specific date
export const getMedicationsForDate = async (date: string): Promise<MedicationSchedule[]> => {
  try {
    const schedule = await getMedicationSchedule();
    return schedule.filter(item => item.date === date);
  } catch (error) {
    console.error('Error getting medications for date:', error);
    return [];
  }
};

// Clear all data (for testing)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.MEDICATIONS, STORAGE_KEYS.SCHEDULE]);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};

// Clean up orphaned schedule entries (schedule entries for medications that no longer exist)
export const cleanupOrphanedSchedules = async (): Promise<void> => {
  try {
    const medications = await getMedications();
    const schedule = await getMedicationSchedule();
    
    // Get all medication IDs
    const medicationIds = medications.map(med => med.id);
    
    // Filter out schedule entries that reference non-existent medications
    const validSchedule = schedule.filter(scheduleItem => 
      medicationIds.includes(scheduleItem.medicationId)
    );
    
    // Save the cleaned schedule
    await AsyncStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(validSchedule));
    
    console.log(`Cleaned up ${schedule.length - validSchedule.length} orphaned schedule entries`);
  } catch (error) {
    console.error('Error cleaning up orphaned schedules:', error);
  }
};
