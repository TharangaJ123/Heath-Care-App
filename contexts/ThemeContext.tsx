import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    primary: string;
    text: string;
    textSecondary: string;
    border: string;
    card: string;
    icon: string;
    success: string;
    warning: string;
    error: string;
    shadow: string;
  };
}

const lightColors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  primary: '#1E3A8A',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E2E8F0',
  card: '#FFFFFF',
  icon: '#1E3A8A',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  shadow: '#000000',
};

const darkColors = {
  background: '#0F172A',
  surface: '#1E293B',
  primary: '#3B82F6',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  card: '#1E293B',
  icon: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  shadow: '#000000',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('app_theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = theme === 'light' ? lightColors : darkColors;
  const isDarkMode = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

