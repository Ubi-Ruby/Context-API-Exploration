import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Products from './products/index';

export default function Login() {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, userToken, loading: authLoading } = useAuth();
  const { isDark } = useTheme();

  const styles = getStyles(isDark);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoginLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      Alert.alert('Login Failed', err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  if (userToken) {
    return <Products />;
  }

  if (authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Checking authentication...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Theme Toggle */}
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput 
            value={email} 
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={isDark ? '#888' : '#999'} // DYNAMIC
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loginLoading}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <View style={styles.passwordHeader}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPasswordText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.passwordInputWrapper}>
            <TextInput 
              value={password} 
              onChangeText={setPassword}
              style={[styles.input, styles.passwordInput]}
              placeholder="Enter your password"
              placeholderTextColor={isDark ? '#888' : '#999'} // DYNAMIC
              secureTextEntry={!showPassword}
              editable={!loginLoading}
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity 
          style={[styles.loginButton, loginLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loginLoading}
        >
          {loginLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Test Credentials Hint */}
        <View style={styles.hintContainer}>
          <Text style={styles.hintTitle}>Test Credentials:</Text>
          <Text style={styles.hintText}>Email: eve.holt@reqres.in</Text>
          <Text style={styles.hintText}>Password: cityslicka</Text>
          <Text style={styles.hintTextSmall}>(or any user from reqres.in)</Text>
        </View>
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#121212' : '#f8f9fa',
  },
  themeToggleContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: isDark ? '#fff' : '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: isDark ? '#bbb' : '#7f8c8d',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: isDark ? '#ddd' : '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: isDark ? '#444' : '#ddd',
    backgroundColor: isDark ? '#1e1e1e' : 'white',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    fontSize: 16,
    color: isDark ? '#fff' : '#2c3e50',
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  showPasswordText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '600',
  },
  passwordInputWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  loginButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: '#bdc3c7',
    shadowOpacity: 0,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hintContainer: {
    backgroundColor: isDark ? '#1a1a1a' : '#e8f4fc',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: isDark ? 1 : 0,
    borderColor: isDark ? '#333' : 'transparent',
  },
  hintTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: isDark ? '#3498db' : '#2980b9',
    marginBottom: 6,
  },
  hintText: {
    fontSize: 13,
    color: isDark ? '#ccc' : '#2c3e50',
    marginBottom: 2,
  },
  hintTextSmall: {
    fontSize: 12,
    color: isDark ? '#999' : '#7f8c8d',
    fontStyle: 'italic',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDark ? '#121212' : '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: isDark ? '#ccc' : '#7f8c8d',
  },
});