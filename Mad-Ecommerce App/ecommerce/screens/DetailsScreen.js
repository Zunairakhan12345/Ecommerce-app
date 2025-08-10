import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storedvalue,setstoredvalue]=useState();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!product) {
    return <Text style={{ flex: 1, textAlign: 'center' }}>Product not found.</Text>;
  }

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setstoredvalue(value);
        return value;
      }
      console.log('No data found for this key');
      return null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  };
  const handlesetdata=()=>
  {storeData('productname', 'product.title');
    storeData('productprice', 'product.price');
    storeData('productcategory', 'product.category');
    storeData('productdescription', 'product.description');

    const prod = {productname : product.title , productprice:product.price, productcategory:product.category, productdescription:product.description };
    storeData('prod', JSON.stringify(prod));
  }
const handlegetdata=async()=>{
      const username = await getData('productname');
      const userString = await getData('prod');
      const userObject = JSON.parse(userString);
}

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <TouchableOpacity style={styles.btn} onPress={handlesetdata}><Text>Save</Text></TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={handlegetdata}><Text>load</Text></TouchableOpacity>
      {storedvalue? <Text>{storedvalue}</Text>:null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginVertical: 8,
  },
  btn: {
    margin: 10,
    backgroundColor: '#4CAF50',
    fontSize: 30,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  category: {
    fontStyle: 'italic',
  },
});

export default DetailsScreen;
