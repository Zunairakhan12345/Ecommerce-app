import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProductItem = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.name}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  price: {
    color: 'gray',
  },
});

export default ProductItem;
