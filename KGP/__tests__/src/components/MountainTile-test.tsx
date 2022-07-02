import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import {fireEvent, render, act} from '@testing-library/react-native';

import MountainTile from '../../../src/components/MountainTile';
import Mountain from '../../../src/models/Mountain';

const mountain: Mountain = {
  id: 1,
  elevation: 1200,
  name: 'Super Górka',
  range: 'Pasmo',
};
const updateMountain = jest.fn();

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MountainTile mountain={mountain} updateMountain={updateMountain} />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders mountain data', () => {
  const {getByText} = render(
    <MountainTile mountain={mountain} updateMountain={updateMountain} />,
  );
  expect(getByText('Pasmo')).toBeTruthy();
  expect(getByText('Super Górka')).toBeTruthy();
  expect(getByText('1200 m n.p.m.')).toBeTruthy();
});

test('on checkbox click it calls updateMountain', async () => {
  const {getByTestId} = render(
    <MountainTile mountain={mountain} updateMountain={updateMountain} />,
  );
  const checkbox = getByTestId('m-1');
  await act(() => fireEvent(checkbox, 'onValueChange', true));
  expect(updateMountain).toBeCalled();
});
