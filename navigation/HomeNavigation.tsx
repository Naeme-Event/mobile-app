import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../types/types';
import HomeScreen from '../screens/tabs/HomeScreen';
import TicketScreen from '../screens/tabs/TicketScreen';
import ScannerScreen from '../screens/tabs/ScanScreen';
import UserScreen from '../screens/tabs/UserScreen';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator<RootTabParamList>();

export type useTabNavigationProps = BottomTabScreenProps<
  RootTabParamList,
  'Home'
>;

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#060707',
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#dddddd',
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return (
              <Feather
                name="home"
                size={24}
                color={focused ? '#fc3c44' : '#dddddd'}
              />
            );
          } else if (route.name === 'Ticket') {
            return (
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={24}
                color={focused ? '#fc3c44' : '#dddddd'}
              />
            );
          } else if (route.name === 'Scan') {
            return (
              <MaterialIcons
                name="qr-code"
                size={24}
                color={focused ? '#fc3c44' : '#dddddd'}
              />
            );
          } else if (route.name === 'User') {
            return (
              <AntDesign
                name="user"
                size={24}
                color={focused ? '#fc3c44' : '#dddddd'}
              />
            );
          }
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Ticket" component={TicketScreen} />
      <Tab.Screen name="Scan" component={ScannerScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}
