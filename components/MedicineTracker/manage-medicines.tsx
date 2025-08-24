import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Edit,
  Pill,
  Plus,
  Trash2
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  deleteMedication,
  getMedications,
  Medication
} from '../../utils/storage';

const { width } = Dimensions.get('window');

export default function ManageMedicinesScreen() {
  const router = useRouter();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      const meds = await getMedications();
      setMedications(meds);
    } catch (error) {
      console.error('Error loading medications:', error);
      Alert.alert('Error', 'Failed to load medications');
    } finally {
      setIsLoading(false);
    }
  };

    const handleEditMedicine = (medicationId: number) => {
    // TODO: Open edit medicine modal or navigate to edit screen
    Alert.alert('Edit Medicine', 'Edit medicine functionality will be implemented here');
  };

  const handleDeleteMedicine = (medication: Medication) => {
    Alert.alert(
      'Delete Medicine',
      `Are you sure you want to delete "${medication.name}"? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMedication(medication.id);
              await loadMedications(); // Reload the list
              Alert.alert('Success', 'Medicine has been deleted.');
            } catch (error) {
              console.error('Error deleting medicine:', error);
              Alert.alert('Error', 'Failed to delete medicine');
            }
          },
        },
      ]
    );
  };

  const handleAddMedicine = () => {
    // TODO: Open add medicine modal or navigate to add medicine screen
    Alert.alert('Add Medicine', 'Add medicine functionality will be implemented here');
  };

  const formatTimes = (times: string[]) => {
    return times.join(', ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Medicines</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMedicine}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {medications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Pill size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No Medicines Added</Text>
            <Text style={styles.emptyText}>
              You haven't added any medicines yet. Tap the + button to add your first medicine.
            </Text>
            <TouchableOpacity style={styles.addFirstButton} onPress={handleAddMedicine}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addFirstButtonText}>Add First Medicine</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>
              Your Medicines ({medications.length})
            </Text>
            
            {medications.map((medication) => (
              <View key={medication.id} style={styles.medicationCard}>
                <View style={styles.medicationHeader}>
                  <View style={styles.medicationIcon}>
                    <Pill size={24} color="#1E3A8A" />
                  </View>
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>{medication.name}</Text>
                    <Text style={styles.medicationDosage}>{medication.dosage}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.editButton}
                      onPress={() => handleEditMedicine(medication.id)}
                    >
                      <Edit size={16} color="#1E3A8A" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => handleDeleteMedicine(medication)}
                    >
                      <Trash2 size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.medicationDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Frequency:</Text>
                    <Text style={styles.detailValue}>
                      {medication.frequency.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Times:</Text>
                    <Text style={styles.detailValue}>{formatTimes(medication.times)}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Start Date:</Text>
                    <Text style={styles.detailValue}>{formatDate(medication.startDate)}</Text>
                  </View>
                  
                  {medication.endDate && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>End Date:</Text>
                      <Text style={styles.detailValue}>{formatDate(medication.endDate)}</Text>
                    </View>
                  )}
                  
                  {medication.notes && (
                    <View style={styles.notesContainer}>
                      <Text style={styles.detailLabel}>Notes:</Text>
                      <Text style={styles.notesText}>{medication.notes}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </>
        )}
        
        {/* Spacer for bottom padding */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  addFirstButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  addFirstButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 16,
  },
  medicationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  medicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicationDetails: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  notesContainer: {
    marginTop: 8,
  },
  notesText: {
    fontSize: 14,
    color: '#1F2937',
    marginTop: 4,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 40,
  },
});
