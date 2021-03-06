import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import {mountainsData} from '../data/mountains';
import Mountain from '../models/Mountain';
import MountainsSectionList from './MountainsSectionList';
import * as colors from '../styles/colors';

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: colors.main,
    color: 'white',
  },
});

const title = 'Korona Gór Polski';

const HomeScreen = () => {
  const [mountains, setMountains] = useState<Mountain[]>();

  useEffect(() => {
    const isSummitConcquered = async (id: number) => {
      const checkBoxValue: string =
        (await AsyncStorage.getItem(`${id}`)) ?? 'false';
      return JSON.parse(checkBoxValue);
    };

    const getConcqueredDate = async (id: number) => {
      const date = await AsyncStorage.getItem(`date-${id}`);
      return date ? new Date(date) : undefined;
    };

    const completeData = async () => {
      for (const mountain of mountainsData) {
        mountain.concquered = await isSummitConcquered(mountain.id);
        mountain.date = await getConcqueredDate(mountain.id);
      }
      setMountains(mountainsData);
    };

    completeData();
  }, []);

  return (
    <View style={styles.container}>
      {mountains ? (
        <>
          <Text style={styles.title}>{title}</Text>
          <MountainsSectionList
            mountains={mountains}
            setMountains={setMountains}
          />
        </>
      ) : (
        <ActivityIndicator
          size={60}
          color={colors.main}
          style={styles.activityIndicator}
        />
      )}
    </View>
  );
};

export default HomeScreen;
