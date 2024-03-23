import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckStoredData = () => {
  const [storedData, setStoredData] = useState(null);

  const fetchData = async () => {
    try {
      // Retrieve the stored data from AsyncStorage
      const productName = await AsyncStorage.getItem('productName');
      const productAmount = await AsyncStorage.getItem('productAmount');
      const imageURI = await AsyncStorage.getItem('imageURI');

      console.log('Retrieved Product Details:');
      console.log('Product Name:', productName);
      console.log('Product Amount:', productAmount);
      console.log('Image URI:', imageURI);

      // Store the retrieved data in state
      setStoredData({
        productName,
        productAmount,
        imageURI,
      });
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>Fetch Stored Data</Text>
      </TouchableOpacity>
      {storedData && (
        <View style={styles.dataContainer}>
          <Text style={styles.text}>Stored Product Details:</Text>
          <Text>Product Name: {storedData.productName}</Text>
          <Text>Product Amount: {storedData.productAmount}</Text>
          <Text>Image URI: {storedData.imageURI}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CheckStoredData;
