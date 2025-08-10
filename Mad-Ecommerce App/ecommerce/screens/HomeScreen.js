import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import ProductItem from '../components/ProductItem';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Check your internet connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (error) {
    return <Text style={{ flex: 1, textAlign: 'center' }}>{error}</Text>;
  }

  const renderItem = ({ item }) => (
    <ProductItem
      product={item}
      onPress={() => navigation.navigate('Details', { productId: item.id })}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;
