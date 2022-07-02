import React, {useState} from 'react';
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
  dataContainer: {flex: 10},
});

const MountainTile = ({
  mountain,
  updateMountain,
}: {
  mountain: Mountain;
  updateMountain: Function;
}) => {
  const [isSelected, setSelection] = useState(mountain.concquered);

  const handleCheckboxChange = async (value: boolean) => {
    setSelection(value);
    await AsyncStorage.setItem(`${mountain.id}`, `${value}`);
    mountain.concquered = value;
    updateMountain(mountain);
  };

  return (
    <View style={styles.tile}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          testID={`m-${mountain.id.toString()}`}
          value={isSelected}
          onValueChange={(value: boolean) => {
            handleCheckboxChange(value);
          }}
          // style={styles.checkbox}
        />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.text}>{mountain.range}</Text>
        <Text style={styles.mainText}>{mountain.name}</Text>
        <Text style={styles.text}>{mountain.elevation} m n.p.m.</Text>
      </View>
    </View>
  );
};

export default MountainTile;
