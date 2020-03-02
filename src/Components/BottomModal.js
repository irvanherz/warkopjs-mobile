import React, { Component } from 'react';
import {
  View,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'native-base';

export default class BottomModal extends Component {
  handleClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }
  render() {
    return (
      <Modal {...this.props} transparent animationType={'fade'}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => this.handleClose()}>
            <View style={styles.backdrop} />
          </TouchableOpacity>
          <View style={styles.innerContainer}>
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={() => this.handleClose()}>
                <Icon name="close" type="MaterialIcons" />
              </TouchableOpacity>
            </View>
            <View>{this.props.children}</View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  modalContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: '100%'
  },
  innerContainer: {
    backgroundColor: '#FFF',
    // padding: 16,
    alignItems: 'stretch'
  },
  closeButton: {
    alignSelf: 'flex-end'
  },
  backdrop: {
    flexDirection: 'column',
    height: '100%'
  }
});
