import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Picker,
  Form,
  List,
  ListItem,
  Icon,
  Right,
  Body,
  Left
} from 'native-base';
import BottomModal from '../../Components/BottomModal';
import { Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Modal, {
  ModalContent,
  ModalFooter,
  ModalButton,
  ModalTitle
} from 'react-native-modals';

const SORT_OPTIONS = [
  { id: 0, title: 'Newest', sort: 'date', order: 'desc' },
  { id: 1, title: 'Oldest', sort: 'date', order: 'asc' },
  { id: 2, title: 'Most Expensive', sort: 'price', order: 'desc' },
  { id: 3, title: 'Cheapest', sort: 'price', order: 'asc' }
];

class SortModal extends Component {
  handleClickOption(option) {
    const params = { ...this.props.productData.params };
    if (params.page) {
      delete params.page;
    }
    params.sort = option.sort;
    params.order = option.order;
    this.props.productAction.saveParams(params);
    this.props.productAction.reload(this.props.authData.token, params);
    this.props.onRequestClose();
  }

  renderOptions() {
    return SORT_OPTIONS.map(option => (
      <TouchableHighlight>
        <ListItem
          noIndent
          button
          onPress={() => this.handleClickOption(option)}>
          <Left>
            <Text>{option.title}</Text>
          </Left>
          <Right>
            {this.props.productData.params.sort &&
            option.sort === this.props.productData.params.sort &&
            option.order === this.props.productData.params.order ? (
              <Icon name="check" type="MaterialIcons" />
            ) : null}
          </Right>
        </ListItem>
      </TouchableHighlight>
    ));
  }
  render() {
    return (
      <Modal.BottomModal
        modalTitle={<ModalTitle title="Sort" />}
        onTouchOutside={() => this.props.onRequestClose()}
        onSwipeOut={() => this.props.onRequestClose()}
        visible={this.props.visible}>
        <ModalContent>
          <List>{this.renderOptions()}</List>
        </ModalContent>
      </Modal.BottomModal>
    );
  }
}

export default SortModal;
