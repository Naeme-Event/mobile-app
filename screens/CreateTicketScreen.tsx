import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  ScrollView,
  Platform,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import {RootStackParamList, RootStackScreenProps} from '../types/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import {fadeIn} from './CreateEventScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokensType} from '../hooks/useCachedResources';

import {EventDataTypes, TicketDataTypes} from '../types/typings';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {BaseUrl, dummyUser} from '../config';
import {useAppSelector} from '../redux-toolkit/hook';
import api from '../api';
import {Text} from 'react-native-paper';
import axios from 'axios';

const showAlert = () =>
  Alert.alert(
    'Ticket created Successfully',
    'You can add more tickets or press done to complete',
    [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      },
    ],
    {
      cancelable: true,
    },
  );

export default function CreateTicketScreen({
  navigation,
  route,
}: RootStackScreenProps<'CreateTicket'>) {
  const [loading, setLoading] = useState(false);
  const [exitLoading, setExitLoading] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const {eventId} = route.params;
  const user = useAppSelector(state => state.users.user);

  interface SubmitData {
    title: string;
    quantity: string;
    price: string;
  }

  async function handleDone() {
    try {
      setExitLoading(true);
      const response = await fetch(`${BaseUrl}/events/${eventId}`);
      const eventData: EventDataTypes = await response.json();
      if (response.status === 200) {
        setExitLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Detail', params: eventData}],
          }),
        );
      }
      return true;
    } catch (e) {
      setExitLoading(false);
      return e;
    }
  }

  const onSubmit = async (data: SubmitData) => {
    const jsonValue = await AsyncStorage.getItem('@tokens');
    const tokens: TokensType = jsonValue != null ? JSON.parse(jsonValue) : null;
    const price = Number(data.price);
    const formData = new FormData();
    formData.append('price', price);
    formData.append('title', data.title);
    formData.append('quantity', Number(data.quantity));
    formData.append('event', eventId);
    formData.append('owner', user?.id);
    formData.append('is_paid', price > 0 ? true : false);

    setLoading(true);
    try {
      const response = await api.post(
        '/tickets/',
        {
          price: price,
          title: data.title,
          quantity: data.quantity,
          event: eventId,
          paid: price > 0 ? true : false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens?.access}`,
          },
        },
      );
      const resData: TicketDataTypes = await response.data;

      console.log(resData);
      if (response.status === 201) {
        setLoading(false);
        reset();
        showAlert();
      }
      console.log(resData);
      console.log(response.status);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return error;
    }
  };

  useEffect(() => {
    fadeIn(opacity);
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      price: '',
      title: '',
      quantity: '',
    },
  });
  return (
    <ScrollView className="">
      <View className="flex-1 pb-32 px-6 bg-white h-screen">
        <StatusBar animated={true} barStyle="dark-content" />
        <SafeAreaView className={Platform.OS === 'ios' ? 'mt-10' : 'mt-12'}>
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              className="p-2 bg-white rounded-3xl"
              onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={22} color="#181818" />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Montserrat-Black',
              }}
              className="text-xl">
              Create Ticket
            </Text>
            <TouchableOpacity onPress={handleDone}>
              {exitLoading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                  }}
                  className="text-sm">
                  Done
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View className="mt-20">
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
            }}
            className="text-sm p-3 bg-orange-200 mb-4 rounded-md">
            Please Leave the ticket price blank for a free event, and create
            only one ticket if you are hosting a free event
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="mb-2 text-sm">
            Ticket Name
          </Text>
          <Animated.View
            style={[{opacity}]}
            className="bg-gray-100 rounded-lg px-3">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  className=" text-gray-500"
                  style={{
                    fontFamily: 'Montserrat-Medium',
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ticket name"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="title"
            />
          </Animated.View>
          {errors.title && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="my-1 mt-2 text-sm">
            Price
          </Text>
          <Animated.View
            style={[{opacity}]}
            className="bg-gray-100 rounded-lg my-2 px-3">
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  className="text-gray-500"
                  onBlur={onBlur}
                  style={{
                    fontFamily: 'Montserrat-Medium',
                  }}
                  onChangeText={onChange}
                  value={value}
                  textContentType="telephoneNumber"
                  keyboardType="numeric"
                  placeholder="Price for ticket"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="price"
            />
          </Animated.View>
          {errors.price && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="my-1 text-sm">
            Quantity
          </Text>
          <Animated.View
            style={[{opacity}]}
            className="bg-gray-100 px-3 rounded-lg my-2">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  className="text-gray-500"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="decimal-pad"
                  placeholder="Quantity of tickets"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="quantity"
            />
          </Animated.View>
          {errors.quantity && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="bg-[#000] rounded-xl mt-10">
            {loading ? (
              <ActivityIndicator size={'small'} className="p-3 px-20" />
            ) : (
              <Text
                className="px-14 py-4 text-center text-white"
                style={{
                  fontFamily: 'Montserrat-Bold',
                }}>
                Create Ticket
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
