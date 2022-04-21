import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {mountains} from '../data/mountains';
import MountainTile from './MountainTile';

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#94e7ef',
    color: 'white',
  },
});

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.title}>Korona Gór Polski</Text>
      <FlatList
        data={mountains}
        renderItem={itemInfo => <MountainTile mountain={itemInfo.item} />}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

export default HomeScreen;
