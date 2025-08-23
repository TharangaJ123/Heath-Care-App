import {
  BarChart3,
  CheckCircle,
  MinusCircle,
  Phone,
  Pill,
  Plus,
  User,
  Wifi,
  WifiOff,
  XCircle
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');

// Dummy medication data for different dates
const medicationData = {
  '2024-01-15': [
    { id: 1, name: 'Paracetamol', time: '9:00 AM', status: 'taken' },
    { id: 2, name: 'Amoxicillin', time: '2:00 PM', status: 'missed' },
    { id: 3, name: 'Vitamin D', time: '6:00 PM', status: 'pending' },
  ],
  '2024-01-16': [
    { id: 4, name: 'Paracetamol', time: '9:00 AM', status: 'pending' },
    { id: 5, name: 'Amoxicillin', time: '2:00 PM', status: 'pending' },
    { id: 6, name: 'Iron Supplement', time: '8:00 PM', status: 'pending' },
  ],
  '2024-01-17': [
    { id: 7, name: 'Paracetamol', time: '9:00 AM', status: 'pending' },
    { id: 8, name: 'Amoxicillin', time: '2:00 PM', status: 'pending' },
    { id: 9, name: 'Vitamin C', time: '12:00 PM', status: 'pending' },
  ],
  '2024-01-18': [
    { id: 10, name: 'Paracetamol', time: '9:00 AM', status: 'pending' },
    { id: 11, name: 'Amoxicillin', time: '2:00 PM', status: 'pending' },
  ],
  '2024-01-19': [
    { id: 12, name: 'Paracetamol', time: '9:00 AM', status: 'pending' },
    { id: 13, name: 'Amoxicillin', time: '2:00 PM', status: 'pending' },
    { id: 14, name: 'Calcium', time: '7:00 PM', status: 'pending' },
  ],
};

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isOffline, setIsOffline] = useState(false);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    // Simulate offline/online status
    const checkConnection = () => {
      setIsOffline(Math.random() > 0.7); // 30% chance of being offline
    };
    
    checkConnection();
    const interval = setInterval(checkConnection, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update medications when date changes
    const dateKey = selectedDate;
    setMedications(medicationData[dateKey] || []);
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  const updateMedicationStatus = (medId, newStatus) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === medId ? { ...med, status: newStatus } : med
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'taken': return '#10B981';
      case 'missed': return '#EF4444';
      case 'skipped': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'taken': return <CheckCircle size={20} color="#10B981" />;
      case 'missed': return <XCircle size={20} color="#EF4444" />;
      case 'skipped': return <MinusCircle size={20} color="#F59E0B" />;
      default: return <MinusCircle size={20} color="#6B7280" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'taken': return 'Taken';
      case 'missed': return 'Missed';
      case 'skipped': return 'Skipped';
      default: return 'Pending';
    }
  };

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#1E3A8A',
      selectedTextColor: '#FFFFFF',
    },
    ...Object.keys(medicationData).reduce((acc, date) => {
      acc[date] = {
        marked: true,
        dotColor: '#10B981',
      };
      return acc;
    }, {}),
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appTitle}>Health Tracker</Text>
          <View style={styles.offlineIndicator}>
            {isOffline ? (
              <>
                <WifiOff size={16} color="#EF4444" />
                <Text style={styles.offlineText}>Offline</Text>
              </>
            ) : (
              <>
                <Wifi size={16} color="#10B981" />
                <Text style={styles.onlineText}>Online</Text>
              </>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <User size={24} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Calendar Section */}
        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>Medication Schedule</Text>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={markedDates}
            theme={{
              selectedDayBackgroundColor: '#1E3A8A',
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: '#1E3A8A',
              dayTextColor: '#374151',
              textDisabledColor: '#D1D5DB',
              monthTextColor: '#1E3A8A',
              indicatorColor: '#10B981',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
            style={styles.calendar}
          />
        </View>

        {/* Medication List Section */}
        <View style={styles.medicationSection}>
          <Text style={styles.sectionTitle}>
            Medications for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
          
          {medications.length === 0 ? (
            <View style={styles.noMedications}>
              <Pill size={48} color="#D1D5DB" />
              <Text style={styles.noMedicationsText}>No medications scheduled for this date</Text>
            </View>
          ) : (
            medications.map((medication) => (
              <View key={medication.id} style={styles.medicationCard}>
                <View style={styles.medicationInfo}>
                  <View style={styles.medicationIcon}>
                    <Pill size={24} color="#1E3A8A" />
                  </View>
                  <View style={styles.medicationDetails}>
                    <Text style={styles.medicationName}>{medication.name}</Text>
                    <Text style={styles.medicationTime}>{medication.time}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    {getStatusIcon(medication.status)}
                    <Text style={[styles.statusText, { color: getStatusColor(medication.status) }]}>
                      {getStatusText(medication.status)}
                    </Text>
                  </View>
                </View>
                
                {medication.status === 'pending' && (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.takenButton]}
                      onPress={() => updateMedicationStatus(medication.id, 'taken')}
                    >
                      <CheckCircle size={16} color="#FFFFFF" />
                      <Text style={styles.actionButtonText}>Taken</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.missedButton]}
                      onPress={() => updateMedicationStatus(medication.id, 'missed')}
                    >
                      <XCircle size={16} color="#FFFFFF" />
                      <Text style={styles.actionButtonText}>Missed</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.skippedButton]}
                      onPress={() => updateMedicationStatus(medication.id, 'skipped')}
                    >
                      <MinusCircle size={16} color="#FFFFFF" />
                      <Text style={styles.actionButtonText}>Skip</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        {/* Quick Actions Section */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#10B981' }]}>
                <Plus size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Add Medicine</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#1E3A8A' }]}>
                <BarChart3 size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>View Reports</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#EF4444' }]}>
                <Phone size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Emergency</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  offlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  offlineText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
  },
  onlineText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  calendarSection: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  calendar: {
    borderRadius: 12,
  },
  medicationSection: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  noMedications: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noMedicationsText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
  },
  medicationCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  medicationDetails: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  medicationTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusContainer: {
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  takenButton: {
    backgroundColor: '#10B981',
  },
  missedButton: {
    backgroundColor: '#EF4444',
  },
  skippedButton: {
    backgroundColor: '#F59E0B',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  quickActionsSection: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
});
