import React, { useState } from 'react';
import { Button, Image, View, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'react-native-image-picker';
import { ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';

const App = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleChooseImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, async (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          if (uri) {
            setImageUri(uri);
            try {
              await AsyncStorage.setItem('imageUri', uri);
              console.log('Image saved to local data');
            } catch (error) {
              console.error('Error saving image to local data:', error);
            }
          }
        }
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Choose Image" onPress={handleChooseImage} />
    </View>
  );
};

export default App;
