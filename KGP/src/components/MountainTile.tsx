import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Mountain from '../models/Mountain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {formatDate} from '../helpers/dateHelpers';

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
    flex: 1,
  },
  checkbox: {
    transform: [{scaleX: 1.3}, {scaleY: 1.3}],
    marginLeft: 25,
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
  const [date, setDate] = useState<Date>(new Date());
  const [showDatepicker, setShowDatepicker] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    setShowDatepicker(false);
    selectedDate && setDate(selectedDate);
    updateData(true, event.type === 'dismissed' ? undefined : selectedDate);
  };

  const handleCheckboxChange = async (value: boolean) => {
    setSelection(value);
    if (value) {
      setShowDatepicker(true);
    } else {
      updateData(false, undefined);
    }
  };

  const updateData = async (
    concqured: boolean,
    concqueredDate: Date | undefined,
  ) => {
    await AsyncStorage.setItem(`${mountain.id}`, `${concqured}`);
    await AsyncStorage.setItem(`date-${mountain.id}`, `${concqueredDate}`);
    mountain.concquered = concqured;
    mountain.date = concqueredDate;
    updateMountain(mountain);
  };

  return (
    <View style={styles.tile}>
      {showDatepicker && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          is24Hour={false}
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
      <View style={styles.checkboxContainer}>
        <CheckBox
          testID={`m-${mountain.id.toString()}`}
          value={isSelected}
          onValueChange={(value: boolean) => {
            handleCheckboxChange(value);
          }}
          style={styles.checkbox}
        />
      </View>
      <View style={styles.dataContainer}>
        {mountain?.concquered && mountain?.date && (
          <Text testID="m-date" style={styles.text}>
            {formatDate(mountain.date)}
          </Text>
        )}
        <Text style={styles.text}>{mountain.range}</Text>
        <Text style={styles.mainText}>{mountain.name}</Text>
        <Text style={styles.text}>{mountain.elevation} m n.p.m.</Text>
      </View>
    </View>
  );
};

export default MountainTile;
