import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import Products from './products/index';

export default function Login() {
  const [email, setEmail] = useState('kanza@mail.co');
  const [password, setPassword] = useState('123456');
  const [showProducts, setShowProducts] = useState(false);
  const { isDark } = useTheme();

  const styles = getStyles(isDark);

  const handleLogin = async () => {
    try {
      if (email && password) {
        setShowProducts(true);
      }
    } catch (err: any) {
      Alert.alert('Error', 'Login failed');
    }
  };

  if (showProducts) {
    return <Products />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      <Text style={styles.title}>Login</Text>
      
      <Text style={styles.label}>Email</Text>
      <TextInput 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input}
        placeholder="Enter email"
        placeholderTextColor={isDark ? '#999' : '#666'}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor={isDark ? '#999' : '#666'}
      />

      <Button 
        title="Login (Go to Products)" 
        onPress={handleLogin} 
        color={isDark ? '#3498db' : '#2980b9'}
      />
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: isDark ? '#121212' : '#f5f5f5',
  },
  themeToggleContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    color: isDark ? '#fff' : '#333',
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: isDark ? '#ddd' : '#333',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    borderColor: isDark ? '#444' : '#ddd',
    backgroundColor: isDark ? '#1e1e1e' : '#fff',
    color: isDark ? '#fff' : '#333',
    fontSize: 16,
  },
});