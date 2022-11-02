/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Colors} from './src/constants';
import SplashScreen from './src/screens/SplashScreen';
import LogInScreen from './src/screens/LogInScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SiteDashboardScreen from './src/screens/SiteManager/DashboardScreen';
import NewOrderScreen from './src/screens/SiteManager/NewOrder';
import AllOrdersScreen from './src/screens/SiteManager/AllOrders';
import AllDeliveryScreen from './src/screens/SiteManager/Delivery';
import SupplierDashboardScreen from './src/screens/Supplier/DashboardScreen';
import AllInvoicesScreen from './src/screens/Supplier/AllInvoices';
import NewInvoiceScreen from './src/screens/Supplier/NewInvoice';
import NewDeliveryScreen from './src/screens/Supplier/NewDelivery';
import ApprovedOrders from './src/screens/SiteManager/ApprovedOrders';
import AllOrders from './src/screens/Supplier/AllOrders';
import DeliveryScreen from './src/screens/Supplier/AllDelivery';
import {black, white} from './src/constants/colors';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {screen: SplashScreen},
    LogInScreen: {screen: LogInScreen},
    RegisterScreen: {screen: RegisterScreen},
    // Site Manager Screens
    SiteDashboardScreen: {screen: SiteDashboardScreen},
    NewOrderScreen: {screen: NewOrderScreen},
    AllOrdersScreen: {screen: AllOrdersScreen},
    AllDeliveryScreen: {screen: AllDeliveryScreen},
    ApprovedOrders: {screen: ApprovedOrders},
    // Supplier Screens
    SupplierDashboardScreen: {screen: SupplierDashboardScreen},
    AllInvoicesScreen: {screen: AllInvoicesScreen},
    NewInvoiceScreen: {screen: NewInvoiceScreen},
    NewDeliveryScreen: {screen: NewDeliveryScreen},
    DeliveryScreen: {screen: DeliveryScreen},
    AllOrders: {screen: AllOrders},
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: black,
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createAppContainer(AppNavigator);
