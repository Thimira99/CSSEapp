/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors, Strings} from '../../constants';
import {white} from '../../constants/colors';

export default class SupplierDashboardScreen extends React.Component {
  static navigationOptions = {
    title: 'Supplier Dashboard',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      name: '',
    };
    this.getDetails = this.getDetails.bind(this);
  }

  componentDidMount = () => {
    this.getDetails();
  };

  getDetails = () => {
    const {navigation} = this.props;
    const param = navigation.getParam('userId');
    const name = navigation.getParam('name');
    this.setState({
      data: param,
      name: name,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            style={{width: 70, height: 70, marginTop: 45, marginRight: 10}}
            source={require('../../../images/user.png')}
          />
          <Text
            style={[
              styles.btnTxt,
              {
                color: '#000000',
                marginTop: 60,
                fontSize: 26,
                fontWeight: 'bold',
              },
            ]}>
            Hi,
          </Text>
          <Text
            style={[
              styles.btnTxt,
              {
                color: '#000000',
                marginBottom: 30,
                marginTop: 60,
                fontSize: 26,
                fontWeight: 'bold',
              },
            ]}>
            {this.state.name}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={{width: 300, height: 200, marginLeft: 45, marginBottom: 10}}
            source={require('../../../images/dashboard.png')}
          />
        </View>
        <View style={styles.orderC}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(Strings.screens.AllOrders, {
                name: this.state.name,
              })
            }
            style={styles.btn}
            activeOpacity={0.5}>
            <Image
              style={{width: 70, height: 70}}
              source={require('../../../images/parcel.png')}
            />
            <Text style={styles.btnTxt}>All Orders</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(
                  Strings.screens.AllInvoicesScreen,
                )
              }
              style={styles.btn}
              activeOpacity={0.5}>
              <Image
                style={{width: 70, height: 70}}
                source={require('../../../images/quotations.png')}
              />
              <Text style={styles.btnTxt}>Invoices</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('DeliveryScreen')}
              style={styles.btn}
              activeOpacity={0.5}>
              <Image
                style={{width: 70, height: 70}}
                source={require('../../../images/delivery.png')}
              />
              <Text style={styles.btnTxt}>Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: white,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  backImage: {
    width: '100%',
    height: '70%',
  },
  row: {
    flex: 0.5,
    flexDirection: 'row',
  },
  column: {
    marginTop: -80,
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
  },
  orderC: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
  },
  btn: {
    elevation: 10,
    margin: 10,
    padding: 5,
    width: 150,
    height: 120,
    marginRight: 5,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    padding: 5,
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
});
