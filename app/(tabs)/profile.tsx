import { useRouter } from 'expo-router';
import {
  Bell,
  ChevronRight,
  Edit,
  Heart,
  LogOut,
  Settings,
  Shield,
  User
} from 'lucide-react-native';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useProfile } from '@/contexts/ProfileContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { profileImage, userInfo } = useProfile();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            Alert.alert('Success', 'You have been logged out successfully.');
          },
        },
      ]
    );
  };

  const ProfileItem = ({ 
    title, 
    subtitle, 
    icon, 
    onPress, 
    showChevron = true 
  }: {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    onPress?: () => void;
    showChevron?: boolean;
  }) => (
    <TouchableOpacity 
      style={styles.profileItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.profileIcon}>
        {icon}
      </View>
      <View style={styles.profileContent}>
        <Text style={styles.profileTitle}>{title}</Text>
        {subtitle && <Text style={styles.profileSubtitle}>{subtitle}</Text>}
      </View>
      {showChevron && <ChevronRight size={20} color="#9CA3AF" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Section */}
        <View style={styles.section}>
          <View style={styles.userCard}>
            <View style={styles.userAvatar}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <User size={32} color="#1E3A8A" />
              )}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userInfo.firstName} {userInfo.lastName}</Text>
              <Text style={styles.userEmail}>{userInfo.email}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={16} color="#1E3A8A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <ProfileItem
              title="Personal Information"
              subtitle="Update your personal details"
              icon={<User size={20} color="#1E3A8A" />}
              onPress={() => router.push('/(tabs)/personal-details' as any)}
            />
            
            <ProfileItem
              title="Notification Settings"
              subtitle="Manage your notification preferences"
              icon={<Bell size={20} color="#1E3A8A" />}
              onPress={() => router.push('/(tabs)/reminder-settings')}
            />
            
            <ProfileItem
              title="Privacy & Security"
              subtitle="Manage your privacy settings"
              icon={<Shield size={20} color="#1E3A8A" />}
              onPress={() => router.push('/(tabs)/privacy-security')}
            />
            
            <ProfileItem
              title="App Settings"
              subtitle="Configure app preferences"
              icon={<Settings size={20} color="#1E3A8A" />}
              onPress={() => router.push('/(tabs)/app-settings')}
            />
          </View>
        </View>

        {/* Health Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health</Text>
          <View style={styles.settingsCard}>
            <ProfileItem
              title="Health Records"
              subtitle="View your health history"
              icon={<Heart size={20} color="#1E3A8A" />}
              onPress={() => Alert.alert('Info', 'Health Records screen')}
            />
            
            <ProfileItem
              title="Medical History"
              subtitle="Manage your medical information"
              icon={<Heart size={20} color="#1E3A8A" />}
              onPress={() => Alert.alert('Info', 'Medical History screen')}
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingsCard}>
            <ProfileItem
              title="Logout"
              subtitle="Sign out of your account"
              icon={<LogOut size={20} color="#EF4444" />}
              onPress={handleLogout}
              showChevron={false}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
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
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
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
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileContent: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  bottomSpacer: {
    height: 40,
  },
});
