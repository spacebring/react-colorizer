import React from "react";
import { Dimensions, ScrollView, View } from "react-native";

import { storiesOf } from "@storybook/react-native";

import ColorPicker from "../../lib";

const { width } = Dimensions.get("window");

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "hsl(26, 100%, 44%)"
    };
    this.onColorChanged = this.onColorChanged.bind(this);
  }

  onColorChanged(color) {
    this.setState(() => ({
      color
    }));
  }

  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: "#EDEBE6", height: 50 }} />
        <ColorPicker
          height={50}
          color={this.state.color}
          width={width}
          onColorChanged={this.onColorChanged}
        />
        <View style={{ backgroundColor: "#EDEBE6", height: 50 }} />
        <View
          style={{
            backgroundColor: this.state.color,
            height: 50,
            marginTop: 10
          }}
        />
      </ScrollView>
    );
  }
}

storiesOf("examples", module).add("main", () => <Example />);
