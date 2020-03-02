import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Item, Input, Body, Icon, Right, Header, Left } from 'native-base';

class HeaderMenu extends React.Component {
  state = {
    showSortModal: false,
    showFilterModal: false
  };

  handleSearch(text) {
    const params = { search: text };
    this.props.productAction.saveParams(params);
    this.props.productAction.reload(this.props.authData.token, params);
  }

  render() {
    return (
      <Header transparent style={styles.header}>
        <Left style={styles.leftHeader}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="menu" type="MaterialIcons" />
          </TouchableOpacity>
        </Left>
        <Body style={styles.searchBody}>
          <Item style={styles.searchItem}>
            <Input
              placeholder="Search"
              returnKeyType="search"
              onChangeText={text => this.handleSearch(text)}
            />
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
    borderRadius: 32,
    borderColor: '#FFF',
    borderWidth: 2
  }
});

export default HeaderMenu;
