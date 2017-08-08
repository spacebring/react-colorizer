import React from 'react';
import { Dimensions } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ColorPicker from '../../lib';

const { width } = Dimensions.get('window');

storiesOf('examples', module)
  .add('main', () => (
    <ColorPicker
      height={50}
      color="#e56500"
      width={width}
      onColorChanged={action()}
    />
  ));
