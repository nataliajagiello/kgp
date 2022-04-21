import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Mountain from '../models/Mountain';

const styles = StyleSheet.create({
  tile: {
    borderWidth: 1,
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
});

const MountainTile = ({mountain}: {mountain: Mountain}) => {
  return (
    <View style={styles.tile}>
      <Text style={styles.text}>{mountain.range}</Text>
      <Text style={styles.mainText}>{mountain.name}</Text>
      <Text style={styles.text}>{mountain.elevation} m n.p.m.</Text>
    </View>
  );
};

export default MountainTile;
