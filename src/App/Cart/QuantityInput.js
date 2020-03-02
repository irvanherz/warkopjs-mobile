import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

class QuantityInput extends React.Component {
  handleIncrement() {
    this.props.cartAction.increaseItem(this.props.target.id);
  }

  handleDecrement() {
    this.props.cartAction.decreaseItem(this.props.target.id);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.handleDecrement()}>
          <View style={styles.buttonMinus}>
            <Text>-</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          {...this.props}
          editable={false}
          value={this.props.target.qty.toString()}
          style={styles.text}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.handleIncrement()}>
          <View style={styles.buttonPlus}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 40,
    overflow: 'hidden',
    elevation: 2
  },
  text: {
    paddingVertical: 0,
    backgroundColor: '#fff',
    minWidth: 32,
    flex: 1,
    textAlign: 'center',
    color: '#000'
  },
  buttonMinus: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    padding: 4,
    minWidth: 32
  },
  buttonPlus: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    padding: 4,
    minWidth: 32
  }
});

export default QuantityInput;
