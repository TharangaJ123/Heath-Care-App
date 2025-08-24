import { useRouter } from 'expo-router';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Database,
  Eye,
  Globe,
  Key,
  Lock,
  Shield,
  Smartphone,
  User,
  XCircle
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleBiometricToggle = () => {
    setBiometricEnabled(!biometricEnabled);
    Alert.alert(
      'Biometric Authentication',
      biometricEnabled ? 'Biometric authentication disabled' : 'Biometric authentication enabled'
    );
  };

  const handleDataSharingToggle = () => {
    setDataSharing(!dataSharing);
    Alert.alert(
      'Data Sharing',
      dataSharing ? 'Data sharing disabled' : 'Data sharing enabled'
    );
  };

  const handleAnalyticsToggle = () => {
    setAnalyticsEnabled(!analyticsEnabled);
    Alert.alert(
      'Analytics',
      analyticsEnabled ? 'Analytics disabled' : 'Analytics enabled'
    );
  };

  const handleLocationToggle = () => {
    setLocationSharing(!locationSharing);
    Alert.alert(
      'Location Sharing',
      locationSharing ? 'Location sharing disabled' : 'Location sharing enabled'
    );
  };

  const SecurityItem = ({ 
    title, 
    subtitle, 
    icon, 
    status = 'secure',
    onPress,
    showToggle = false,
    toggleValue = false,
    onToggle
  }: {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    status?: 'secure' | 'warning' | 'error';
    onPress?: () => void;
    showToggle?: boolean;
    toggleValue?: boolean;
    onToggle?: () => void;
  }) => (
    <TouchableOpacity 
      style={styles.securityItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.securityIcon}>
        {icon}
      </View>
      <View style={styles.securityContent}>
        <Text style={styles.securityTitle}>{title}</Text>
        {subtitle && <Text style={styles.securitySubtitle}>{subtitle}</Text>}
        <View style={styles.statusContainer}>
          {status === 'secure' && <CheckCircle size={16} color="#10B981" />}
          {status === 'warning' && <AlertTriangle size={16} color="#F59E0B" />}
          {status === 'error' && <XCircle size={16} color="#EF4444" />}
          <Text style={[styles.statusText, { color: status === 'secure' ? '#10B981' : status === 'warning' ? '#F59E0B' : '#EF4444' }]}>
            {status === 'secure' ? 'Secure' : status === 'warning' ? 'Warning' : 'Issue'}
          </Text>
        </View>
      </View>
      {showToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: '#E5E7EB', true: '#1E3A8A' }}
          thumbColor={toggleValue ? '#FFFFFF' : '#FFFFFF'}
        />
      ) : (
        <View style={styles.arrowContainer}>
          <ArrowLeft size={20} color="#9CA3AF" style={{ transform: [{ rotate: '180deg' }] }} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Security Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Status</Text>
          <View style={styles.securityCard}>
            <View style={styles.securityHeader}>
              <Shield size={32} color="#10B981" />
              <Text style={styles.securityStatusTitle}>Your account is secure</Text>
            </View>
            <Text style={styles.securityStatusText}>
              All security measures are up to date and your data is protected.
            </Text>
          </View>
        </View>

        {/* Authentication */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Authentication</Text>
          <View style={styles.settingsCard}>
            <SecurityItem
              title="Biometric Authentication"
              subtitle="Use fingerprint or face ID to unlock the app"
              icon={<Key size={20} color="#1E3A8A" />}
              status="secure"
              showToggle={true}
              toggleValue={biometricEnabled}
              onToggle={handleBiometricToggle}
            />
            
            <SecurityItem
              title="Password Requirements"
              subtitle="Strong password policy enforced"
              icon={<Lock size={20} color="#1E3A8A" />}
              status="secure"
              onPress={() => Alert.alert('Password Policy', 'Minimum 8 characters, uppercase, lowercase, number, and special character required.')}
            />
          </View>
        </View>

        {/* Data Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Privacy</Text>
          <View style={styles.settingsCard}>
            <SecurityItem
              title="Data Sharing"
              subtitle="Share anonymized data for app improvement"
              icon={<Database size={20} color="#1E3A8A" />}
              status="warning"
              showToggle={true}
              toggleValue={dataSharing}
              onToggle={handleDataSharingToggle}
            />
            
            <SecurityItem
              title="Analytics"
              subtitle="Help improve the app with usage analytics"
              icon={<Globe size={20} color="#1E3A8A" />}
              status="secure"
              showToggle={true}
              toggleValue={analyticsEnabled}
              onToggle={handleAnalyticsToggle}
            />
            
            <SecurityItem
              title="Location Services"
              subtitle="Allow location access for local features"
              icon={<Smartphone size={20} color="#1E3A8A" />}
              status="warning"
              showToggle={true}
              toggleValue={locationSharing}
              onToggle={handleLocationToggle}
            />
          </View>
        </View>

        {/* Privacy Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Controls</Text>
          <View style={styles.settingsCard}>
            <SecurityItem
              title="Data Export"
              subtitle="Download your personal data"
              icon={<Database size={20} color="#1E3A8A" />}
              status="secure"
              onPress={() => Alert.alert('Data Export', 'Your data export will be prepared and sent to your email within 24 hours.')}
            />
            
            <SecurityItem
              title="Account Deletion"
              subtitle="Permanently delete your account and data"
              icon={<User size={20} color="#EF4444" />}
              status="error"
              onPress={() => {
                Alert.alert(
                  'Delete Account',
                  'Are you sure you want to permanently delete your account? This action cannot be undone.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Account Deleted', 'Your account has been permanently deleted.') }
                  ]
                );
              }}
            />
          </View>
        </View>

        {/* Privacy Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <View style={styles.settingsCard}>
            <SecurityItem
              title="Privacy Policy"
              subtitle="Read our privacy policy"
              icon={<Eye size={20} color="#1E3A8A" />}
              status="secure"
              onPress={() => Alert.alert('Privacy Policy', 'Our privacy policy explains how we collect, use, and protect your personal information.')}
            />
            
            <SecurityItem
              title="Terms of Service"
              subtitle="Read our terms of service"
              icon={<Shield size={20} color="#1E3A8A" />}
              status="secure"
              onPress={() => Alert.alert('Terms of Service', 'Our terms of service outline the rules and guidelines for using our app.')}
            />
            
            <SecurityItem
              title="Data Processing"
              subtitle="How we process your data"
              icon={<Database size={20} color="#1E3A8A" />}
              status="secure"
              onPress={() => Alert.alert('Data Processing', 'We process your data securely and only for the purposes outlined in our privacy policy.')}
            />
          </View>
        </View>

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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  securityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityStatusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  securityStatusText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  securityContent: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  securitySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 40,
  },
});

