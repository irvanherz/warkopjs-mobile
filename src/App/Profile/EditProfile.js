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
  Separator
} from 'native-base';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import { API_HOST } from 'react-native-dotenv';
//import BottomModal from '../../Components/BottomModal';
import Modal, {
  ModalContent,
  ModalFooter,
  ModalButton,
  ModalTitle
} from 'react-native-modals';
class EditProfile extends React.Component {
  state = {
    showEditName: false,
    showEditUsername: false,
    showEditPassword: false,
    name: '',
    username: '',
    passwordA: '',
    passwordB: '',
    passwordC: ''
  };
  handleUpdate(data) {
    this.props.authAction.updateProfile(
      this.props.authData.token,
      this.props.authData.id,
      data
    );
  }

  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../../Public/assets/images/cover.jpg')}
          style={styles.cover}>
          <TouchableOpacity
            onPress={() =>
              ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true
              }).then(image => {
                ToastAndroid.show('Uploading picture...', ToastAndroid.LONG);
                const photoData = {
                  name: image.path.split('/').pop(),
                  type: image.mime,
                  size: image.size,
                  uri:
                    Platform.OS === 'android'
                      ? image.path
                      : image.path.replace('file://', '')
                };
                this.handleUpdate({ photo: photoData });
              })
            }>
            <Thumbnail
              style={{ borderColor: '#FFF', borderWidth: 2, elevation: 5 }}
              source={
                this.props.authData.photo
                  ? { uri: this.props.authData.photo }
                  : require('../../Public/assets/images/cover.jpg')
              }
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: '#FFF',
              marginVertical: 8,
              marginHorizontal: 100,
              textAlign: 'center'
            }}>
            {this.props.authData.name}
          </Text>
        </ImageBackground>
        <Content>
          <ListItem
            button
            onPress={() => this.setState({ showEditName: true })}>
            <Body>
              <Text>Name</Text>
              <Text note numberOfLines={1}>
                {this.props.authData.name}
              </Text>
            </Body>
          </ListItem>
          <ListItem
            button
            onPress={() => this.setState({ showEditUsername: true })}>
            <Body>
              <Text>Username</Text>
              <Text note numberOfLines={1}>
                {this.props.authData.username}
              </Text>
            </Body>
          </ListItem>
          <ListItem
            button
            onPress={() => this.setState({ showEditPassword: true })}>
            <Body>
              <Text>Password</Text>
              <Text note numberOfLines={1}>
                ********
              </Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Change</Text>
              </Button>
            </Right>
          </ListItem>
        </Content>
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ showEditPassword: true })}>
          <Icon name="edit" type="MaterialIcons" />
        </Fab>
        {/* Edit name */}
        <Modal.BottomModal
          modalTitle={<ModalTitle title="Edit Name" />}
          onSwipeOut={() => this.setState({ showEditName: false })}
          visible={this.state.showEditName}
          width={0.6}
          footer={
            <ModalFooter>
              <ModalButton
                text="Cancel"
                onPress={() => this.setState({ showEditName: false })}
              />
              <ModalButton
                text="OK"
                onPress={() => {
                  this.handleUpdate({ name: this.state.name });
                  this.setState({ showEditName: false });
                }}
              />
            </ModalFooter>
          }>
          <ModalContent>
            <Item rounded style={{ margin: 16, alignSelf: 'center' }}>
              <Input
                placeholder="Name"
                onChangeText={text => this.setState({ name: text })}
              />
            </Item>
          </ModalContent>
        </Modal.BottomModal>
        {/* Edit username */}
        <Modal.BottomModal
          modalTitle={<ModalTitle title="Edit Username" />}
          onSwipeOut={() => this.setState({ showEditUsername: false })}
          visible={this.state.showEditUsername}
          width={0.6}
          footer={
            <ModalFooter>
              <ModalButton
                text="Cancel"
                onPress={() => this.setState({ showEditUsername: false })}
              />
              <ModalButton
                text="OK"
                onPress={() => {
                  this.handleUpdate({ username: this.state.username });
                  this.setState({ showEditUsername: false });
                }}
              />
            </ModalFooter>
          }>
          <ModalContent>
            <Item rounded style={{ margin: 16, alignSelf: 'center' }}>
              <Input
                placeholder="Username"
                onChangeText={text => this.setState({ username: text })}
              />
            </Item>
          </ModalContent>
        </Modal.BottomModal>
        {/* Edit Password */}
        <Modal.BottomModal
          modalTitle={<ModalTitle title="Edit Password" />}
          onSwipeOut={() => this.setState({ showEditPassword: false })}
          visible={this.state.showEditPassword}
          width={0.6}
          footer={
            <ModalFooter>
              <ModalButton
                text="Cancel"
                onPress={() => this.setState({ showEditPassword: false })}
              />
              <ModalButton text="OK" onPress={() => {}} />
            </ModalFooter>
          }>
          <ModalContent>
            <Item rounded style={{ margin: 16, alignSelf: 'center' }}>
              <Input
                placeholder="Password"
                onChangeText={text => this.setState({ passwordA: text })}
              />
            </Item>
            <Item rounded style={{ margin: 16, alignSelf: 'center' }}>
              <Input
                placeholder="Retype password"
                onChangeText={text => this.setState({ passwordB: text })}
              />
            </Item>
            <Item rounded style={{ margin: 16, alignSelf: 'center' }}>
              <Input
                placeholder="Old Password"
                onChangeText={text => this.setState({ passwordC: text })}
              />
            </Item>
            <Button
              full
              onPress={() => {
                this.handleUpdate({
                  old_password: this.state.passwordC,
                  password_1: this.state.passwordA,
                  password_2: this.state.passwordB
                });
                this.setState({ showEditPassword: false });
              }}>
              <Text>Change</Text>
            </Button>
          </ModalContent>
        </Modal.BottomModal>
      </Container>
    );
  }
}
const dimension = Dimensions.get('window');
const styles = StyleSheet.create({
  cover: {
    width: dimension.width,
    height: dimension.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  }
});

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
)(EditProfile);
