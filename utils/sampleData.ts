import { generateMedicationSchedule, Medication, saveMedication } from './storage';

// Sample medications for testing
export const sampleMedications: Medication[] = [
  {
    id: 1,
    name: 'Paracetamol',
    dosage: '500mg',
    frequency: 'daily',
    times: ['09:00', '18:00'],
    startDate: '2024-01-15',
    endDate: '2024-01-25',
    notes: 'Take with food',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Amoxicillin',
    dosage: '250mg',
    frequency: 'twice_daily',
    times: ['08:00', '20:00'],
    startDate: '2024-01-16',
    endDate: '2024-01-30',
    notes: 'Antibiotic - complete full course',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Vitamin D',
    dosage: '1000 IU',
    frequency: 'daily',
    times: ['12:00'],
    startDate: '2024-01-15',
    endDate: '',
    notes: 'Take with breakfast',
    createdAt: new Date().toISOString(),
  },
];

// Function to populate sample data
export const populateSampleData = async (): Promise<void> => {
  try {
    for (const medication of sampleMedications) {
      await saveMedication(medication);
      await generateMedicationSchedule(medication);
    }
    console.log('Sample data populated successfully');
  } catch (error) {
    console.error('Error populating sample data:', error);
  }
};
