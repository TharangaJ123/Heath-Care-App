import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileContextType {
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    zipCode: string;
    emergencyContact: string;
    emergencyPhone: string;
  };
  setUserInfo: (info: any) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    dateOfBirth: '1990-01-01',
    address: '123 Main Street',
    city: 'New York',
    zipCode: '10001',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 234 567 8901',
  });

  return (
    <ProfileContext.Provider value={{
      profileImage,
      setProfileImage,
      userInfo,
      setUserInfo,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
