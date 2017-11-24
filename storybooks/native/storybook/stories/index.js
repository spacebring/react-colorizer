import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

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
    this.onSetRandomColor = this.onSetRandomColor.bind(this);
  }

  onColorChanged(color) {
    this.setState(() => ({
      color
    }));
  }

  onSetRandomColor() {
    const randomColor = `#${("00000" +
      ((Math.random() * (1 << 24)) | 0).toString(16)
    ).slice(-6)}`;
    this.onColorChanged(randomColor);
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
          onColorChangeStart={() => console.log('start')}
          onColorChangeEnd={() => console.log('end')}
        />
        <View style={{ backgroundColor: "#EDEBE6", height: 50 }} />
        <View
          style={{
            backgroundColor: this.state.color,
            height: 50,
            marginBottom: 10,
            marginTop: 10
          }}
        />
        <TouchableOpacity onPress={this.onSetRandomColor}>
          <Text>Set random color</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

storiesOf("examples", module).add("main", () => <Example />);
