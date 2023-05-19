import {View, Image, TouchableOpacity} from 'react-native';

import React, {ReactElement, ReactNode} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import moment from 'moment';
import {RootStackParamList} from '../types/types';
import {EventDataTypes} from '../types/typings';
// @ts-ignore
import {formatCurrency} from '../utils/formatter';
import {Text} from 'react-native';

export type useNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Detail'
>;

export default function EventCard(props: EventDataTypes) {
  const navigation = useNavigation<useNavigationProps>();
  const month = moment(props.date).format('MMM');
  const day = moment(props.date).format('DD');

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate('Detail', {...props})}
      className="bg-gray-100  mx-6 border-gray-300 my-7 rounded-2xl shadow-sm">
      <View className="mb-3">
        <View className="w-full h-[250px] ">
          <Image
            resizeMode="cover"
            className="w-full h-full rounded-2xl"
            source={{uri: props.image}}
          />
          <View className="mt-2  items-center p-2 ml-4 absolute shadow-sm z-30  top-3 right-3 rounded-xl w-14">
            <Text className="text-[20px] font-bold text-rose-500">{month}</Text>
            <Text className="text-[13px] -mt-1 leading-4">{day}</Text>
          </View>

          {props.total_sold_tickets === null ? (
            <View className="right-3 bottom-3 absolute bg-gray-50 px-1 rounded-full">
              <Text className="">0 SOLD</Text>
            </View>
          ) : (
            <View className="right-3 bottom-3 absolute bg-gray-50 px-1 rounded-full">
              <Text className="">{props.total_sold_tickets} SOLD</Text>
            </View>
          )}
        </View>
        <View className="w-full p-4">
          <View className="flex-row justify-between">
            <Text
              style={{fontFamily: 'Montserrat-BoldItalic'}}
              className="text-gray-900  text-xl">
              {props.title}
            </Text>
          </View>

          <View className="w-full mt-1">
            {props.lowest_price ? (
              <Text
                style={{fontFamily: 'Montserrat-Bold'}}
                className="text-gray-500">
                $ {formatCurrency(props.lowest_price)}
              </Text>
            ) : (
              <Text className="bottom-3 absolute rounded-full">$0.00</Text>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', {...props})}
              className="self-end">
              <Text
                style={{fontFamily: 'Montserrat-Bold'}}
                className="text-black">
                View Event
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
