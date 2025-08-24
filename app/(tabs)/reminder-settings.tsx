import { useRouter } from 'expo-router';
import {
    Bell,
    BellOff,
    CheckCircle,
    ChevronRight,
    Clock,
    Moon,
    Settings,
    Smartphone,
    Volume2,
    VolumeX,
    Zap,
    ZapOff
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// import { NotificationService } from '../../utils/notificationService';

const { width } = Dimensions.get('window');

interface ReminderSettings {
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  reminderTime: number; // minutes before scheduled time
  repeatInterval: number; // minutes between repeat notifications
  maxRepeats: number;
  quietHoursEnabled: boolean;
  quietHoursStart: string; // HH:MM format
  quietHoursEnd: string; // HH:MM format
  priorityLevel: 'high' | 'default' | 'low';
}

const defaultSettings: ReminderSettings = {
  notificationsEnabled: true,
  soundEnabled: true,
  vibrationEnabled: true,
  reminderTime: 15, // 15 minutes before
  repeatInterval: 30, // 30 minutes between repeats
  maxRepeats: 3,
  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
  priorityLevel: 'high',
};

export default function ReminderSettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState<ReminderSettings>(defaultSettings);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'unknown'>('unknown');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSettings();
    checkPermissionStatus();
  }, []);

  const loadSettings = async () => {
    try {
      // In a real app, you'd load from AsyncStorage
      // For now, we'll use default settings
      setSettings(defaultSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const checkPermissionStatus = async () => {
    try {
      // Mock implementation for now
      // const hasPermission = await NotificationService.requestPermissions();
      const hasPermission = false; // Mock: no permission by default
      setPermissionStatus(hasPermission ? 'granted' : 'denied');
    } catch (error) {
      console.error('Error checking permission status:', error);
      setPermissionStatus('unknown');
    }
  };

  const saveSettings = async (newSettings: ReminderSettings) => {
    try {
      // In a real app, you'd save to AsyncStorage
      setSettings(newSettings);
      Alert.alert('Success', 'Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const handleToggleSetting = (key: keyof ReminderSettings) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleTestNotification = async () => {
    if (permissionStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant notification permissions to test notifications.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Grant Permission', onPress: checkPermissionStatus },
        ]
      );
      return;
    }

    try {
      setIsLoading(true);
      // await NotificationService.showTestNotification();
      Alert.alert('Test Notification', 'Notification feature is temporarily disabled for testing.');
    } catch (error) {
      console.error('Error showing test notification:', error);
      Alert.alert('Error', 'Failed to show test notification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPermission = async () => {
    try {
      setIsLoading(true);
      // const granted = await NotificationService.requestPermissions();
      const granted = true; // Mock: simulate permission granted
      setPermissionStatus(granted ? 'granted' : 'denied');
      
      if (granted) {
        Alert.alert('Success', 'Notification permissions granted!');
      } else {
        Alert.alert(
          'Permission Denied',
          'You can enable notifications in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => {
              // In a real app, you'd open device settings
              Alert.alert('Settings', 'Please go to your device settings to enable notifications.');
            }},
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      Alert.alert('Error', 'Failed to request notification permissions');
    } finally {
      setIsLoading(false);
    }
  };

  const getPermissionStatusColor = () => {
    switch (permissionStatus) {
      case 'granted': return '#10B981';
      case 'denied': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getPermissionStatusText = () => {
    switch (permissionStatus) {
      case 'granted': return 'Granted';
      case 'denied': return 'Denied';
      default: return 'Unknown';
    }
  };

  const getPermissionStatusIcon = () => {
    switch (permissionStatus) {
      case 'granted': return <CheckCircle size={20} color="#10B981" />;
      case 'denied': return <BellOff size={20} color="#EF4444" />;
      default: return <Bell size={20} color="#6B7280" />;
    }
  };

  const SettingItem = ({ 
    title, 
    subtitle, 
    icon, 
    value, 
    onPress, 
    showSwitch = false, 
    switchValue = false,
    onSwitchChange,
    showChevron = false 
  }: {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    value?: string;
    onPress?: () => void;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    showChevron?: boolean;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress && !showSwitch}
    >
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        {value && <Text style={styles.settingValue}>{value}</Text>}
      </View>
      {showSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#E5E7EB', true: '#10B981' }}
          thumbColor={switchValue ? '#FFFFFF' : '#FFFFFF'}
        />
      )}
      {showChevron && <ChevronRight size={20} color="#9CA3AF" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronRight size={24} color="#1E3A8A" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminder Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Permission Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Permissions</Text>
          <View style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <View style={styles.permissionIcon}>
                {getPermissionStatusIcon()}
              </View>
              <View style={styles.permissionContent}>
                <Text style={styles.permissionTitle}>Notification Access</Text>
                <Text style={[styles.permissionStatus, { color: getPermissionStatusColor() }]}>
                  {getPermissionStatusText()}
                </Text>
              </View>
            </View>
            {permissionStatus !== 'granted' && (
              <TouchableOpacity 
                style={styles.permissionButton}
                onPress={handleRequestPermission}
                disabled={isLoading}
              >
                <Text style={styles.permissionButtonText}>
                  {isLoading ? 'Requesting...' : 'Grant Permission'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Settings</Text>
          <View style={styles.settingsCard}>
            <SettingItem
              title="Enable Notifications"
              subtitle="Receive medicine reminders"
              icon={<Bell size={20} color="#1E3A8A" />}
              showSwitch={true}
              switchValue={settings.notificationsEnabled}
              onSwitchChange={(value) => handleToggleSetting('notificationsEnabled')}
            />
            
            <SettingItem
              title="Sound"
              subtitle="Play sound with notifications"
              icon={settings.soundEnabled ? <Volume2 size={20} color="#1E3A8A" /> : <VolumeX size={20} color="#6B7280" />}
              showSwitch={true}
              switchValue={settings.soundEnabled}
              onSwitchChange={(value) => handleToggleSetting('soundEnabled')}
            />
            
            <SettingItem
              title="Vibration"
              subtitle="Vibrate device for notifications"
              icon={settings.vibrationEnabled ? <Zap size={20} color="#1E3A8A" /> : <ZapOff size={20} color="#6B7280" />}
              showSwitch={true}
              switchValue={settings.vibrationEnabled}
              onSwitchChange={(value) => handleToggleSetting('vibrationEnabled')}
            />
          </View>
        </View>

        {/* Timing Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timing Settings</Text>
          <View style={styles.settingsCard}>
            <SettingItem
              title="Reminder Time"
              subtitle={`${settings.reminderTime} minutes before scheduled time`}
              icon={<Clock size={20} color="#1E3A8A" />}
              value={`${settings.reminderTime} min`}
              showChevron={true}
              onPress={() => {
                Alert.alert(
                  'Reminder Time',
                  'Select when to receive reminders before scheduled medicine time',
                  [
                    { text: '5 minutes', onPress: () => setSettings({...settings, reminderTime: 5}) },
                    { text: '10 minutes', onPress: () => setSettings({...settings, reminderTime: 10}) },
                    { text: '15 minutes', onPress: () => setSettings({...settings, reminderTime: 15}) },
                    { text: '30 minutes', onPress: () => setSettings({...settings, reminderTime: 30}) },
                    { text: 'Cancel', style: 'cancel' },
                  ]
                );
              }}
            />
            
            <SettingItem
              title="Repeat Interval"
              subtitle={`${settings.repeatInterval} minutes between repeat notifications`}
              icon={<Clock size={20} color="#1E3A8A" />}
              value={`${settings.repeatInterval} min`}
              showChevron={true}
              onPress={() => {
                Alert.alert(
                  'Repeat Interval',
                  'Select time between repeat notifications',
                  [
                    { text: '15 minutes', onPress: () => setSettings({...settings, repeatInterval: 15}) },
                    { text: '30 minutes', onPress: () => setSettings({...settings, repeatInterval: 30}) },
                    { text: '1 hour', onPress: () => setSettings({...settings, repeatInterval: 60}) },
                    { text: '2 hours', onPress: () => setSettings({...settings, repeatInterval: 120}) },
                    { text: 'Cancel', style: 'cancel' },
                  ]
                );
              }}
            />
            
            <SettingItem
              title="Max Repeats"
              subtitle={`Stop after ${settings.maxRepeats} repeat notifications`}
              icon={<Settings size={20} color="#1E3A8A" />}
              value={`${settings.maxRepeats} times`}
              showChevron={true}
              onPress={() => {
                Alert.alert(
                  'Max Repeats',
                  'Select maximum number of repeat notifications',
                  [
                    { text: '1 time', onPress: () => setSettings({...settings, maxRepeats: 1}) },
                    { text: '3 times', onPress: () => setSettings({...settings, maxRepeats: 3}) },
                    { text: '5 times', onPress: () => setSettings({...settings, maxRepeats: 5}) },
                    { text: '10 times', onPress: () => setSettings({...settings, maxRepeats: 10}) },
                    { text: 'Cancel', style: 'cancel' },
                  ]
                );
              }}
            />
          </View>
        </View>

        {/* Quiet Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiet Hours</Text>
          <View style={styles.settingsCard}>
            <SettingItem
              title="Enable Quiet Hours"
              subtitle="Silence notifications during specified hours"
              icon={<Moon size={20} color="#1E3A8A" />}
              showSwitch={true}
              switchValue={settings.quietHoursEnabled}
              onSwitchChange={(value) => handleToggleSetting('quietHoursEnabled')}
            />
            
            {settings.quietHoursEnabled && (
              <>
                <SettingItem
                  title="Start Time"
                  subtitle="When quiet hours begin"
                  icon={<Moon size={20} color="#1E3A8A" />}
                  value={settings.quietHoursStart}
                  showChevron={true}
                  onPress={() => {
                    Alert.alert(
                      'Start Time',
                      'Select when quiet hours begin',
                      [
                        { text: '8:00 PM', onPress: () => setSettings({...settings, quietHoursStart: '20:00'}) },
                        { text: '9:00 PM', onPress: () => setSettings({...settings, quietHoursStart: '21:00'}) },
                        { text: '10:00 PM', onPress: () => setSettings({...settings, quietHoursStart: '22:00'}) },
                        { text: '11:00 PM', onPress: () => setSettings({...settings, quietHoursStart: '23:00'}) },
                        { text: 'Cancel', style: 'cancel' },
                      ]
                    );
                  }}
                />
                
                <SettingItem
                  title="End Time"
                  subtitle="When quiet hours end"
                  icon={<Moon size={20} color="#1E3A8A" />}
                  value={settings.quietHoursEnd}
                  showChevron={true}
                  onPress={() => {
                    Alert.alert(
                      'End Time',
                      'Select when quiet hours end',
                      [
                        { text: '6:00 AM', onPress: () => setSettings({...settings, quietHoursEnd: '06:00'}) },
                        { text: '7:00 AM', onPress: () => setSettings({...settings, quietHoursEnd: '07:00'}) },
                        { text: '8:00 AM', onPress: () => setSettings({...settings, quietHoursEnd: '08:00'}) },
                        { text: '9:00 AM', onPress: () => setSettings({...settings, quietHoursEnd: '09:00'}) },
                        { text: 'Cancel', style: 'cancel' },
                      ]
                    );
                  }}
                />
              </>
            )}
          </View>
        </View>

        {/* Priority Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priority Level</Text>
          <View style={styles.settingsCard}>
            <SettingItem
              title="Notification Priority"
              subtitle="Set notification importance level"
              icon={<Smartphone size={20} color="#1E3A8A" />}
              value={settings.priorityLevel.charAt(0).toUpperCase() + settings.priorityLevel.slice(1)}
              showChevron={true}
              onPress={() => {
                Alert.alert(
                  'Priority Level',
                  'Select notification priority level',
                  [
                    { text: 'High', onPress: () => setSettings({...settings, priorityLevel: 'high'}) },
                    { text: 'Default', onPress: () => setSettings({...settings, priorityLevel: 'default'}) },
                    { text: 'Low', onPress: () => setSettings({...settings, priorityLevel: 'low'}) },
                    { text: 'Cancel', style: 'cancel' },
                  ]
                );
              }}
            />
          </View>
        </View>

        {/* Test Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Notifications</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity 
              style={styles.testButton}
              onPress={handleTestNotification}
              disabled={isLoading || permissionStatus !== 'granted'}
            >
              <Bell size={20} color="#FFFFFF" />
              <Text style={styles.testButtonText}>
                {isLoading ? 'Sending...' : 'Send Test Notification'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.testDescription}>
              Send a test notification to verify your settings are working correctly.
            </Text>
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerRight: {
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
  permissionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  permissionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  permissionStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  permissionButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingValue: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '500',
    marginTop: 2,
  },
  testButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  testDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 40,
  },
});
