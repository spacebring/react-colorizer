import React from 'react';
import infoAddon from '@storybook/addon-info';
import { storiesOf, setAddon } from '@storybook/react-native';
import ColorPicker from '../../lib';

setAddon(infoAddon);

storiesOf('examples', module)
  .addWithInfo('main', () => (
    <ColorPicker
      height={50}
      color="#e56500"
      width={255}
      onColorChanged={this.onColorChanged}
    />
  ));
