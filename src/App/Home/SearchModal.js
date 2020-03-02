import React, { Component } from 'react';
import { Header, Icon, Right, Body, Left, Item, Input } from 'native-base';
import BottomModal from '../../Components/BottomModal';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

class SearchModal extends Component {
  render() {
    return (
      <BottomModal {...this.props}>
        <Header transparent style={styles.header}>
          <Left style={styles.leftHeader}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" type="MaterialIcons" />
            </TouchableOpacity>
          </Left>
          <Body style={styles.searchBody}>
            <Item style={styles.searchItem}>
              <Input placeholder="Search" />
              <Icon name="search" type="MaterialIcons" />
            </Item>
          </Body>
          <Right style={styles.leftHeader}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Cart')}>
              <Icon name="shopping-cart" type="MaterialIcons" />
              {this.props.cartData.items.length ? (
                <View style={styles.dotBadge} />
              ) : null}
            </TouchableOpacity>
          </Right>
        </Header>
      </BottomModal>
    );
  }
}

const styles = StyleSheet.create({
  header: { borderBottomColor: '#bbb', borderBottomWidth: 1 },
  leftHeader: { flex: 0 },
  searchBody: {
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  searchItem: { borderColor: '#FFF' },
  rightHeader: { flex: 0 },
  dotBadge: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 32
  }
});

export default SearchModal;
