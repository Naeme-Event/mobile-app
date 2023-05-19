import React, {useRef} from 'react';
//@ts-ignore
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {TouchableOpacity, View} from 'react-native';
import {paymentKey, BaseUrl} from '@env';
// import {useAuthContext} from '../hooks/useAuth';
import Text from './Text';
import {TokensType} from '../hooks/useCachedResources';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootTabParamList} from '../types/types';
import {useNavigation} from '@react-navigation/native';
import {useCartContext} from '../providers/CartProvider';
import {dummyUser} from '../config';

type TabProps = NativeStackNavigationProp<RootTabParamList, 'Ticket'>;
export default function Checkout() {
  const {cartItems, cartTotal, setCartItems} = useCartContext();
  const user = dummyUser;
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  const navigation = useNavigation<TabProps>();

  return (
    <View>
      <Paystack
        className={{flex: 1}}
        paystackKey={paymentKey}
        amount={cartTotal}
        billingEmail={user.email}
        activityIndicatorColor="green"
        //@ts-ignore
        onCancel={e => {
          console.log(e.status);
        }}
        //@ts-ignore
        onSuccess={async ({data}) => {
          const jsonValue = await AsyncStorage.getItem('naemeUser');
          const tokens: TokensType =
            jsonValue != null ? JSON.parse(jsonValue) : null;
          cartItems.map(item => {
            (async () => {
              const response = await fetch(`${BaseUrl}/my-tickets/`, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${tokens.access}`,
                },
                body: JSON.stringify({
                  event: item.event,
                  ticket: item.id,
                  user: user,
                  quantity: item.quantity,
                  transactionId: data.transactionRef.transaction,
                }),
              });
              if (response.status === 201) {
                setCartItems([]);
                navigation.navigate('Ticket');
                return true;
              } else {
                console.log('ticket not created');
                return false;
              }
            })();
          });
        }}
        ref={paystackWebViewRef}
      />
      <TouchableOpacity
        onPress={() => paystackWebViewRef?.current?.startTransaction()}>
        <Text className="text-white ">Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}
