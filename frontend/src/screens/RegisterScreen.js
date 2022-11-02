/* eslint-disable prettier/prettier */
import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Strings, Colors} from '../constants';
import {black} from '../constants/colors';
import {Toast} from 'toastify-react-native';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      name: '',
      email: '',
      password: '',
      role: '',
      contactNumber: '',
      userDetails: {},
    };
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  // onChange UserId
  onChangeUserId = e => {
    this.setState({userId: e});
  };

  // onChange Name
  onChangeName = e => {
    this.setState({name: e});
  };

  // onChange Email
  onChangeEmail = e => {
    this.setState({email: e});
  };

  // onChange Password
  onChangePassword = e => {
    this.setState({password: e});
  };

  // onChange ContactNumber
  onChangeContactNumber = e => {
    this.setState({contactNumber: e});
  };

  // onChange Role
  onChangeRole = e => {
    this.setState({role: e});
  };

  //create USer
  createUser() {
    var url = 'http://10.0.2.2:8080/user/createUser';
    var data = {
      userId: this.state.userId,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
      contactNumber: this.state.contactNumber,
    };
    axios
      .post(url, data)
      .then(response => {
        this.setState({
          userDetails: response.data,
        });

        const role = this.state.role;
        const siteManger = Strings.siteManger;
        const supplier = Strings.supplier;

        if (role === siteManger) {
          this.props.navigation.navigate('SiteDashboardScreen', {
            user_details: this.state.userId,
          });
        } else if (role === supplier) {
          this.props.navigation.navigate('SupplierDashboardScreen', {
            user_details: this.state.userId,
          });
        }
        Toast.info('Successfully Registered');
      })
      .catch(error => {
        console.log(error);
        Toast.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text
            style={[
              styles.topic,
              {
                color: '#0C1446',
                marginBottom: 10,
                fontSize: 26,
                fontWeight: 'bold',
              },
            ]}>
            Registration
          </Text>
          <Image
            style={styles.image}
            source={require('../../images/registration.png')}
          />
          <View style={styles.card}>
            <View style={styles.inputView}>
              <TextInput
                value={this.state.userId}
                style={styles.TextInput}
                placeholder="Employee ID"
                placeholderTextColor={'#858277'}
                onChangeText={this.onChangeUserId}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={this.state.name}
                style={styles.TextInput}
                placeholder="Name"
                placeholderTextColor={'#858277'}
                onChangeText={this.onChangeName}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={this.state.email}
                style={styles.TextInput}
                placeholder="User Email"
                placeholderTextColor={'#858277'}
                onChangeText={this.onChangeEmail}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={this.state.password}
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor={'#858277'}
                secureTextEntry={true}
                onChangeText={this.onChangePassword}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={this.state.contactNumber}
                style={styles.TextInput}
                placeholder="Contact Number"
                placeholderTextColor={'#858277'}
                secureTextEntry={true}
                onChangeText={this.onChangeContactNumber}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={this.state.role}
                style={styles.TextInput}
                placeholder="User Role"
                placeholderTextColor={'#858277'}
                onChangeText={this.onChangeRole}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={this.createUser}
            style={styles.registerBtn}>
            <Text style={styles.loginText}>Register Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 4,
    width: 350,
    borderRadius: 10,
    backgroundColor: '#cfcccc',
    height: 650,
    borderEndColor: '#000000',
  },
  card: {
    marginTop: 5,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  topic: {
    marginLeft: 100,
    marginTop: 5,
  },
  inputView: {
    width: '70%',
    height: 45,
    marginBottom: 20,
    backgroundColor: '#E8E8E8',
    borderRadius: 15,
    alignItems: 'center',
  },
  TextInput: {
    flex: 1,
    color: Colors.black,
    height: 50,
    marginLeft: 15,
    padding: 10,
  },
  registerBtn: {
    width: '60%',
    backgroundColor: '#F1C40F',
    height: 45,
    borderRadius: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  loginText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
