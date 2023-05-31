import EventProvider from './providers/EventProvider';
import CartProvider from './providers/CartProvider';
import Navigation from './navigation/navigation';
import 'react-native-gesture-handler';
import React from 'react';
import store from './redux-toolkit/store';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

function App() {
  SplashScreen.hide();

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
