import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';
import AuthNavigator from './AuthNavigator';
import CreateEventScreen from '../screens/CreateEventScreen';
import CreateTicketScreen from '../screens/CreateTicketScreen';
import MyTicketDetailScreen from '../screens/MyTicketDetailScreen';
import DetailScreen from '../screens/DetailScreen';
import TicketCartScreen from '../screens/TicketCartScreen';
import {dummyUser} from '../config';
import HomeDrawerNavigator from './HomeNavigation';
import {useSelector, useDispatch} from 'react-redux';
import {useAppSelector} from '../redux-toolkit/hook';
import React from 'react';
import Terms from '../screens/Terms';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  //   const {user} = useUserContext();
  const user = useAppSelector(state => state.users.user);

  return (
    <Stack.Navigator>
      {user?.email ? (
        <Stack.Screen
          name="Main"
          component={HomeDrawerNavigator}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{headerShown: false}}
        />
      )}

      <Stack.Screen
        name="CreateTicket"
        component={CreateTicketScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyTicketDetail"
        component={MyTicketDetailScreen}
        options={{headerShown: false}}
      />

      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{headerShown: false, presentation: 'modal'}}
        />
        <Stack.Screen
          name="TicketCart"
          component={TicketCartScreen}
          options={{headerShown: false, presentation: 'fullScreenModal'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
export default RootNavigator;
