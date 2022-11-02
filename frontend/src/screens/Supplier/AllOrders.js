/* eslint-disable prettier/prettier */
import axios from 'axios';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {Colors, Strings} from '../../constants';

export default class AllOrdersScreen extends React.Component {
  static navigationOptions = {
    title: 'Orders',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      orders: [],
      name: '',
      orderId: '',
    };
    this.getOrders = this.getOrders.bind(this);
  }

  componentDidMount = () => {
    this.getOrders();
  };

  getOrders = () => {
    const {navigation} = this.props;
    const name = navigation.getParam('name');
    this.setState({
      name: name,
    });

    var url = `http://10.0.2.2:8080/supplierAdd/${name}`;
    axios
      .get(url)
      .then(response => {
        console.log(response.data.data);
        this.setState({orders: response.data.data});
      })
      .catch(error => {
        console.log(error);
        alert(error.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>Orders</Text>
            <Image
              style={{width: 60, height: 60, marginLeft: 130, marginTop: 15}}
              source={require('../../../images/status.png')}
            />
          </View>
          <FlatList
            style={styles.notificationList}
            data={this.state.orders}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                <View style={styles.card}>
                  <Text style={[styles.btnTxt, styles.title]}>
                    Recieved Orders
                  </Text>
                  {/* Row */}
                  <View style={styles.cardRow}>
                    {/* Column */}
                    <View style={styles.cardColumn}>
                      <Text style={styles.txt}>Order Id</Text>
                      <Text style={styles.txt}>Supplier Name</Text>
                    </View>
                    <View style={styles.cardColumn}>
                      <Text style={[styles.txt, {textAlign: 'center'}]}>:</Text>
                      <Text style={[styles.txt, {textAlign: 'center'}]}>:</Text>
                    </View>
                    <View style={styles.cardColumn}>
                      <Text
                        style={[
                          styles.txt,
                          {
                            textAlign: 'left',
                            borderRadius: 10,
                            backgroundColor: Colors.darkPurple,
                            color: Colors.white,
                            width: 100,
                          },
                        ]}>
                        #{item.orderId}
                      </Text>
                      <Text style={[styles.txt, {textAlign: 'left'}]}>
                        {item.supplierName}
                      </Text>
                      <TouchableOpacity
                        style={styles.Invoicebtn}
                        onPress={() =>
                          this.props.navigation.navigate(
                            Strings.screens.NewInvoiceScreen,
                            {
                              orderId: item.orderId,
                            },
                          )
                        }>
                        <Text>Create Invoice</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </ScrollView>
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
  notificationList: {
    margin: 0,
    padding: 5,
  },
  title: {
    color: Colors.black,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    width: 320,
    backgroundColor: '#F5F5F5',
    margin: 10,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    // borderWidth: 1,
    // borderColor: '#3F5E98',
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    marginTop: 20,
    // borderWidth: 2
  },
  cardColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  txt: {
    color: 'gray',
    fontSize: 15,
    textAlign: 'left',
    padding: 5,
  },
  decline: {
    width: 100,
    color: Colors.white,
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
    margin: 5,
    backgroundColor: '#D41930',
    borderRadius: 20,
  },
  approve: {
    width: 100,
    color: Colors.white,
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
    margin: 5,
    backgroundColor: '#28A745',
    borderRadius: 20,
  },
  pending: {
    width: 100,
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
    margin: 5,
    marginBottom: 5,
    backgroundColor: '#D4890E',
    borderRadius: 20,
  },
  btn: {
    elevation: 5,
    margin: 10,
    padding: 3,
    width: 160,
    marginRight: 5,
    backgroundColor: '#01949A',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  Invoicebtn: {
    marginTop: 30,
    marginRight: 50,
    elevation: 5,
    margin: 10,
    padding: 3,
    width: 160,
    height: 30,
    backgroundColor: '#01949A',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  header: {
    marginLeft: 30,
    flex: 1,
    flexDirection: 'row',
  },
  headerTxt: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
