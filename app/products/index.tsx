import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Loader from '../../components/Loader';
import ThemeToggle from '../../components/ThemeToggle';
import { useApi } from '../../context/ApiContext';
import { useTheme } from '../../context/ThemeContext';

export default function Products() {
  const { products, fetchProducts, loading, error } = useApi();
  const router = useRouter();
  const { isDark } = useTheme();

  const styles = getStyles(isDark);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <ThemeToggle />
      </View>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item}
            onPress={() => router.push(`/products/${item.id}`)}
          >
            <View style={styles.productContainer}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingTop: 80 }}
      />
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#121212' : '#f5f5f5',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: isDark ? '#1a1a1a' : '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1000,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#333' : '#ddd',
    backgroundColor: isDark ? '#1e1e1e' : 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: isDark ? '#333' : '#f0f0f0',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: isDark ? '#fff' : '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: isDark ? '#aaa' : '#7f8c8d',
    textTransform: 'capitalize',
  },
  error: {
    padding: 20,
    color: '#e74c3c',
    textAlign: 'center',
    fontSize: 16,
  },
});