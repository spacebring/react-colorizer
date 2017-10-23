import "jsdom-global/register";
import React from "react";
import { expect } from "chai";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ColorPicker from "../src";

Enzyme.configure({ adapter: new Adapter() });

describe("<ColorPicker /> full DOM rendering", () => {
  it("has 1 children", () => {
    const wrapper = mount(
      <ColorPicker
        color="#e56500"
        height={50}
        width={255}
        onColorChanged={() => {}}
      />
    );
    expect(wrapper.children()).to.have.length(1);
  });
  it("child has 1 child", () => {
    const wrapper = mount(
      <ColorPicker
        color="#e56500"
        height={50}
        width={255}
        onColorChanged={() => {}}
      />
    );
    expect(wrapper.childAt(0).children()).to.have.length(1);
  });
});

