import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';
import AuthNavigator from './AuthNavigator';
import CreateEventScreen from '../screens/CreateEventScreen';
import CreateTicketScreen from '../screens/CreateTicketScreen';
import MyTicketDetailScreen from '../screens/MyTicketDetailScreen';
import DetailScreen from '../screens/DetailScreen';
import TicketCartScreen from '../screens/TicketCartScreen';
import {dummyUser} from '../config';
import HomeTabs from './HomeNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  //   const {user} = useUserContext();
  const user = dummyUser;

  return (
    <Stack.Navigator>
      {user.email ? (
        <Stack.Screen
          name="Main"
          component={HomeTabs}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{headerShown: false}}
        />
      )}

      <Stack.Group>
        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateTicket"
          component={CreateTicketScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyTicketDetail"
          component={MyTicketDetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>

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
