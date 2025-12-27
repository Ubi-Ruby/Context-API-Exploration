import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ApiProvider } from '../context/ApiContext';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function RootLayoutNav() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen 
          name="products" 
          options={{ 
            title: 'Products',
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="products/[id]" 
          options={{ title: 'Product Details' }} 
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ApiProvider>
          <RootLayoutNav />
        </ApiProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}