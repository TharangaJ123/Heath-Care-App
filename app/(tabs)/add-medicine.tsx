import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Calendar,
    Clock,
    Pill,
    Plus,
    Save,
    Trash2
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { generateMedicationSchedule, Medication, saveMedication } from '../../utils/storage';

const { width } = Dimensions.get('window');

export default function AddMedicineScreen() {
  const router = useRouter();
  
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [times, setTimes] = useState(['09:00']);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const frequencyOptions = [
    { label: 'Daily', value: 'daily' },
    { label: 'Twice Daily', value: 'twice_daily' },
    { label: 'Three Times Daily', value: 'three_times_daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'As Needed', value: 'as_needed' },
  ];

  const addTime = () => {
    if (times.length < 5) {
      setTimes([...times, '09:00']);
    }
  };

  const removeTime = (index: number) => {
    if (times.length > 1) {
      setTimes(times.filter((_, i) => i !== index));
    }
  };

  const updateTime = (index: number, time: string) => {
    const newTimes = [...times];
    newTimes[index] = time;
    setTimes(newTimes);
  };

  const handleSave = async () => {
    if (!medicineName.trim() || !dosage.trim()) {
      Alert.alert('Missing Information', 'Please fill in the medicine name and dosage.');
      return;
    }

    try {
      // Create medicine data
      const medicineData: Medication = {
        id: Date.now(),
        name: medicineName.trim(),
        dosage: dosage.trim(),
        frequency,
        times,
        startDate,
        endDate,
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
      };

      // Save medicine to storage
      await saveMedication(medicineData);
      
      // Generate schedule for the medication
      await generateMedicationSchedule(medicineData);

      console.log('Medicine saved successfully:', medicineData);
      
      // Show success message and navigate back
      Alert.alert(
        'Success!',
        'Medicine has been added to your schedule.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error('Error saving medicine:', error);
      Alert.alert(
        'Error',
        'Failed to save medicine. Please try again.',
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  const handleCancel = () => {
    if (medicineName.trim() || dosage.trim() || notes.trim()) {
      Alert.alert(
        'Discard Changes?',
        'Are you sure you want to discard your changes?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
          <ArrowLeft size={24} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Medicine</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Save size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Medicine Name */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medicine Name *</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Pill size={20} color="#6B7280" />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Paracetamol, Amoxicillin"
                value={medicineName}
                onChangeText={setMedicineName}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Dosage */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dosage *</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., 500mg, 1 tablet"
                value={dosage}
                onChangeText={setDosage}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Frequency */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequency</Text>
            <View style={styles.frequencyContainer}>
              {frequencyOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.frequencyOption,
                    frequency === option.value && styles.frequencyOptionSelected,
                  ]}
                  onPress={() => setFrequency(option.value)}
                >
                  <Text
                    style={[
                      styles.frequencyText,
                      frequency === option.value && styles.frequencyTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Times */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Times</Text>
              {times.length < 5 && (
                <TouchableOpacity style={styles.addTimeButton} onPress={addTime}>
                  <Plus size={16} color="#1E3A8A" />
                  <Text style={styles.addTimeText}>Add Time</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {times.map((time, index) => (
              <View key={index} style={styles.timeContainer}>
                <View style={styles.timeInputContainer}>
                  <View style={styles.timeIcon}>
                    <Clock size={16} color="#6B7280" />
                  </View>
                  <TextInput
                    style={styles.timeInput}
                    value={time}
                    onChangeText={(text) => updateTime(index, text)}
                    placeholder="09:00"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                {times.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeTimeButton}
                    onPress={() => removeTime(index)}
                  >
                    <Trash2 size={16} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          {/* Start Date */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Start Date</Text>
            <TouchableOpacity style={styles.dateContainer}>
              <View style={styles.dateIcon}>
                <Calendar size={16} color="#6B7280" />
              </View>
              <Text style={styles.dateText}>{startDate}</Text>
            </TouchableOpacity>
          </View>

          {/* End Date (Optional) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>End Date (Optional)</Text>
            <TouchableOpacity 
              style={styles.dateContainer}
              onPress={() => setEndDate(endDate ? '' : '2024-12-31')}
            >
              <View style={styles.dateIcon}>
                <Calendar size={16} color="#6B7280" />
              </View>
              <Text style={styles.dateText}>
                {endDate || 'No end date'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes (Optional)</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add any additional notes about this medicine..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Spacer for bottom padding */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  frequencyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  frequencyOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  frequencyOptionSelected: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  frequencyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  frequencyTextSelected: {
    color: '#FFFFFF',
  },
  addTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E0E7FF',
  },
  addTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E3A8A',
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  timeIcon: {
    marginRight: 12,
  },
  timeInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  removeTimeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateIcon: {
    marginRight: 12,
  },
  dateText: {
    fontSize: 16,
    color: '#1F2937',
  },
  notesInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 100,
  },
  bottomSpacer: {
    height: 40,
  },
});
