import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthRootStackParamList} from '../types/types';
import SignIn from '../screens/SignIn';
const Stack = createNativeStackNavigator<AuthRootStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
