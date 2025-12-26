import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setUserToken(token);
        }
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      
      setUserToken(res.data.token);
      await AsyncStorage.setItem('token', res.data.token);
      return res.data.token; // Return the token
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Login failed');
    }
  }, []);

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

export const useAuth = () => useContext(AuthContext);