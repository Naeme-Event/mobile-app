import {
  View,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {RootStackScreenProps} from '../types/types';
import {formatCurrency, formatDate} from '../utils/formatter';

import {
  ResponseType,
  TicketDataTypes,
  TicketResponseType,
} from '../types/typings';
// @ts-ignore
import CartImage from '../assets/images/CART.png';
import Checkout from '../components/Pay';
import {useCartContext} from '../providers/CartProvider';
import {BaseUrl} from '../config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, Checkbox, Text} from 'react-native-paper';
import api from '../api';
import {useAppSelector} from '../redux-toolkit/hook';

const Cart = Image.resolveAssetSource(CartImage).uri;

export default function TicketCartScreen({
  navigation,
  route,
}: RootStackScreenProps<'TicketCart'>) {
  const data = route.params;
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  const user = useAppSelector(state => state.users.user);

  const {
    getItemQuantity,
    cartTotal,
    cartItems,
    cartQuantity,
    decreaseCartQuantity,
    increaseCartQuantity,
    setCartItems,
    toggleOrderSummary,
    orderSummaryToggle,
  } = useCartContext();

  function getZeroPriceTicketId(arr: TicketDataTypes[]) {
    const zeroPriceTicket = arr.find(ticket => ticket.price === 0);
    if (zeroPriceTicket?.id) {
      const ticketId = zeroPriceTicket?.id;
      const eventId = zeroPriceTicket?.event;
      return {ticketId, eventId};
    }
  }

  const hasFreeEvent:
    | {
        eventId: string;
        ticketId: string;
      }
    | undefined = getZeroPriceTicketId(data.tickets);

  async function getFreeTicket() {
    setLoading(true);
    try {
      const response = await api.post(
        '/my-tickets/',
        {
          event: hasFreeEvent?.eventId,
          ticket: hasFreeEvent?.ticketId,
          user: user?.id,
          quantity: 1,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.data;
      if (response.status === 201) {
        // router.push(`/ticket/${data.id}`);
        setLoading(false);
      } else {
        // console.log("ticket not created");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1">
      <StatusBar
        animated
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor="#000"
      />
      <ScrollView
        className={`h-full ${
          Platform.OS === 'android' ? 'pt-[17%]' : 'pt-[16%]'
        }`}>
        <View className="z-20">
          {Platform.OS === 'android' && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                setCartItems([]);
              }}
              className={`z-10 absolute rounded-full left-5 items-center p-2`}>
              <AntDesign name="arrowleft" size={20} color="#181818" />
            </TouchableOpacity>
          )}
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                setCartItems([]);
              }}
              className={`bg-[#d7d7d7] z-10 absolute rounded-full right-5 items-center p-1`}>
              <AntDesign name="close" size={17} color="#181818" />
            </TouchableOpacity>
          )}
        </View>

        <View className="mb-4">
          <Text
            style={{fontFamily: 'Montserrat-Black'}}
            className="text-center mt-2 text-xl">
            {data.title}
          </Text>
          <View className="mx-auto flex-row mt-3 items-center ">
            <AntDesign name="calendar" size={17} color="#181818" />
            <Text
              style={{fontFamily: 'Montserrat-SemiBold'}}
              className="text-center text-sm text-gray-700 ml-2">
              {formatDate(data.start_date)}
            </Text>
          </View>
        </View>
        <View className="border-b border-gray-200" />

        {loading ? (
          <ActivityIndicator size={'large'} className="mt-16" />
        ) : (
          <View className="mt-10 px-5">
            {data.tickets.map(({event, id, price, title}) => {
              const quantity = getItemQuantity(id);
              return (
                <View key={id}>
                  <View className="flex-row items-center justify-between h-20">
                    <View className="flex-1 flex-start">
                      <View className="flex-row ">
                        <Text
                          style={{fontFamily: 'Montserrat-SemiBold'}}
                          className="text-[#000] text-lg px-2 py-1 rounded-lg">
                          {formatCurrency(price)}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-1">
                      <Text
                        style={{fontFamily: 'Montserrat-SemiBold'}}
                        className="text-sm">
                        {title}
                      </Text>
                      <Text
                        style={{fontFamily: 'Montserrat-Medium'}}
                        className="text-xs text-[#FFA26B]">
                        {data.total_sold_tickets === null
                          ? 0
                          : data.total_sold_tickets}
                        /{data.total_ticket_count} SOLD
                      </Text>
                    </View>

                    <View className="flex-1 items-end">
                      <View className="flex-row  h-[45px] items-center border-gray-300">
                        <AntDesign
                          name="minuscircleo"
                          size={24}
                          color="#FFA26B"
                          className="my-2"
                          onPress={() => decreaseCartQuantity(id)}
                        />
                        <Text
                          style={{fontFamily: 'Montserrat-SemiBold'}}
                          className="text-md mx-4 text-[#474042]">
                          {quantity}
                        </Text>
                        <AntDesign
                          className="my-2"
                          name="pluscircleo"
                          onPress={() =>
                            increaseCartQuantity(id, price, title, event, data)
                          }
                          size={24}
                          color="#1CAE81"
                        />
                      </View>
                    </View>
                  </View>
                  <View className="border-b border-gray-200" />
                </View>
              );
            })}
          </View>
        )}

        <View className="flex-row mt-4 max-w-screen-[200px] px-5">
          <Checkbox
            status={agreeToTerms ? 'checked' : 'unchecked'}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          />
          <View className="ml-3">
            <Text className="text-xs">By clicking checked you </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
              <Text className="text-xs text-[#FFA26B]">
                AGREE to our Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View className="absolute z-40 bottom-0 px-5 right-0 rounded-t-3xl flex-row left-0 bg-[#0f0f0f] h-[11%]">
        <View className="flex-1 flex-row justify-between items-center">
          <TouchableOpacity onPress={toggleOrderSummary}>
            <View className="relative w-20">
              <Image className="h-7 w-7" source={{uri: Cart}} />
              <View className="absolute -mt-4 ml-7 bg-[#FFA26B] px-2 py-1 rounded-full">
                <Text className="text-white ">{cartQuantity}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Text
            style={{fontFamily: 'Montserrat-SemiBold'}}
            className="text-white text-lg">
            {formatCurrency(cartTotal)}
          </Text>
          <View>
            <Checkout agreeToTerms={agreeToTerms} />
          </View>
        </View>
      </View>
      {orderSummaryToggle ? (
        <View className="absolute bottom-0 pt-20 right-0  left-0 bg-[#19191b] h-[100%]">
          <View className="flex-row px-3">
            <View className="flex-1"></View>
            <Text
              style={{fontFamily: 'Montserrat-SemiBold'}}
              className="text-xl text-rose-400 text-center">
              Order Summary
            </Text>
            <TouchableOpacity
              onPress={() => toggleOrderSummary()}
              className={`flex-row flex-1 rounded-full  items-center justify-end p-1`}>
              <AntDesign name="close" size={17} color="#fff" />
            </TouchableOpacity>
          </View>

          <View className="px-5 mt-5">
            {cartItems.map(item => {
              const quantity = getItemQuantity(item.id);
              return (
                <View
                  key={item.id}
                  className="flex-row items-center my-2 justify-between">
                  <Text
                    style={{fontFamily: 'Montserrat-SemiBold'}}
                    className="text-white text-sm">
                    {quantity} x {item.title}
                  </Text>
                  <Text
                    style={{fontFamily: 'Montserrat-SemiBold'}}
                    className="text-white text-sm">
                    {item.eventTitle}
                  </Text>
                  <Text
                    style={{fontFamily: 'Montserrat-SemiBold'}}
                    className="text-white text-sm">
                    {formatCurrency(item.price)}
                  </Text>
                </View>
              );
            })}

            <View className="mt-7 flex-row items-baseline">
              <Text
                style={{fontFamily: 'Montserrat-Bold'}}
                className="text-white text-lg">
                Total:
              </Text>
              <Text
                style={{fontFamily: 'Montserrat-Black'}}
                className="ml-3 text-white text-lg">
                {formatCurrency(cartTotal)}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}
