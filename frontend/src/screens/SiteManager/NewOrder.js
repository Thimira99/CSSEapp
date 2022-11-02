import axios from 'axios';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Input} from 'react-native-elements';
import {Colors, Strings} from '../../constants';

const initialState = {
  data: '',
  orderId: '',
  siteName: '',
  siteLocation: '',
  address: '',
  companyName: '',
  status: false,
  open: false,
  value: null,
  itemObj: [],
  items: [
    {label: 'Cement', value: 'cement'},
    {label: 'Timber', value: 'timber'},
    {label: 'Sand', value: 'sand'},
    {label: 'Wood', value: 'wood'},
    {label: 'Steel', value: 'steel'},
    {label: 'Glass', value: 'glass'},
    {label: 'Bricks', value: 'bricks'},
  ],
};

export default class NewOrderScreen extends React.Component {
  static navigationOptions = {
    title: 'New Order',
  };

  constructor(props) {
    super(props);
    this.state = initialState;
    this.getDetails = this.getDetails.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setItems = this.setItems.bind(this);
    this.onChangeOrderId = this.onChangeOrderId.bind(this);
    this.onChangeSiteName = this.onChangeSiteName.bind(this);
    this.onChangeSiteLocation = this.onChangeSiteLocation.bind(this);
    this.onChangeMaterial = this.onChangeMaterial.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
  }

  componentDidMount = () => {
    this.getDetails();
  };

  getDetails = () => {
    const {navigation} = this.props;
    const param = navigation.getParam('user_details');
    this.setState({
      data: param,
    });
  };

  setItems(callback) {
    this.setState(state => ({
      items: callback(state.items),
    }));
  }

  setOpen(open) {
    this.setState({open});
  }

  onChangeMaterial(callback) {
    this.setState(state => ({
      material: callback(state.material),
    }));
  }

  onChangeOrderId = e => {
    this.setState({orderId: e});
  };

  onChangeSiteName = e => {
    this.setState({siteName: e});
  };

  onChangeSiteLocation = e => {
    this.setState({siteLocation: e});
  };

  onChangeCompanyName = e => {
    this.setState({companyName: e});
  };

  onChangeTotal = e => {
    this.setState({total: e});
  };

  onChangeAddress = e => {
    this.setState({address: e});
  };

  onChangeQuantity = e => {
    this.setState({quantity: e});
  };

  onChangeDeadline = e => {
    this.setState({deadline: e});
  };

  addItems = (quantity, item) => {
    const itemm = {
      quantity: quantity,
      material: item,
    };

    const {itemObj} = this.state;
    itemObj.push(itemm);

    this.setState({itemObj}, () => {
      console.log(this.state.itemObj);
    });
  };

  submit = () => {
    const orderDetails = {
      userId: this.state.data,
      orderId: this.state.orderId,
      address: this.state.address,
      companyName: this.state.companyName,
      status: 'Pending',
    };

    const data = {
      userId: this.state.data,
      item: this.state.itemObj,
      companyName: this.state.companyName,
      address: this.state.address,
      orderId: this.state.orderId,
      status: 'pending',
    };

    const URL = 'http://10.0.2.2:8080/order/createOrder';

    axios.post(URL, data).then(res => {
      console.log(res.data);
    });

    this.props.navigation.navigate(Strings.screens.AllOrdersScreen);
  };

  render() {
    const {open, items} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Place New Order</Text>
          <Image
            style={{width: 60, height: 60, marginLeft: 68, marginTop: 15}}
            source={require('../../../images/parcel.png')}
          />
        </View>
        <View style={styles.form}>
          <ScrollView>
            <Input
              value={this.state.orderId}
              placeholder={'Enter the order Id'}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={this.onChangeOrderId}
            />
            <Input
              value={this.state.companyName}
              placeholder={'Enter the company Name'}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={this.onChangeCompanyName}
            />
            <DropDownPicker
              style={styles.dropDownStyle}
              textStyle={styles.dropDownText}
              labelStyle={styles.dropDownLabel}
              open={open}
              value={this.state.material}
              items={items}
              setOpen={this.setOpen}
              setValue={this.onChangeMaterial}
              setItems={this.setItems}
            />
            <Input
              value={this.state.quantity}
              placeholder={'Enter the Quantity'}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={this.onChangeQuantity}
            />
            {this.state.itemObj.map(value => (
              <View style={styles.detailsList}>
                <Text style={{marginLeft: 10, fontSize: 20}}>
                  {value.material}
                </Text>
                <Text style={{marginLeft: 210, fontSize: 20}}>
                  {value.quantity}
                </Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={() =>
                this.addItems(this.state.quantity, this.state.material)
              }
              style={styles.btn}
              activeOpacity={0.5}>
              <Text style={styles.btnTxt}>Add Item</Text>
            </TouchableOpacity>
            <Input
              value={this.state.address}
              placeholder={'Enter the delevery Address'}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={this.onChangeAddress}
            />

            <View style={styles.column}>
              <TouchableOpacity
                onPress={this.submit}
                style={styles.btn}
                activeOpacity={0.5}>
                <Text style={styles.btnTxt}>Confirm Order</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    backgroundColor: Colors.darkWhite,
  },
  backImage: {
    width: 100,
    height: 100,
  },
  form: {
    borderRadius: 10,
    flex: 0.9,
    flexDirection: 'row',
    marginTop: -500,
    width: 350,
    backgroundColor: Colors.white,
    margin: 5,
    padding: 20,
    // borderRadius: 15,
    elevation: 5,
  },
  label: {
    fontWeight: 'normal',
    color: Colors.inputLabel,
  },
  inputContainer: {
    height: 38,
    borderColor: 'black',
  },
  input: {
    fontSize: 17,
  },
  row: {
    borderColor: 'black',
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
    marginTop: 60,
    elevation: 2,
    margin: 10,
    padding: 3,
    width: 160,
    marginRight: 5,
    backgroundColor: '#F1C40F',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },

  btnTxt: {
    padding: 5,
    color: Colors.black,
    fontSize: 16,
    textAlign: 'center',
  },
  addItems: {
    flex: 0.5,
    flexDirection: 'row',
    backgroundColor: '#808080',
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
  detailsList: {
    backgroundColor: '#c7c5c5',
    flex: 1,
    flexDirection: 'row',
  },
});
