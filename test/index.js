import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ColorPicker from '../src';

describe('<ColorPicker /> full DOM rendering', () => {
  it('has 3 children', () => {
    const wrapper = mount(
      <ColorPicker
        height={50}
        color="#e56500"
        width={255}
        onColorChanged={() => {}}
      />,
    );
    expect(wrapper.children()).to.have.length(3);
  });
  it('each children has 1 child', () => {
    const wrapper = mount(
      <ColorPicker
        height={50}
        color="#e56500"
        width={255}
        onColorChanged={() => {}}
      />,
    );
    expect(wrapper.childAt(0).children()).to.have.length(1);
    expect(wrapper.childAt(1).children()).to.have.length(1);
    expect(wrapper.childAt(2).children()).to.have.length(1);
  });
});
