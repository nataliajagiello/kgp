import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  let tree;
  await renderer.act(async () => {
    tree = renderer.create(<App />);
  });
  // @ts-ignore
  expect(tree.toJSON()).toMatchSnapshot();
});
