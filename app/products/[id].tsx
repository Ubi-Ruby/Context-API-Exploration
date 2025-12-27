import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApi } from '../../context/ApiContext';
import { useTheme } from '../../context/ThemeContext'; 

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const { products } = useApi();
  const { isDark } = useTheme(); 

  const styles = getStyles(isDark);

  const product: any = products.find((p: any) => p.id == id);

  if (!product) return <Text style={styles.notFound}>Product not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.image}
        resizeMode="contain"
      />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#121212' : '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: isDark ? '#1e1e1e' : 'white',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: isDark ? '#1e1e1e' : 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: isDark ? '#fff' : '#333',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 15,
  },
  category: {
    fontSize: 16,
    color: '#3498db',
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: isDark ? '#ddd' : '#555',
    marginBottom: 20,
  },
  notFound: {
    flex: 1,
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
    color: '#e74c3c',
  },
});
