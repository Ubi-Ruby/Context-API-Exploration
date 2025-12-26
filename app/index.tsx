import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { userToken, loading } = useAuth();

  if (loading) {
    return null; // Or a loading component
  }

  // If not logged in, go to login
  if (!userToken) {
    return <Redirect href="/login" />;
  }

  // If logged in, go to products
  return <Redirect href="/products" />;
}