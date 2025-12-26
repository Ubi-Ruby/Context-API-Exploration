// components/ThemeToggle.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <TouchableOpacity 
      onPress={toggleTheme} 
      style={styles.container}
      activeOpacity={0.7}
    >
      <View style={[
        styles.toggleTrack,
        isDark ? styles.toggleTrackDark : styles.toggleTrackLight
      ]}>
        <View style={[
          styles.toggleThumb,
          isDark ? styles.toggleThumbDark : styles.toggleThumbLight,
          { transform: [{ translateX: isDark ? 20 : 0 }] }
        ]}>
          <Text style={styles.thumbIcon}>
            {isDark ? '🌙' : '☀️'}
          </Text>
        </View>
      </View>
      <Text style={[
        styles.themeText,
        isDark ? styles.themeTextDark : styles.themeTextLight
      ]}>
        {isDark ? 'Dark' : 'Light'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  toggleTrack: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    padding: 2,
    marginRight: 8,
  },
  toggleTrackLight: {
    backgroundColor: '#e0e0e0',
  },
  toggleTrackDark: {
    backgroundColor: '#444',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  toggleThumbLight: {
    backgroundColor: 'white',
  },
  toggleThumbDark: {
    backgroundColor: '#222',
  },
  thumbIcon: {
    fontSize: 12,
  },
  themeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  themeTextLight: {
    color: '#333',
  },
  themeTextDark: {
    color: '#fff',
  },
});