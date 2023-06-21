import React, {useRef} from 'react';
//@ts-ignore
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {TouchableOpacity, View} from 'react-native';
import Text from './Text';
import {TokensType} from '../hooks/useCachedResources';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootDrawerScreenProps} from '../types/types';
import {useNavigation} from '@react-navigation/native';
import {useCartContext} from '../providers/CartProvider';
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMP_ID,
  paymentKey,
} from '../config';
import api from '../api';
import {useAppSelector} from '../redux-toolkit/hook';
import {v4 as uuidv4} from 'uuid';

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  agreeToTerms: boolean;
};

export default function Checkout({agreeToTerms, setLoading}: Props) {
  const {cartItems, cartTotal, setCartItems} = useCartContext();
  const user = useAppSelector(state => state.users.user);
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  const navigation = useNavigation<RootDrawerScreenProps<'Ticket'>>();

  return (
    <View>
      <Paystack
        className={{flex: 1}}
        paystackKey={paymentKey}
        amount={cartTotal}
        //@ts-ignore
        billingEmail={user?.email}
        activityIndicatorColor="green"
        //@ts-ignore
        onCancel={e => {
          console.log(e.status);
        }}
        //@ts-ignore
        onSuccess={async successData => {
          const jsonValue = await AsyncStorage.getItem('@tokens');
          const tokens: TokensType =
            jsonValue != null ? JSON.parse(jsonValue) : null;
          const uniqueId = uuidv4();
          try {
            const resData = await Promise.all(
              cartItems?.map(async item => {
                const response = await api.post(
                  '/my-tickets/',
                  {
                    price: item.price,
                    event: item.event,
                    title: item.title,
                    ticket: item.id,
                    user: user?.id,
                    booking_id: uniqueId,
                    email: user?.email,
                    quantity: item.quantity,
                    transactionId: successData.data.transactionRef.reference,
                  },
                  {
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${tokens.access}`,
                    },
                  },
                );
                const data = await response.data;
                console.log(data);
                if (response.status === 201) {
                  return data;
                } else {
                  return null;
                }
              }),
            );
            if (resData?.length) {
              setLoading(true);

              if (user?.email) {
                // emailjs
                //   .send(
                //     EMAILJS_SERVICE_ID,
                //     EMAILJS_TEMP_ID,
                //     {
                //       email_to: user?.email,
                //       message: `https://www.naeme.app/dashboard`,
                //     },
                //     EMAILJS_PUBLIC_KEY,
                //   )
                //   .then(response => {
                //     console.log('Email sent successfully:', response);
                //   })
                //   .catch(error => {
                //     console.error('Error sending email:', error);
                //   });
                // @ts-ignore
                navigation.navigate('Main', {screen: 'Ticket'});
              }
            }
          } catch (error) {}
        }}
        // @ts-ignore
        ref={paystackWebViewRef}
      />
      <TouchableOpacity
        className={`rounded-lg px-6 py-2 ${
          agreeToTerms ? 'bg-[#ff8d4c]' : 'bg-gray-700'
        }`}
        disabled={!agreeToTerms}
        onPress={() => paystackWebViewRef?.current?.startTransaction()}>
        <Text className="text-black">Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}
