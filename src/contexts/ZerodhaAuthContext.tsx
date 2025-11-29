import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { UserProfile } from '@/services/profileService';

interface ZerodhaAuthContextType {
  isConnected: boolean;
  userId: string | null;
  profileData: UserProfile | null;
  connectWithZerodha: () => void;
  disconnect: () => void;
  fetchProfile: (userIdToFetch?: string) => Promise<void>;
  isLoading: boolean;
}

const ZerodhaAuthContext = createContext<ZerodhaAuthContextType | undefined>(undefined);

const ZERODHA_USER_ID_KEY = 'zerodha_user_id';
const ZERODHA_LOGIN_URL = 'https://kite.zerodha.com/connect/login?api_key=q45y1ztcc7659f8p&v=3';

export const ZerodhaAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async (userIdToFetch?: string) => {
    const targetUserId = userIdToFetch || userId;
    if (!targetUserId) {
      console.log('⚠️ No userId provided to fetchProfile');
      return;
    }
    
    setIsLoading(true);
    try {
      const { getProfile } = await import('@/services/profileService');
      console.log('🔄 Fetching profile for user:', targetUserId);
      const data = await getProfile(targetUserId);
      setProfileData(data);
      console.log('✅ Profile data loaded:', data);
      toast.success('Profile loaded successfully!');
    } catch (error: any) {
      console.error('❌ Error fetching profile:', error);
      
      if (error.message?.includes('401') || error.message?.includes('403')) {
        // Unauthorized - clear stored ID
        localStorage.removeItem(ZERODHA_USER_ID_KEY);
        setUserId(null);
        setProfileData(null);
        toast.error('Authorization failed. Please reconnect with Zerodha.');
      } else if (error.message?.includes('404')) {
        toast.info('Profile not found. Please complete your profile.');
      } else if (error.message?.includes('Failed to fetch')) {
        toast.error('CORS error: Please configure backend to allow ' + window.location.origin);
      } else {
        toast.error('Failed to fetch profile. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Check for stored user ID on mount and fetch profile
  useEffect(() => {
    const storedUserId = localStorage.getItem(ZERODHA_USER_ID_KEY);
    console.log('🔍 Checking localStorage for userId:', storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
      fetchProfile(storedUserId);
    } else {
      console.log('❌ No stored userId found in localStorage');
    }
  }, []);

  // Handle OAuth redirect callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = urlParams.get('user_id') || urlParams.get('id');
    
    if (userIdFromUrl && userIdFromUrl !== userId) {
      console.log('🔐 OAuth redirect detected, user_id:', userIdFromUrl);
      
      // Store user ID
      localStorage.setItem(ZERODHA_USER_ID_KEY, userIdFromUrl);
      setUserId(userIdFromUrl);
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Fetch profile immediately with the new userId
      fetchProfile(userIdFromUrl);
      
      toast.success('Successfully connected with Zerodha!');
    } else if (urlParams.has('error')) {
      toast.error('Zerodha connection failed — please try again.');
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const connectWithZerodha = () => {
    window.open(ZERODHA_LOGIN_URL, '_blank');
  };

  const disconnect = () => {
    localStorage.removeItem(ZERODHA_USER_ID_KEY);
    setUserId(null);
    setProfileData(null);
    toast.info('Disconnected from Zerodha');
  };


  return (
    <ZerodhaAuthContext.Provider
      value={{
        isConnected: !!userId,
        userId,
        profileData,
        connectWithZerodha,
        disconnect,
        fetchProfile,
        isLoading,
      }}
    >
      {children}
    </ZerodhaAuthContext.Provider>
  );
};

export const useZerodhaAuth = () => {
  const context = useContext(ZerodhaAuthContext);
  if (context === undefined) {
    throw new Error('useZerodhaAuth must be used within a ZerodhaAuthProvider');
  }
  return context;
};
