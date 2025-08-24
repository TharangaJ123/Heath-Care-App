import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  Download,
  FileText,
  HelpCircle,
  Info,
  Languages,
  Moon,
  Palette,
  RefreshCw,
  Share2,
  Smartphone,
  Star,
  Sun,
  Trash2,
  Volume2,
  Wifi
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

export default function AppSettingsScreen() {
  const router = useRouter();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    Alert.alert(
      'Notifications',
      notificationsEnabled ? 'Notifications disabled' : 'Notifications enabled'
    );
  };

  const handleDarkModeToggle = () => {
    toggleTheme();
    Alert.alert(
      'Dark Mode',
      isDarkMode ? 'Dark mode disabled' : 'Dark mode enabled'
    );
  };

  const handleAutoSyncToggle = () => {
    setAutoSync(!autoSync);
    Alert.alert(
      'Auto Sync',
      autoSync ? 'Auto sync disabled' : 'Auto sync enabled'
    );
  };

  const handleOfflineModeToggle = () => {
    setOfflineMode(!offlineMode);
    Alert.alert(
      'Offline Mode',
      offlineMode ? 'Offline mode disabled' : 'Offline mode enabled'
    );
  };

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    Alert.alert(
      'Sound',
      soundEnabled ? 'Sound disabled' : 'Sound enabled'
    );
  };

  const handleVibrationToggle = () => {
    setVibrationEnabled(!vibrationEnabled);
    Alert.alert(
      'Vibration',
      vibrationEnabled ? 'Vibration disabled' : 'Vibration enabled'
    );
  };

  const SettingsItem = ({ 
    title, 
    subtitle, 
    icon, 
    onPress,
    showToggle = false,
    toggleValue = false,
    onToggle,
    showArrow = true
  }: {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    onPress?: () => void;
    showToggle?: boolean;
    toggleValue?: boolean;
    onToggle?: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity 
      style={styles.settingsItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingsIcon}>
        {icon}
      </View>
      <View style={styles.settingsContent}>
        <Text style={styles.settingsTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
      </View>
      {showToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: '#E5E7EB', true: '#1E3A8A' }}
          thumbColor={toggleValue ? '#FFFFFF' : '#FFFFFF'}
        />
      ) : showArrow ? (
        <View style={styles.arrowContainer}>
          <ArrowLeft size={20} color="#9CA3AF" style={{ transform: [{ rotate: '180deg' }] }} />
        </View>
      ) : null}
    </TouchableOpacity>
  );

  const styles = createStyles(colors, isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.surface} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingsCard}>
                         <SettingsItem
               title="Push Notifications"
               subtitle="Receive notifications for medication reminders"
               icon={<Bell size={20} color={colors.icon} />}
               showToggle={true}
               toggleValue={notificationsEnabled}
               onToggle={handleNotificationToggle}
             />
             
             <SettingsItem
               title="Sound"
               subtitle="Play sound for notifications"
               icon={<Volume2 size={20} color={colors.icon} />}
               showToggle={true}
               toggleValue={soundEnabled}
               onToggle={handleSoundToggle}
             />
             
             <SettingsItem
               title="Vibration"
               subtitle="Vibrate for notifications"
               icon={<Smartphone size={20} color={colors.icon} />}
               showToggle={true}
               toggleValue={vibrationEnabled}
               onToggle={handleVibrationToggle}
             />
          </View>
        </View>

        {/* Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingsCard}>
                         <SettingsItem
               title="Dark Mode"
               subtitle="Use dark theme for the app"
               icon={isDarkMode ? <Sun size={20} color={colors.icon} /> : <Moon size={20} color={colors.icon} />}
               showToggle={true}
               toggleValue={isDarkMode}
               onToggle={handleDarkModeToggle}
             />
            
            <SettingsItem
              title="Theme"
              subtitle="Choose your preferred color theme"
              icon={<Palette size={20} color={colors.icon} />}
              onPress={() => Alert.alert('Theme', 'Choose from available themes: Default, Blue, Green, Purple')}
            />
            
            <SettingsItem
              title="Language"
              subtitle="Select your preferred language"
              icon={<Languages size={20} color={colors.icon} />}
              onPress={() => Alert.alert('Language', 'Available languages: English, Spanish, French, German')}
            />
          </View>
        </View>

        {/* Data & Sync */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Sync</Text>
          <View style={styles.settingsCard}>
                         <SettingsItem
               title="Auto Sync"
               subtitle="Automatically sync data with cloud"
               icon={<RefreshCw size={20} color={colors.icon} />}
               showToggle={true}
               toggleValue={autoSync}
               onToggle={handleAutoSyncToggle}
             />
             
             <SettingsItem
               title="Offline Mode"
               subtitle="Use app without internet connection"
               icon={<Wifi size={20} color={colors.icon} />}
               showToggle={true}
               toggleValue={offlineMode}
               onToggle={handleOfflineModeToggle}
             />
             
             <SettingsItem
               title="Backup Data"
               subtitle="Create a backup of your data"
               icon={<Download size={20} color={colors.icon} />}
               onPress={() => Alert.alert('Backup', 'Your data backup will be created and saved to your device.')}
             />
             
             <SettingsItem
               title="Clear Cache"
               subtitle="Free up storage space"
               icon={<Trash2 size={20} color={colors.icon} />}
              onPress={() => {
                Alert.alert(
                  'Clear Cache',
                  'Are you sure you want to clear the app cache? This will free up storage space.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Clear', style: 'destructive', onPress: () => Alert.alert('Cache Cleared', 'App cache has been cleared successfully.') }
                  ]
                );
              }}
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsCard}>
                         <SettingsItem
               title="Help & FAQ"
               subtitle="Get help and find answers"
               icon={<HelpCircle size={20} color={colors.icon} />}
               onPress={() => Alert.alert('Help & FAQ', 'Access our comprehensive help center and frequently asked questions.')}
             />
             
             <SettingsItem
               title="Contact Support"
               subtitle="Get in touch with our support team"
               icon={<Info size={20} color={colors.icon} />}
               onPress={() => Alert.alert('Contact Support', 'Email us at support@healthtracker.com or call us at 1-800-HEALTH')}
             />
             
             <SettingsItem
               title="User Manual"
               subtitle="Read the complete user guide"
               icon={<FileText size={20} color={colors.icon} />}
              onPress={() => Alert.alert('User Manual', 'Access the complete user manual with detailed instructions.')}
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.settingsCard}>
                         <SettingsItem
               title="App Version"
               subtitle="Version 1.0.0"
               icon={<Info size={20} color={colors.icon} />}
               showArrow={false}
             />
             
             <SettingsItem
               title="Rate App"
               subtitle="Rate us on the app store"
               icon={<Star size={20} color={colors.icon} />}
               onPress={() => Alert.alert('Rate App', 'Thank you for using our app! Please rate us on the app store.')}
             />
             
             <SettingsItem
               title="Share App"
               subtitle="Share with friends and family"
               icon={<Share2 size={20} color={colors.icon} />}
               onPress={() => Alert.alert('Share App', 'Share this app with your friends and family to help them stay healthy!')}
             />
             
             <SettingsItem
               title="Terms of Service"
               subtitle="Read our terms of service"
               icon={<FileText size={20} color={colors.icon} />}
               onPress={() => Alert.alert('Terms of Service', 'Read our terms of service and usage guidelines.')}
             />
             
             <SettingsItem
               title="Privacy Policy"
               subtitle="Read our privacy policy"
               icon={<FileText size={20} color={colors.icon} />}
              onPress={() => Alert.alert('Privacy Policy', 'Read our privacy policy to understand how we protect your data.')}
            />
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any, isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: isDarkMode ? colors.border : '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
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
    color: colors.text,
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: isDarkMode ? colors.border : '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: isDarkMode ? colors.border : '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 40,
  },
});
