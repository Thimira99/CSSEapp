/* eslint-disable prettier/prettier */
import axios from 'axios';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Toast} from 'toastify-react-native';
import {Colors} from '../../constants';

const initialState = {
  deliveryId: '',
  orderId: '',
  deliveryPerson: '',
  deliveryPhone: '',
  amount: '',
  deliveryDetails: {},
};

export default class NewDeliveryScreen extends React.Component {
  static navigationOptions = {
    title: 'New Delivery',
  };

  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChangeDeliveryId = this.onChangeDeliveryId.bind(this);
    this.onChangeOrderId = this.onChangeOrderId.bind(this);
    this.onChangeDeliveryPerson = this.onChangeDeliveryPerson.bind(this);
    this.onChangeDeliveryPhone = this.onChangeDeliveryPhone.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.addDelivery = this.addDelivery.bind(this);
  }

  //onchange delovery ID
  onChangeDeliveryId = e => {
    this.setState({deliveryId: e});
  };

  //onchange order ID
  onChangeOrderId = e => {
    this.setState({orderId: e});
  };

  //onchange DeliveryPerson
  onChangeDeliveryPerson = e => {
    this.setState({deliveryPerson: e});
  };

  //onchange Delivery Phonenumber
  onChangeDeliveryPhone = e => {
    this.setState({deliveryPhone: e});
  };

  //onchange amount
  onChangeAmount = e => {
    this.setState({amount: e});
  };

  //add delivery method
  addDelivery = () => {
    var url = 'http://10.0.2.2:8080/delivery/createDelivery';
    const deliveryDetails = {
      deliveryId: this.state.deliveryId,
      orderId: this.state.orderId,
      deliveryPerson: this.state.deliveryPerson,
      deliveryPhone: this.state.deliveryPhone,
      amount: this.state.amount,
      status: 'Processing',
    };
    console.log('Delivery details', deliveryDetails);
    axios
      .post(url, deliveryDetails)
      .then(response => {
        this.setState({
          deliveryDetails: response.data,
        });
        Toast.info('Added Successfully');
      })
      .catch(error => {
        Toast.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>New Delivery</Text>
          <Image
            style={{width: 60, height: 60, marginLeft: 90, marginTop: 15}}
            source={require('../../../images/delivery.png')}
          />
        </View>
        <View style={styles.form}>
          <ScrollView>
            <Input
              value={this.state.deliveryId}
              label="Delivery ID"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={this.onChangeDeliveryId}
            />
            <Input
              value={this.state.orderId}
              label="Order ID"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={this.onChangeOrderId}
            />
            <Input
              value={this.state.deliveryPerson}
              label="Delivery Person Name"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={this.onChangeDeliveryPerson}
            />
            <Input
              value={this.state.deliveryPhone}
              label="Delivery Person Phone"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={this.onChangeDeliveryPhone}
            />
            <Input
              value={this.state.amount}
              label="Amount"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={this.onChangeAmount}
            />
          </ScrollView>
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={this.addDelivery}
            style={styles.btn}
            activeOpacity={0.5}>
            <Text style={styles.btnTxt}>Add Delivery</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#F1F5FF',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  headerTxt: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  backImage: {
    width: 100,
    height: 100,
  },
  form: {
    flex: 1,
    flexDirection: 'row',
    width: 330,
    backgroundColor: Colors.white,
    margin: 5,
    marginTop: -400,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  label: {
    fontWeight: 'normal',
    color: Colors.inputLabel,
  },
  inputContainer: {
    height: 38,
  },
  input: {
    fontSize: 17,
  },
  row: {
    flex: 0.5,
    flexDirection: 'row',
  },
  dropDownStyle: {
    borderColor: 'gray',
    marginBottom: 20,
  },
  dropDownText: {
    fontSize: 15,
    color: 'gray',
  },
  dropDownLabel: {
    color: 'black',
  },
  btn: {
    elevation: 2,
    margin: 10,
    padding: 3,
    width: 160,
    marginRight: 5,
    backgroundColor: Colors.yellow,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    padding: 5,
    color: Colors.black,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
