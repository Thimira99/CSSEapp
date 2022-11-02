/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors, Strings} from '../../constants';
import {black} from '../../constants/colors';

export default class SiteDashboardScreen extends React.Component {
  static navigationOptions = {
    title: 'Site Dashboard',
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
    console.log('sjnvk', this.state.data);
    console.log('sjnvk', this.state.name);
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
        <View>
          <Image
            style={{width: 300, height: 200, marginLeft: 45, marginBottom: 10}}
            source={require('../../../images/Home.png')}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(Strings.screens.NewOrderScreen, {
                  user_details: this.state.data,
                })
              }
              style={styles.btn}
              activeOpacity={0.5}>
              <View>
                <Text style={styles.btnTxt}>Place New</Text>
                <Text style={styles.orderTxt}>Order</Text>
              </View>
              <Image
                style={{width: 60, height: 60, marginLeft: -20}}
                source={require('../../../images/parcel.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(
                  Strings.screens.AllOrdersScreen,
                  {userId: this.state.data},
                )
              }
              style={styles.btn}
              activeOpacity={0.5}>
              <View>
                <Text style={styles.orderrTxt}>Order</Text>
                <Text style={styles.statusTxt}>Status</Text>
              </View>
              <Image
                style={{width: 60, height: 60, marginLeft: -20}}
                source={require('../../../images/status.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowButton}>
          <View style={styles.column}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(
                  Strings.screens.AllDeliveryScreen,
                )
              }
              style={styles.Dbtn}
              activeOpacity={0.5}>
              <View style={styles.deleverFooter}>
                <Image
                  style={{width: 60, height: 60, marginLeft: -140}}
                  source={require('../../../images/approved.png')}
                />
                <Text style={styles.approvedTxt}>Order Approvals</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.bottomButton}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(
                    Strings.screens.AllDeliveryScreen,
                  )
                }
                style={styles.Dbtn}
                activeOpacity={0.5}>
                <View style={styles.deleverFooter}>
                  <Image
                    style={{width: 60, height: 60, marginLeft: -100}}
                    source={require('../../../images/delivery.png')}
                  />
                  <Text style={styles.approvedTxt}>Logginng Deliveries</Text>
                </View>
              </TouchableOpacity>
            </View>
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
    backgroundColor: Colors.darkWhite,
  },
  backImage: {
    width: '100%',
    height: '70%',
  },
  row: {
    marginTop: 5,
    flex: 0.5,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    marginBottom: 10,
  },
  btn: {
    elevation: 10,
    padding: 9,
    width: 150,
    height: 130,
    marginRight: 3,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: Colors.black,
    fontSize: 16,
    textAlign: 'center',
  },
  orderTxt: {
    fontSize: 20,
    color: '#808080',
  },
  orderrTxt: {
    marginLeft: -20,
  },
  statusTxt: {
    marginLeft: -20,
    fontSize: 20,
    color: '#808080',
  },
  Dbtn: {
    elevation: 10,
    padding: 9,
    width: 330,
    height: 80,
    marginRight: 3,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  deleverFooter: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 70,
  },
  rowButton: {
    marginTop: -30,
  },
  bottomButton: {
    marginTop: 20,
  },
  approvedTxt: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 40,
  },
});
