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
      color: "hsl(26, 100%, 44%)",
      isDisabled: false,
      scrollEnabled: true
    };
    this.onColorChanged = this.onColorChanged.bind(this);
    this.onSetIsDisabled = this.onSetIsDisabled.bind(this);
    this.onSetRandomColor = this.onSetRandomColor.bind(this);
  }

  onColorChanged(color) {
    this.setState(() => ({
      color
    }));
  }

  onSetIsDisabled() {
    this.setState(() => ({
      isDisabled: !this.state.isDisabled
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
      <ScrollView scrollEnabled={this.state.scrollEnabled}>
        <View>
          <Text>Disabled</Text>
        </View>
        <ColorPicker height={50} isDisabled width={width} />
        <View>
          <Text>Enabled</Text>
        </View>
        <View style={{ backgroundColor: "#EDEBE6", height: 50 }} />
        <ColorPicker
          color={this.state.color}
          height={50}
          isDisabled={this.state.isDisabled}
          width={width}
          onColorChanged={this.onColorChanged}
          onColorChangeStart={() => {
            this.setState(() => ({
              scrollEnabled: false
            }));
          }}
          onColorChangeEnd={() => {
            this.setState(() => ({
              scrollEnabled: true
            }));
          }}
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
        <TouchableOpacity onPress={this.onSetIsDisabled}>
          <Text>Set disabled state ({String(this.state.isDisabled)})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onSetRandomColor}>
          <Text>Set random color</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

storiesOf("examples", module).add("main", () => <Example />);
