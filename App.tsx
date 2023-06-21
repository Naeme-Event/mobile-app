import EventProvider from './providers/EventProvider';
import CartProvider from './providers/CartProvider';
import Navigation from './navigation/navigation';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import store from './redux-toolkit/store';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {webClientId} from './config';

function App() {
  SplashScreen.hide();
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile'], // Add any additional scopes you require
      webClientId: webClientId,
      offlineAccess: true,
    });
  }, []);

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
