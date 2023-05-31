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
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokensType} from '../hooks/useCachedResources';
import {} from '../config';
import {formatCurrency, formatDate, formatTime} from '../utils/formatter';
import api from '../api';
import {useAppSelector} from '../redux-toolkit/hook';
import {Text} from 'react-native-paper';

export default function MyTicketDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<'MyTicketDetail'>) {
  const data = route?.params;
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(data.used);
  const user = useAppSelector(state => state.users.user);

  const verifyTicket = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tokens');
      const tokens: TokensType =
        jsonValue != null ? JSON.parse(jsonValue) : null;

      const formData = new FormData();
      formData.append('used', true);
      setLoading(true);
      if (tokens.access && data?.id) {
        if (user?.id === data.ticket_admin) {
          api
            .patch(
              `/my-tickets/${data?.id}/`,
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
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar animated barStyle="dark-content" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className={` ${
          Platform.OS === 'ios' ? 'top-10' : 'top-10'
        } bg-[#dddddd] z-30 absolute rounded-full left-5 items-center p-2`}>
        <AntDesign name="arrowleft" size={20} color="#181818" />
      </TouchableOpacity>
      <ScrollView className="mx-4 bg-white rounded-3xl w-full px-[7%]">
        <View className="h-full w-full py-7 mt-[20%] px-4">
          <Text
            style={{
              fontFamily: 'Montserrat-Black',
            }}
            className="text-gray-800 text-3xl">
            {data.event_name}
          </Text>
          <View className="flex-row ml-2 mt-3 items-center">
            <View className="flex-row items-center rounded-lg px-3 gap-1 pb-1 bg-[#1CAE81]">
              <FontAwesome name="ticket" size={17} color="#ffffff" />
              <Text
                style={{
                  fontFamily: 'Montserrat-BlackItalic',
                }}
                className="text-[#ffffff] text-sm">
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
                    style={{
                      fontFamily: 'Montserrat-Bold',
                    }}
                    className="text-[#1CAE81] text-xs">
                    Date
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                    }}
                    className="text-[#000000] text-lg">
                    {formatDate(data.start_date)}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                    }}
                    className="text-[#1CAE81] text-xs">
                    Time
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                    }}
                    className="text-[#000000] text-lg">
                    {formatTime(data.start_time)}
                  </Text>
                </View>
              </View>
              <View className="gap-5">
                <View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                    }}
                    className="text-[#1CAE81] text-xs">
                    Quantity
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                    }}
                    className="text-[#000000] text-lg">
                    {data.quantity}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                    }}
                    className="text-[#1CAE81] text-xs">
                    Price Each
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                    }}
                    className="text-[#000000] text-lg">
                    {formatCurrency(data.price * data.quantity)}
                  </Text>
                </View>
              </View>
            </View>
            <View className="border-b border-gray-200 my-4" />
            <View className="flex-row items-center justify-between">
              <Countdown date={data.end_date} end_time={data.end_time} />
            </View>
          </View>
          {user?.id === data.ticket_admin && (
            <TouchableOpacity
              onPress={verifyTicket}
              className="bg-[#000000] mx-2 mt-2 rounded-xl">
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                }}
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
