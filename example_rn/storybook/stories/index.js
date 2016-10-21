import React from 'react';
import { storiesOf } from '@kadira/react-native-storybook';
import { ColorPicker } from '../../lib';

storiesOf('Examples', module)
  .add('Main', () => (
    <ColorPicker
      height={50}
      color="#e56500"
      onColorChanged={this.onColorChanged}
    />
  ));
