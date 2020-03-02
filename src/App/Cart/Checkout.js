import React from 'react';
import {
  Text,
  Dimensions,
  ToastAndroid,
  ImageBackground,
  StyleSheet,
  Platform,
  View
} from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Thumbnail,
  ListItem,
  Icon,
  Body,
  Right,
  Fab,
  Separator,
  List,
  Left
} from 'native-base';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
//import BottomModal from '../../Components/BottomModal';
import Modal, {
  ModalContent,
  ModalFooter,
  ModalButton,
  ModalTitle
} from 'react-native-modals';
import { API_HOST } from 'react-native-dotenv';

const PAYMENT_METHODS = [
  {
    title: 'Cash',
    description: 'Pay using your money.',
    thumbnail: require('../../Public/assets/images/payment/cod.png'),
    paymentPage: 'Cod'
  },
  {
    title: 'BRI',
    description: 'Pay via your BRI bank account.',
    thumbnail: require('../../Public/assets/images/payment/bri.jpg'),
    paymentPage: 'BRI'
  }
];
class Checkout extends React.Component {
  renderPaymentMethods() {
    return PAYMENT_METHODS.map(x => (
      <ListItem thumbnail>
        <Left>
          <Thumbnail source={x.thumbnail} />
        </Left>
        <Body>
          <Text>{x.title}</Text>
          <Text note numberOfLines={1}>
            {x.description}
          </Text>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate(x.paymentPage)}>
            <Text>Choose...</Text>
          </Button>
        </Right>
      </ListItem>
    ));
  }

  render() {
    return (
      <Container>
        <Content>
          <List>{this.renderPaymentMethods()}</List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.auth,
  productData: state.product,
  cartData: state.cart,
  categoryData: state.category
});

const mapDispatchToProps = dispatch => ({
  authAction: {
    updateProfile: (token, id, data) => {
      const formData = new FormData();
      Object.keys(data).map(key => {
        formData.append(key, data[key]);
      });
      const payload = Axios.put(`${API_HOST}/users/${id}`, formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' }
      });
      dispatch({ type: 'AUTH_UPDATE_PROFILE', payload });
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
