
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
  isAuthenticated: false,
});

const VALID_CREDENTIALS = [
  { email: 'eve.holt@reqres.in', password: 'cityslicka' },
  { email: 'george.bluth@reqres.in', password: 'cityslicka' },
  { email: 'emma.wong@reqres.in', password: 'cityslicka' },
  { email: 'janet.weaver@reqres.in', password: 'cityslicka' },
  { email: 'charles.morris@reqres.in', password: 'cityslicka' },
  { email: 'kanza@mail.com', password: '123456' },
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.error('Error loading token:', error);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const isValid = VALID_CREDENTIALS.some(
      cred => cred.email.toLowerCase() === email.toLowerCase() && 
              cred.password === password
    );
    
    if (!isValid) {
      throw new Error('Invalid email or password');
    }
    
    const mockToken = `mock_token_${email}_${Date.now()}`;
    setUserToken(mockToken);
    await AsyncStorage.setItem('token', mockToken);
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      userToken, 
      login, 
      logout, 
      loading,
      isAuthenticated: !!userToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
