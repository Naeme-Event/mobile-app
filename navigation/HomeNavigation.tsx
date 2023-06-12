import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, View, useWindowDimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RootDrawerParamList} from '../types/typings';
import {dummyUser} from '../config';
import HomeScreen from '../screens/HomeScreen';
import TicketScreen from '../screens/TicketScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import AppDrawer from '../screens/AppDrawer';
import {useAppSelector} from '../redux-toolkit/hook';
import ScanScreen from '../screens/ScanScreen';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function HomeDrawerNavigator() {
  const user = useAppSelector(state => state.users.user);
  return (
    <Drawer.Navigator
      drawerContent={props => <AppDrawer {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerContentContainerStyle: {
          width: '100%',
        },
        drawerItemStyle: {
          marginVertical: -4,
        },
        drawerStyle: {
          width: 330,
          borderBottomRightRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#FFA26B',
        },
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 14,
        },
      })}>
      <Drawer.Screen
        name="Home"
        options={() => ({
          drawerIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={28}
              color={focused ? '#FFA26B' : '#cdcdcd'}
            />
          ),
          drawerLabel: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? '#FFA26B' : '#eeeeee',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: -10,
                borderRadius: 7,
                width: 225,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: focused ? '#fff' : 'gray',
                }}>
                Home
              </Text>
            </View>
          ),
        })}
        component={HomeScreen}
      />

      <Drawer.Screen
        name="CreateEvent"
        options={() => ({
          drawerIcon: ({color, focused}) => (
            <Ionicons
              name="ios-create-outline"
              size={28}
              color={focused ? '#FFA26B' : '#676A65'}
            />
          ),
          drawerLabel: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? '#FFA26B' : '#eeeeee',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: -10,
                borderRadius: 7,
                width: 225,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: focused ? '#fff' : '#333',
                }}>
                Create Event
              </Text>
            </View>
          ),
        })}
        component={CreateEventScreen}
      />

      <Drawer.Screen
        name="Ticket"
        options={() => ({
          drawerIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="ticket-outline"
              size={28}
              color={focused ? '#FFA26B' : '#676A65'}
            />
          ),
          drawerLabel: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? '#FFA26B' : '#eeeeee',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: -10,
                borderRadius: 7,
                width: 225,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: focused ? '#fff' : '#333',
                }}>
                Ticket
              </Text>
            </View>
          ),
        })}
        component={TicketScreen}
      />
      <Drawer.Screen
        name="Scan"
        options={() => ({
          drawerIcon: ({color, focused}) => (
            <Ionicons
              name="scan"
              size={28}
              color={focused ? '#FFA26B' : '#676A65'}
            />
          ),
          drawerLabel: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? '#FFA26B' : '#eeeeee',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: -10,
                borderRadius: 7,
                width: 225,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: focused ? '#fff' : '#333',
                }}>
                Scan
              </Text>
            </View>
          ),
        })}
        // @ts-ignore
        component={ScanScreen}
      />
      {/* <Drawer.Screen
        name="User"
        options={() => ({
          drawerIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={28}
              color={focused ? '#FFA26B' : '#676A65'}
            />
          ),
          drawerLabel: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? '#FFA26B' : '#eeeeee',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: -10,
                borderRadius: 7,
                width: 225,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: focused ? '#fff' : '#333',
                }}>
                Dashboard
              </Text>
            </View>
          ),
        })}
        component={UserScreen}
      /> */}
    </Drawer.Navigator>
  );
}
