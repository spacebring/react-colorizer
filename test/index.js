import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ColorPicker, { HarmonyTypes, fromHex, fullScheme } from '../src';

describe('<ColorPicker /> full DOM rendering', () => {
  it('has 3 children', () => {
    const wrapper = mount(
      <ColorPicker
        height={50}
        color="#e56500"
        width={255}
        onColorChanged={() => {}}
      />
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
      />
    );
    expect(wrapper.childAt(0).children()).to.have.length(1);
    expect(wrapper.childAt(1).children()).to.have.length(1);
    expect(wrapper.childAt(2).children()).to.have.length(1);
  });
});

describe('fullScheme', () => {
  it('"#e56500" color with "triad" harmony', () => {
    expect(fullScheme('#e56500', HarmonyTypes.TRIAD)).to.deep.equal([
      '#e56500',
      '#ff7e19',
      '#ff9732',
      '#fe7d00',
      '#f17d0d',
      '#fe7d00',
      '#00e565',
      '#19ff7e',
      '#32ff97',
      '#00fe7d',
      '#0df17d',
      '#00fe7d',
      '#6500e5',
      '#7e19ff',
      '#9732ff',
      '#7d00fe',
      '#7d0df1',
      '#7d00fe',
    ]);
  });
});

describe('fromHex', () => {
  it('"#e56500" color', () => {
    expect(fromHex('#e56500')).to.deep.equal({ r: 229, g: 101, b: 0 });
  });
});
