import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Mountain from '../models/Mountain';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  tile: {
    borderWidth: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  mainText: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MountainTile = ({mountain}: {mountain: Mountain}) => {
  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    const getValue = async () => {
      const checkBoxValue: string =
        (await AsyncStorage.getItem(`${mountain.id}`)) ?? 'false';
      setSelection(JSON.parse(checkBoxValue));
    };
    getValue();
  }, [mountain.id]);

  const handleCheckboxChange = async (value: boolean) => {
    setSelection(value);
    await AsyncStorage.setItem(`${mountain.id}`, `${value}`);
  };

  return (
    <View style={styles.tile}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={handleCheckboxChange}
          // style={styles.checkbox}
        />
      </View>
      <View style={{flex: 10}}>
        <Text style={styles.text}>{mountain.range}</Text>
        <Text style={styles.mainText}>{mountain.name}</Text>
        <Text style={styles.text}>{mountain.elevation} m n.p.m.</Text>
      </View>
    </View>
  );
};

export default MountainTile;
