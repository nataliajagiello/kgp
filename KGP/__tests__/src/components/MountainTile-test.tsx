import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import MountainTile from '../../../src/components/MountainTile';
import Mountain from '../../../src/models/Mountain';

it('renders correctly', () => {
  const mountain: Mountain = {
    id: 1,
    elevation: 1200,
    name: 'Super Górka',
    range: 'Pasmo',
  };
  const tree = renderer.create(<MountainTile mountain={mountain} />).toJSON();
  expect(tree).toMatchSnapshot();
});
