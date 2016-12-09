import React from 'react';
import { storiesOf } from '@kadira/react-native-storybook';
import ColorPicker from '../../lib';

storiesOf('examples', module)
  .add('main', () => (
    <ColorPicker
      height={50}
      color="#e56500"
      width={255}
      onColorChanged={this.onColorChanged}
    />
  ));
