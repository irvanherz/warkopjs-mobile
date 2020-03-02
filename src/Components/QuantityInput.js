import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { color } from 'react-native-reanimated';
class QuantityInput extends React.Component {
  state = {
    currentValue: '1'
  };

  handleIncrement() {
    this.setState({
      currentValue: (parseInt(this.state.currentValue, 10) + 1).toString()
    });
    if (this.props.onChangeValue) {
      this.props.onChangeValue(this.state.currentValue);
    }
  }

  handleDecrement() {
    this.setState({
      currentValue: (parseInt(this.state.currentValue, 10) - 1).toString()
    });
    if (this.props.onChangeValue) {
      this.props.onChangeValue(this.state.currentValue);
    }
    if (this.props.onChangeValue) {
      this.props.onChangeValue(this.state.currentValue);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.handleDecrement()}>
          <View style={styles.button}>
            <Text>-</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          {...this.props}
          editable={false}
          value={this.state.currentValue}
          style={styles.text}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.handleIncrement()}>
          <View style={styles.button}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  text: {
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    minWidth: 40,
    textAlign: 'center',
    color: '#000'
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 4,
    minWidth: 32
  }
});

export default QuantityInput;
