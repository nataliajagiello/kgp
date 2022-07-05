import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import {fireEvent, render, act} from '@testing-library/react-native';

import MountainTile from '../../../src/components/MountainTile';
import Mountain from '../../../src/models/Mountain';
//import {DateTimePickerEvent} from '@react-native-community/datetimepicker';

const mountain: Mountain = {
  id: 1,
  elevation: 1200,
  name: 'Super Górka',
  range: 'Pasmo',
};
const updateMountain = jest.fn();

it('renders correctly', async () => {
  const tree = renderer
    .create(
      <MountainTile mountain={mountain} updateMountain={updateMountain} />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders mountain data', async () => {
  const {getByText} = render(
    <MountainTile mountain={mountain} updateMountain={updateMountain} />,
  );
  expect(getByText('Pasmo')).toBeTruthy();
  expect(getByText('Super Górka')).toBeTruthy();
  expect(getByText('1200 m n.p.m.')).toBeTruthy();
});

test('on checkbox click it shows calendar', async () => {
  const {findByTestId} = render(
    <MountainTile mountain={mountain} updateMountain={updateMountain} />,
  );
  const checkbox = await findByTestId('m-1');
  await act(async () => {
    fireEvent(checkbox, 'onValueChange', true);
  });
  const datepicker = await findByTestId('datePicker');
  expect(datepicker).toBeTruthy();
});
