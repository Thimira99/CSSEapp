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
} from 'react-native';
import {Colors, Strings} from '../../constants';

export default class DeliveryScreen extends React.Component {
  static navigationOptions = {
    title: 'Delivery Details',
  };

  constructor(props) {
    super(props);
    this.state = {
      delivery: [],
    };
    this.getDelivery = this.getDelivery.bind(this);
  }

  componentDidMount = () => {
    this.getDelivery();
  };

  /**
   * @description This method get deliveries
   * @memberof DeliveryScreen
   */
  getDelivery = () => {
    var url = 'http://10.0.2.2:8080/delivery';
    axios
      .get(url)
      .then(response => {
        this.setState({delivery: response.data.data});
      })
      .catch(error => {
        console.log(error);
        alert(error.message);
      });
  };

  render() {
    console.log('delivery', this.state.delivery);
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            style={styles.notificationList}
            data={this.state.delivery}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                <View style={styles.card}>
                  <Text style={[styles.btnTxt, styles.title]}>
                    Delivery Details
                  </Text>
                  {/* Row */}
                  <View style={styles.cardRow}>
                    {/* Column */}
                    <View style={styles.cardColumn}>
                      <Text style={[styles.txt, {width: 200}]}>
                        Delivery ID
                      </Text>
                      <Text style={styles.txt}>Order ID</Text>
                      <Text style={[styles.txt, {width: 200}]}>
                        Delivery Person
                      </Text>
                      <Text style={[styles.txt, {width: 200}]}>
                        Phone Number
                      </Text>
                      <Text style={styles.txt}>Amount</Text>
                    </View>
                    {/* Column */}
                    <View style={styles.cardColumn}>
                      <Text style={[styles.txt, {textAlign: 'center'}]}>:</Text>
                      <Text style={[styles.txt, {textAlign: 'center'}]}>:</Text>
                      <Text style={[styles.txt, {textAlign: 'center'}]}>:</Text>
                      <Text style={[styles.txt, {textAlign: 'center'}]}>:</Text>
                      <Text style={[styles.txt, {textAlign: 'center'}]}>:</Text>
                    </View>
                    {/* Column */}
                    <View style={styles.cardColumn}>
                      <Text style={[styles.txt, {textAlign: 'left'}]}>
                        #{item.deliveryId}
                      </Text>
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
                      <Text
                        style={[styles.txt, {textAlign: 'left', width: 200}]}>
                        {item.deliveryPerson}
                      </Text>
                      <Text
                        style={[styles.txt, {textAlign: 'left', width: 200}]}>
                        {item.deliveryPhone}
                      </Text>
                      <Text
                        style={[styles.txt, {textAlign: 'left', width: 200}]}>
                        Rs.{item.amount}/=
                      </Text>
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
    backgroundColor: '#F2EEF7',
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
    backgroundColor: Colors.white,
    margin: 10,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    marginTop: 20,
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
  onDelivery: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
    margin: 5,
    backgroundColor: '#D4890E',
    borderRadius: 20,
  },
  delivered: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
    margin: 5,
    backgroundColor: '#28A745',
    borderRadius: 20,
  },
  processing: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
    margin: 5,
    backgroundColor: '#0AE',
    borderRadius: 20,
  },
  btn: {
    elevation: 5,
    margin: 10,
    padding: 3,
    width: 160,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#01949A',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  invoice: {
    alignSelf: 'center',
    width: 150,
    color: Colors.black,
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
    backgroundColor: Colors.yellow,
    borderRadius: 10,
    elevation: 2,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 15,
    textAlign: 'center',
  },
});
