import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Button, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NumberInput = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    getEventTimeFromStorage();
  }, []);

  const getEventTimeFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('timeToCreateEvent');
      if (data !== null) {
        setNumber(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error fetching timer from storage:', error);
    }
  };

  const handleNumberChange = text => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    setNumber(cleanedText);
  };

  const handleSetTime = async () => {
    try {
      await AsyncStorage.setItem('timeToCreateEvent', JSON.stringify(number));
      Keyboard.dismiss();
    } catch (error) {
      console.log('Error storing number:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={number}
        onChangeText={handleNumberChange}
        placeholder="Set time in minutes"
      />
      <Button title="Set Timer" onPress={handleSetTime} />
      {/* <Text>Time set to: {time}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    minWidth: 100,
    color: '#F85F6A',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
});

export default NumberInput;
