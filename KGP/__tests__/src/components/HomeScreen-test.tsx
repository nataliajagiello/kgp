import 'react-native';
import React from 'react';
import HomeScreen from '../../../src/components/HomeScreen';

import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';

describe('HomeScreen', () => {
  it('renders correctly', async () => {
    let tree;
    await renderer.act(async () => {
      tree = renderer.create(<HomeScreen />);
    });
    // @ts-ignore
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders app title', async () => {
    const {findByText} = render(<HomeScreen />);
    expect(await findByText('Korona Gór Polski')).toBeTruthy();
  });

  //temporary disabled, becasue of calendar click
  // it('updates concquered qty on checkbox click', async () => {
  //   const {findByTestId, findByText} = render(<HomeScreen />);
  //   const checkbox = await findByTestId('m-7');
  //   await act(async () => {
  //     fireEvent(checkbox, 'onValueChange', true);
  //   });
  //   expect(await findByText('Zdobyte 1/28')).toBeTruthy();
  //   expect(await findByText('Do zdobycia 27/28')).toBeTruthy();
  // });
});
