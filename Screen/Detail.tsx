import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StoreImageExample = () => {
  const [productName, setProductName] = useState('');
  const [productAmount, setProductAmount] = useState('');
  const [imageURI, setImageURI] = useState('');

  const handleStoreProduct = async () => {
    if (!productName || !productAmount || !imageURI) {
      Alert.alert('Error', 'Please provide all product details');
      return;
    }

    try {
      await AsyncStorage.setItem('productName', productName);
      await AsyncStorage.setItem('productAmount', productAmount);
      await AsyncStorage.setItem('imageURI', imageURI);

      console.log('Stored Product Details:');
      console.log('Product Name:', productName);
      console.log('Product Amount:', productAmount);
      console.log('Image URI:', imageURI);

      Alert.alert('Success', 'Product details and image stored successfully');

      setProductName('');
      setProductAmount('');
      setImageURI('');
    } catch (error) {
      console.error('Error storing data:', error);
      Alert.alert('Error', 'Failed to store data');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        placeholderTextColor="gray" // Set placeholder text color
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Amount"
        placeholderTextColor="gray" // Set placeholder text color
        value={productAmount}
        onChangeText={setProductAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Image URI"
        placeholderTextColor="gray" // Set placeholder text color
        value={imageURI}
        onChangeText={setImageURI}
      />
      <TouchableOpacity style={styles.button} onPress={handleStoreProduct}>
        <Text style={styles.buttonText}>Store Product Details and Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'black', // Text color adjusted for white background
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StoreImageExample;
