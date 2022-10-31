/* eslint-disable prettier/prettier */
import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Strings, Colors} from '../constants';
import ToastManager, {Toast} from 'toastify-react-native';

export default class LogInScreen extends React.Component {
  static navigationOptions = {
    title: 'Log In',
  };

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      email: '',
      password: '',
      loginDetails: {},
    };
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.validate = this.validate.bind(this);
  }

  /**
   * @description This method changes the value of name
   * @param {object} e
   * @memberof LogInScreen
   */
  onChangeName = e => {
    this.setState({name: e});
  };

  /**
   * @description This method changes the value of userId
   * @param {object} e
   * @memberof LogInScreen
   */
  onChangeUserId = e => {
    this.setState({userId: e});
  };

  /**
   * @description This method changes the value of email
   * @param {object} e
   * @memberof LogInScreen
   */
  onChangeEmail = e => {
    this.setState({email: e});
  };

  /**
   * @description This method changes the value of password
   * @param {object} e
   * @memberof LogInScreen
   */
  onChangePassword = e => {
    this.setState({password: e});
  };

  /**
   * @description This method changes the value of name
   * @param {object} e
   * @memberof LogInScreen
   */
  validate() {
    var url = `http://10.0.2.2:8080/user/userById/${this.state.email}`;
    axios
      .get(url)
      .then(response => {
        //display details
        console.log(response.data.data[0].userId);
        this.setState({loginDetails: response.data.data[0]});

        const enteredEmail = this.state.email;
        const validEmail = this.state.loginDetails.email;
        const enteredPassword = this.state.password;
        const validPassword = this.state.loginDetails.password;

        if (enteredEmail === validEmail && enteredPassword === validPassword) {
          const role = this.state.loginDetails.role;

          if (role === 'site manager') {
            this.props.navigation.navigate(
              Strings.screens.SiteDashboardScreen,
              {userId: response.data.data[0].userId},
            );
          } else if (role === 'supplier') {
            this.props.navigation.navigate(
              Strings.screens.SupplierDashboardScreen,
              {userId: this.state.userId},
            );
          }
        } else {
          Toast.info('Invalid Credentials');
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ToastManager />
        <Image
          style={styles.image}
          source={require('../../images/login.png')}
        />
        <Text
          style={[
            styles.btnTxt,
            {
              color: '#0C1446',
              marginBottom: 40,
              fontSize: 26,
              fontWeight: 'bold',
            },
          ]}>
          Login
        </Text>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.email}
            style={styles.TextInput}
            placeholder={'Enter Email'}
            placeholderTextColor={'#858277'}
            onChangeText={this.onChangeEmail}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.password}
            style={styles.passwordInput}
            placeholder={'Enter Password'}
            placeholderTextColor={'#858277'}
            secureTextEntry={true}
            onChangeText={this.onChangePassword}
          />
        </View>
        <TouchableOpacity onPress={this.validate} style={styles.loginBtn}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: -30,
    marginBottom: 30,
  },
  inputView: {
    backgroundColor: '#E8E8E8',
    borderRadius: 15,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    color: Colors.black,
  },
  passwordInput: {
    marginLeft: 24,
  },

  loginBtn: {
    width: '60%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BB803C',
    elevation: 2,
  },
  loginText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
