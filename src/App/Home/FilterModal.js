import React, { Component } from 'react';
import { Container, Header, Content, Picker, Form } from 'native-base';
import BottomModal from '../../Components/BottomModal';
import { Text, Button } from 'react-native';
import Modal, {
  ModalContent,
  ModalFooter,
  ModalButton,
  ModalTitle
} from 'react-native-modals';

export default class FilterModal extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    category: '0'
  };

  handleApply() {
    const params = this.props.productData.params;
    if (this.state.category == 0) {
      if (params.category) {
        delete params.category;
      }
    } else {
      params.category = this.state.category;
    }
    this.props.productAction.reload(this.props.authData.token, params);
    this.props.onRequestClose();
  }

  componentWillReceiveProps(nextProps) {
    //fix: check changes before set state
    this.setState({
      category: nextProps.productData.params.category
        ? nextProps.productData.params.category
        : 0
    });
  }

  renderPickerItems() {
    const items = [];
    items.push(<Picker.Item label="All Categories" value="0" />);
    this.props.productData.categories.forEach(category => {
      items.push(<Picker.Item label={category.name} value={category.id} />);
    });
    return items;
  }

  render() {
    return (
      <Modal.BottomModal
        modalTitle={<ModalTitle title="Filter" />}
        onTouchOutside={() => this.props.onRequestClose()}
        onSwipeOut={() => this.props.onRequestClose()}
        visible={this.props.visible}
        footer={
          <ModalFooter>
            <ModalButton
              text="Cancel"
              onPress={() => this.props.onRequestClose()}
            />
            <ModalButton text="OK" onPress={() => this.handleApply()} />
          </ModalFooter>
        }>
        <ModalContent>
          <Picker
            selectedValue={this.state.category}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ category: itemValue })
            }>
            {this.renderPickerItems()}
          </Picker>
        </ModalContent>
      </Modal.BottomModal>
    );
  }
}
