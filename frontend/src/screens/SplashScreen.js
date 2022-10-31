/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, Strings} from '../constants';

export default class SplashScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome To this App</Text>
        <Image
          style={styles.Image}
          source={require('../../images/dashboard.png')}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(Strings.screens.LogInScreen)
          }
          style={styles.loginBtn}>
          <Text style={styles.loginTxt}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(Strings.screens.RegisterScreen)
          }
          style={[styles.loginBtn, {marginTop: 10}]}>
          <Text style={styles.loginTxt}>Register Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#808080',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginTop: '5%',
  },
  loginBtn: {
    backgroundColor: '#BB803C',
    width: 200,
    height: 50,
    justifyContent: 'center',
    margin: 10,
    marginTop: '20%',
    borderRadius: 50,
  },
  loginTxt: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
