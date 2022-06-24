import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {mountains} from '../data/mountains';
import MountainTile from './MountainTile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#2E4053',
    color: 'white',
  },
});

const title = 'Korona Gór Polski';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={mountains}
        renderItem={itemInfo => <MountainTile mountain={itemInfo.item} />}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

export default HomeScreen;
