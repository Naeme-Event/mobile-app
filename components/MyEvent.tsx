import {View, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import Text from './Text';
import {EventDataTypes} from '../types/typings';
import {useNavigation} from '@react-navigation/native';
import {NavigationPrp} from './TicketCard';

export default function MyEvent(props: EventDataTypes) {
  const month = moment(props.date).format('MMM');
  const day = moment(props.date).format('DD');
  const navigation = useNavigation<NavigationPrp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {...props})}
      className="bg-white h-[240px]  shadow-2xl mx-4 items-center p-4 rounded-3xl my-6">
      <View className="items-center absolute right-7 top-7 p-2 ml-4 h-[69px] shadow-lg bg-gray-100 z-30 bottom-3 rounded-xl">
        <Text className="text-[30px] font-bold text-rose-500">{month}</Text>
        <Text className="text-[13px] -mt-1 leading-4">{day}</Text>
      </View>

      <View className="mt-3 w-full justify-between">
        <View className="mt-2">
          <Text className="text-3xl font-bold">{props.title}</Text>
          <Text className="">selling {props.total_ticket_count} tickets</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="mt-10">
            <Text className="text-sm font-bold">tickets sold</Text>
            <Text font="Montserrat-Bold" className="text-sm">
              {props.total_sold_tickets ? props.total_sold_tickets : 0} Sold
            </Text>
          </View>
          <View className="mt-10">
            <Text className="text-sm font-bold">tickets available</Text>
            <Text font="Montserrat-Bold" className="text-sm">
              {props.total_ticket_count - props.total_sold_tickets} Available
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
