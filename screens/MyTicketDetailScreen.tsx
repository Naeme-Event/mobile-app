import {
  View,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {RootStackScreenProps} from '../types/types';
import {Countdown} from '../utils/CountDown';
import axios from 'axios';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokensType} from '../hooks/useCachedResources';
import Text from '../components/Text';
import {BaseUrl, dummyUser} from '../config';
import {formatCurrency, formatTime} from '../utils/formatter';

export default function MyTicketDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<'MyTicketDetail'>) {
  const data = route?.params;
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(data.used);
  const user = dummyUser;

  const verifyTicket = async () => {
    const jsonValue = await AsyncStorage.getItem('naemeUser');
    const tokens: TokensType = jsonValue != null ? JSON.parse(jsonValue) : null;

    const formData = new FormData();
    formData.append('used', true);
    setLoading(true);
    if (tokens.access && data?.id) {
      if (user?.id === data.ticket_admin) {
        axios
          .patch(
            `${BaseUrl}/my-tickets/${data?.id}/`,
            {used: true},
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${tokens?.access}`,
              },
            },
          )
          .then(response => {
            if (response.status === 200) {
              setIsVerified(response.data.used);
              setLoading(false);
            }
          })
          .catch(e => {
            console.log(e);
            setLoading(false);
          });
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar animated barStyle="dark-content" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className={` ${
          Platform.OS === 'ios' ? 'top-20' : 'top-20'
        } bg-[#ffffff] z-30 absolute rounded-full left-5 items-center p-2`}>
        <AntDesign name="arrowleft" size={20} color="#181818" />
      </TouchableOpacity>
      <ScrollView className="mx-4 bg-white rounded-3xl w-full px-[7%]">
        <View className="h-full w-full py-7 mt-[50%] px-4">
          <Text font="Montserrat-Bold" className="text-gray-800 text-3xl">
            {data.event_name}
          </Text>
          <View className="flex-row ml-2 mt-3 items-center">
            <View className="flex-row items-center rounded-lg px-3 gap-1 pb-1 bg-[#f23f55]">
              <FontAwesome name="ticket" size={17} color="#e8e1e2" />
              <Text
                font="montserrat-semibold"
                className="text-[#e8e1e2] text-sm">
                {route.params.title}
              </Text>
            </View>
          </View>
          <View className="border-b border-gray-200 my-4" />
          <View className="h-[240px] w-[270px] mx-auto shadow-lg mt-4">
            <Image
              source={{uri: data.qr_code}}
              resizeMode="cover"
              className="h-full w-full"
            />

            {isVerified && (
              <View className="w-[270px] h-[240px] items-center justify-center absolute">
                <MaterialIcons name="verified" size={180} color="#009154" />
              </View>
            )}
          </View>
          <View className="border-b border-gray-200 my-4" />
          <View className=" shadow-lg rounded-lg px-2 py-2">
            <View className="flex-row justify-between">
              <View className="gap-5">
                <View>
                  <Text
                    font="Montserrat-Bold"
                    className="text-rose-500 text-xs">
                    Date
                  </Text>
                  <Text
                    font="Montserrat-Bold"
                    className="text-[#000000] text-lg">
                    {data.date}
                  </Text>
                </View>
                <View>
                  <Text
                    font="Montserrat-Bold"
                    className="text-rose-500 text-xs">
                    Time
                  </Text>
                  <Text
                    font="Montserrat-Bold"
                    className="text-[#000000] text-lg">
                    {formatTime(data.start_time)}
                  </Text>
                </View>
              </View>
              <View className="gap-5">
                <View>
                  <Text
                    font="Montserrat-Bold"
                    className="text-rose-500 text-xs">
                    Quantity
                  </Text>
                  <Text
                    font="Montserrat-Bold"
                    className="text-[#000000] text-lg">
                    {data.quantity}
                  </Text>
                </View>
                <View>
                  <Text
                    font="Montserrat-Bold"
                    className="text-rose-500 text-xs">
                    Price Each
                  </Text>
                  <Text
                    font="Montserrat-Bold"
                    className="text-[#000000] text-lg">
                    $ {formatCurrency(data.price * data.quantity)}
                  </Text>
                </View>
              </View>
            </View>
            <View className="border-b border-gray-200 my-4" />
            <View className="flex-row items-center justify-between">
              <View className="mr-3">
                <Entypo name="time-slot" size={24} color="#282828" />
              </View>
              <Countdown date={data.date} end_time={data.end_time} />
            </View>
          </View>
          {user?.id === data.ticket_admin && (
            <TouchableOpacity
              onPress={verifyTicket}
              className="bg-rose-500 mx-2 mt-2 rounded-xl">
              <Text
                font="Montserrat-Bold"
                className="text-center text-white py-4">
                {isVerified
                  ? 'Verified'
                  : loading
                  ? 'Verifying...'
                  : ' Verify Ticket'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
