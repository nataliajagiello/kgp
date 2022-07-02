import React from 'react';
import {Text, SectionList, StyleSheet} from 'react-native';
import Mountain from '../models/Mountain';
import MountainTile from './MountainTile';
import * as colors from '../styles/colors';

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: colors.main,
    color: 'white',
  },
});

const MountainsSectionList = ({
  mountains,
  setMountains,
}: {
  mountains: Mountain[];
  setMountains: Function;
}) => {
  const concquered = mountains.filter(x => x.concquered);
  const left = mountains.filter(x => !x.concquered);

  const DATA = [
    {
      sectionTitle: `Zdobyte ${concquered.length}/${mountains.length}`,
      data: concquered,
    },
    {
      sectionTitle: `Do zdobycia ${left.length}/${mountains.length}`,
      data: left,
    },
  ];

  const updateMountain = async (mountain: Mountain) => {
    if (!mountains) {
      return;
    }
    const mountainsCopy = [...mountains];
    let updated = mountainsCopy.find(x => x.id === mountain.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updated = mountain;
    setMountains(mountainsCopy);
  };

  return (
    <SectionList
      sections={DATA}
      keyExtractor={item => item.id.toString()}
      renderItem={itemInfo => (
        <MountainTile
          mountain={itemInfo.item}
          updateMountain={updateMountain}
        />
      )}
      renderSectionHeader={({section: {sectionTitle}}) => (
        <Text style={styles.title}>{sectionTitle}</Text>
      )}
    />
  );
};

export default MountainsSectionList;
