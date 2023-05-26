import EventProvider from './providers/EventProvider';
import CartProvider from './providers/CartProvider';
import Navigation from './navigation/navigation';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {setUser, signOutUser} from './redux-toolkit/authSlice';
import store from './redux-toolkit/store';
import {Provider} from 'react-redux';
import {useAppDispatch} from './redux-toolkit/hook';

function App() {
  return (
    <Provider store={store}>
      <EventProvider>
        <CartProvider>
          <Navigation />
        </CartProvider>
      </EventProvider>
    </Provider>
  );
}
export default App;
