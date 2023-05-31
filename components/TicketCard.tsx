import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../types/types';
import {PaidTicketDataTypes} from '../types/typings';
import {formatCurrency, formatDate, formatTime} from '../utils/formatter';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Countdown} from '../utils/CountDown';
import {Text} from 'react-native-paper';

export type NavigationPrp = NavigationProp<RootStackParamList, 'Detail'>;

export default function TicketCard({item}: {item: PaidTicketDataTypes}) {
  const navigation = useNavigation<NavigationPrp>();
  const [isVerified, setIsVerified] = useState(item.used);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('MyTicketDetail', {...item})}>
      <View className="bg-white mb-7 w-[315px] mx-4 rounded-3xl">
        <View className="w-full py-7 px-4">
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="text-gray-800 text-2xl">
            {item.event_name}
          </Text>
          <View className="flex-row ml-2 mt-3 items-center">
            <View className="flex-row items-center shadow-xl rounded-lg shadow-gray-400 px-3 gap-1 pb-1 bg-[#1CAE81]">
              {/* <FontAwesome name="ticket" size={14} color="#e8e1e2" /> */}
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                }}
                className="text-[#e8e1e2] text-xs">
                {item.title}
              </Text>
            </View>
          </View>
          <View className="border-b border-gray-200 my-2" />

          <View className="h-[40%] w-[70%] mx-auto shadow-lg mt-[1px]">
            <Image
              source={{uri: item.qr_code}}
              resizeMode="cover"
              className="h-full w-full"
            />
            {item.used && (
              <View className="w-full h-full absolute items-center justify-center">
                <MaterialIcons name="verified" size={150} color="#009154" />
              </View>
            )}
          </View>
          <View className="shadow-lg rounded-lg px-2 py-2 mt-2">
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
                    className="text-[#000000] text-sm">
                    {formatDate(item.start_date)}
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
                    className="text-[#000000] text-sm">
                    {formatTime(item.start_time)}
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
                    className="text-[#000000] text-sm">
                    {item.quantity}
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
                    className="text-[#000000] text-sm">
                    {formatCurrency(item.price * item.quantity)}
                  </Text>
                </View>
              </View>
            </View>
            <View className="border-b border-gray-200 my-2" />
            <View className="flex-row items-center justify-between">
              <Countdown date={item.end_date} end_time={item.end_time} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
