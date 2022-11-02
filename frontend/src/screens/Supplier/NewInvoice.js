/* eslint-disable prettier/prettier */
import axios from 'axios';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Toast} from 'toastify-react-native';
import {Colors, Strings} from '../../constants';

const initialState = {
  orderId: '',
  amount: '',
  status: false,
};

export default class NewInvoiceScreen extends React.Component {
  static navigationOptions = {
    title: 'New Invoice',
  };

  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      details: [],
      initialState,
    };

    this.onChangeOrderId = this.onChangeOrderId.bind(this);
    this.onChangeMaterial = this.onChangeMaterial.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeUnitCost = this.onChangeUnitCost.bind(this);
    this.onChangeTotalCost = this.onChangeTotalCost.bind(this);
    this.addInvoice = this.addInvoice.bind(this);
    this.getOrders = this.getOrders.bind(this);
  }

  componentDidMount = () => {
    this.getDetails();
  };

  onChangeOrderId = e => {
    this.setState({orderId: e});
  };

  onChangeMaterial = e => {
    this.setState({material: e});
  };

  onChangeQuantity = e => {
    this.setState({quantity: e});
  };

  onChangeUnitCost = e => {
    this.setState({unitCost: e});
  };

  onChangeTotalCost = e => {
    this.setState({amount: e});
  };

  componentDidMount = () => {
    this.getOrders();
  };

  getOrders = () => {
    const {navigation} = this.props;
    const orderId = navigation.getParam('orderId');
    console.log(orderId);
    this.setState({
      orderId: orderId,
    });

    var url = `http://10.0.2.2:8080/order/getSupplier/${orderId}`;
    axios
      .get(url)
      .then(response => {
        console.log(response.data.data);
        this.setState({
          orders: response.data.data,
          details: response.data.data.item,
        });
      })
      .catch(error => {
        console.log(error);
        alert(error.message);
      });
  };

  addInvoice = () => {
    var url = 'http://10.0.2.2:8080/invoice/createInvoice';
    const invoiceDetails = {
      orderId: this.state.orderId,
      amount: this.state.amount,
    };
    axios
      .post(url, invoiceDetails)
      .then(response => {
        Toast.info('Successfully added');
        this.props.navigation.navigate(Strings.screens.AllInvoicesScreen);
      })
      .catch(error => {
        console.log(error);
        Toast.error('Not added Successfully');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
            Order Details
          </Text>
          <View style={styles.Cname}>
            <Text style={{marginLeft: 10}}>Company Name</Text>
            <Text style={{marginLeft: 30}}>:</Text>
            <Text style={{marginLeft: 50}}>
              {this.state.orders.companyName}
            </Text>
          </View>
          <View style={styles.Aname}>
            <Text style={{marginLeft: 10}}>Address</Text>
            <Text style={{marginLeft: 30}}>:</Text>
            <Text style={{marginLeft: 50}}>{this.state.orders.address}</Text>
          </View>
          <View style={styles.Aname}>
            <Text style={{marginLeft: 10}}>Materials</Text>
            <Text style={{marginLeft: 30}}>:</Text>
            <Text style={{marginLeft: 50}}>
              {this.state.details.map(value => (
                <Text>{value.material} ,</Text>
              ))}
            </Text>
          </View>
          <View style={styles.Aname}>
            <Text style={{marginLeft: 10}}>quantity</Text>
            <Text style={{marginLeft: 30}}>:</Text>
            <Text style={{marginLeft: 50}}>
              {this.state.details.map(value => (
                <Text>{value.quantity} ,</Text>
              ))}
            </Text>
          </View>
        </View>

        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Add Invoice
        </Text>

        <View style={styles.form}>
          <ScrollView>
            <Input
              value={this.state.orderId}
              label="Order ID"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={this.onChangeOrderId}
            />
            <Input
              value={this.state.amount}
              label="Total Cost (Rs:)"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={this.onChangeTotalCost}
            />
          </ScrollView>
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={this.addInvoice}
            style={styles.btn}
            activeOpacity={0.5}>
            <Text style={styles.btnTxt}>Create Invoice</Text>
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
  backImage: {
    width: 100,
    height: 100,
  },
  title: {
    color: Colors.black,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  card: {
    flex: 0.6,
    flexDirection: 'column',
    width: 320,
    height: 100,
    backgroundColor: Colors.white,
    margin: 5,
    padding: 5,
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#3F5E98',
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    // marginTop: 20,
  },
  cardColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  Cname: {
    flex: 1,
    flexDirection: 'row',
  },
  Aname: {
    flex: 1,
    flexDirection: 'row',
  },
  txt: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'left',
    padding: 5,
  },
  invoice: {
    alignSelf: 'center',
    width: 150,
    color: Colors.white,
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#7F4AA4',
    borderRadius: 10,
  },
  form: {
    flex: 0.9,
    flexDirection: 'row',
    width: 330,
    backgroundColor: Colors.white,
    margin: 5,
    marginTop: 20,
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
    // fontWeight: "bold",
    color: 'black',
  },
  column: {
    // flex: 1,
    // flexDirection: 'column',
    // borderWidth: 4,
    // alignContent: 'center',
    // width: '50%'
  },
  btn: {
    elevation: 3,
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
