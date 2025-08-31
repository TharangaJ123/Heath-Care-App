import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getMedicationsForDate, MedicationSchedule, updateMedicationStatus, getMedications } from '../utils/storage';

export interface EnrichedMedicationSchedule extends MedicationSchedule {
  medicationName: string;
  dosage: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  color: string;
}

export interface AdherenceReport {
  period: 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  totalScheduled: number;
  taken: number;
  missed: number;
  skipped: number;
  adherencePercentage: number;
}

interface MedicationContextType {
  medications: Medication[];
  todaysSchedule: EnrichedMedicationSchedule[];
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  updateIntakeStatus: (scheduleId: number, status: 'taken' | 'missed' | 'skipped', actualTime?: string, notes?: string) => void;
  getTodaysIntakes: () => EnrichedMedicationSchedule[];
  getAdherenceReport: (period: 'daily' | 'weekly' | 'monthly', date: string) => AdherenceReport;
  getAdherenceHistory: (days: number) => Promise<{ date: string; percentage: number; status: 'good' | 'fair' | 'poor' }[]>;
  loadTodaysSchedule: () => Promise<void>;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [todaysSchedule, setTodaysSchedule] = useState<EnrichedMedicationSchedule[]>([]);

  const addMedication = (medication: Omit<Medication, 'id'>) => {
    const newMedication = {
      ...medication,
      id: Date.now().toString(),
    };
    setMedications(prev => [...prev, newMedication]);
  };

  const loadTodaysSchedule = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const schedule = await getMedicationsForDate(today);
      const allMedications = await getMedications();
      
      // Enrich schedule with medication details
      const enrichedSchedule: EnrichedMedicationSchedule[] = schedule.map(scheduleItem => {
        const medication = allMedications.find(med => med.id === scheduleItem.medicationId);
        return {
          ...scheduleItem,
          medicationName: medication?.name || 'Unknown Medication',
          dosage: medication?.dosage || 'Unknown Dosage'
        };
      });
      
      setTodaysSchedule(enrichedSchedule);
    } catch (error) {
      console.error('Error loading today\'s schedule:', error);
      setTodaysSchedule([]);
    }
  };

  const updateIntakeStatus = async (scheduleId: number, status: 'taken' | 'missed' | 'skipped', actualTime?: string, notes?: string) => {
    try {
      await updateMedicationStatus(scheduleId, status);
      // Reload today's schedule to reflect changes
      await loadTodaysSchedule();
    } catch (error) {
      console.error('Error updating medication status:', error);
    }
  };

  const getTodaysIntakes = () => {
    return todaysSchedule;
  };

  const getAdherenceReport = (period: 'daily' | 'weekly' | 'monthly', date: string): AdherenceReport => {
    const currentDate = new Date(date);
    let startDate: string;
    let endDate: string;
    
    // Calculate date ranges based on period
    switch (period) {
      case 'daily':
        startDate = date;
        endDate = date;
        break;
      case 'weekly':
        // Get start of week (Sunday)
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        startDate = startOfWeek.toISOString().split('T')[0];
        
        // Get end of week (Saturday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endDate = endOfWeek.toISOString().split('T')[0];
        break;
      case 'monthly':
        // Get start of month
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        startDate = startOfMonth.toISOString().split('T')[0];
        
        // Get end of month
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        endDate = endOfMonth.toISOString().split('T')[0];
        break;
    }
    
    // For now, return mock data based on today's schedule
    // In a real implementation, you would aggregate data across the date range
    const totalScheduled = todaysSchedule.length * (period === 'daily' ? 1 : period === 'weekly' ? 7 : 30);
    const taken = todaysSchedule.filter(item => item.status === 'taken').length * (period === 'daily' ? 1 : period === 'weekly' ? 7 : 30);
    const missed = todaysSchedule.filter(item => item.status === 'missed').length * (period === 'daily' ? 1 : period === 'weekly' ? 7 : 30);
    const skipped = todaysSchedule.filter(item => item.status === 'skipped').length * (period === 'daily' ? 1 : period === 'weekly' ? 7 : 30);
    
    const adherencePercentage = totalScheduled > 0 ? Math.round((taken / totalScheduled) * 100) : 0;
    
    return {
      period,
      startDate,
      endDate,
      totalScheduled,
      taken,
      missed,
      skipped,
      adherencePercentage,
    };
  };

  const getAdherenceHistory = async (days: number) => {
    const history = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      try {
        // Get actual medication schedule for this date
        const daySchedule = await getMedicationsForDate(dateString);
        const totalScheduled = daySchedule.length;
        const taken = daySchedule.filter(item => item.status === 'taken').length;
        
        const percentage = totalScheduled > 0 ? Math.round((taken / totalScheduled) * 100) : 0;
        let status: 'good' | 'fair' | 'poor';
        
        if (percentage >= 80) status = 'good';
        else if (percentage >= 60) status = 'fair';
        else status = 'poor';
        
        history.push({
          date: dateString,
          percentage,
          status,
        });
      } catch (error) {
        // Fallback to 0% if no data available
        history.push({
          date: dateString,
          percentage: 0,
          status: 'poor' as const,
        });
      }
    }
    
    return history;
  };

  return (
    <MedicationContext.Provider value={{
      medications,
      todaysSchedule,
      addMedication,
      updateIntakeStatus,
      getTodaysIntakes,
      getAdherenceReport,
      getAdherenceHistory,
      loadTodaysSchedule,
    }}>
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedication = () => {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error('useMedication must be used within a MedicationProvider');
  }
  return context;
};
