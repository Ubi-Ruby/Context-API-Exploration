import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const ApiContext = createContext<any>(null);

export const ApiProvider = ({ children }: any) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://fakestoreapi.com/products');
      setProducts(res.data);
    } catch {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiContext.Provider value={{ products, fetchProducts, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
