import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

import {
  CardItem,
  Right,
  Icon,
  List,
  ListItem,
  Container,
  Content
} from 'native-base';

import Modal from 'react-native-modal';

import BottomModal from '../../Components/BottomModal';
import QuantityInput from '../../Components/QuantityInput';

export default class Test extends React.Component {
  state = {
    visible: false
  };
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#000',
          flex: 1
        }}>
        <Button
          onPress={() => this.setState({ visible: true })}
          title="Modal"
        />
        <Modal
          isVisible={true}
          swipeDirection="down"
          style={{ justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#fff' }}>
            <Text>bottom half</Text>
          </View>
        </Modal>
        <BottomModal
          visible={this.state.visible}
          onRequestClose={() => this.setState({ visible: false })}>
          <Text>Hehehehe</Text>
        </BottomModal>
      </View>
    );
  }
}
