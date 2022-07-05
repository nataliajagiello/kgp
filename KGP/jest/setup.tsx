import React from 'react';

const hStyle = {height: 412};

jest.mock('@react-native-community/datetimepicker/src/layoutUtilsIOS', () => ({
  getPickerHeightStyle: () => hStyle,
}));
