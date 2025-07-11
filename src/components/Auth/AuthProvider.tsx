import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'formateur';
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: string;
  language?: 'ar' | 'fr';
  createdAt: string;
  updatedAt?: string;
  
  // Profil client
  clientProfile?: ClientProfile;
  
  // Profil professionnel
  professionalProfile?: ProfessionalProfile;
}

export interface ClientProfile {
  age?: number;
  maritalStatus?: 'célibataire' | 'marié' | 'divorcé' | 'veuf';
  hasChildren?: boolean;
  numberOfChildren?: number;
  preferredLanguage?: 'ar' | 'fr';
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory?: string[];
  goals?: string[];
  sessionHistory: string[]; // session IDs
}

export interface ProfessionalProfile {
  title: string; // Dr., Prof., etc.
  specializations: string[];
  certifications: string[];
  experience: number; // années d'expérience
  education: string[];
  languages: ('ar' | 'fr')[];
  sessionRate: number; // tarif par session
  availability: WeeklyAvailability;
  rating: number;
  totalSessions: number;
  clientIds: string[];
  description: string;
  isVerified: boolean;
}

export interface WeeklyAvailability {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string;   // HH:mm format
  available: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app start
    const storedUser = localStorage.getItem('osrati_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('osrati_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('osrati_user');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;