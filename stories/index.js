import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Example } from './Example';

storiesOf('Examples', module)
  .add('Main', () => (
    <Example />
  ));
