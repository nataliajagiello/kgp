import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';

import Mountain from '../../../src/models/Mountain';
import MountainsSectionList from '../../../src/components/MountainsSectionList';

const mountains: Mountain[] = [
  {
    id: 1,
    elevation: 1200,
    name: 'Super Górka',
    range: 'Pasmo',
  },
  {
    id: 2,
    elevation: 1300,
    name: 'Super Górka Dwa',
    range: 'Pasmo Dwa',
    concquered: true,
  },
];
const setMountains = jest.fn();

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MountainsSectionList
        mountains={mountains}
        setMountains={setMountains}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders concquered section title', () => {
  const {getByText} = render(
    <MountainsSectionList mountains={mountains} setMountains={setMountains} />,
  );
  expect(getByText('Zdobyte 1/2')).toBeTruthy();
});

it('renders left section title', () => {
  const {getByText} = render(
    <MountainsSectionList mountains={mountains} setMountains={setMountains} />,
  );
  expect(getByText('Do zdobycia 1/2')).toBeTruthy();
});
