import {
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {useNavigationProps} from './EventCard';
import {EventDataTypes} from '../types/typings';
import Text from './Text';
import {formatCurrency} from '../utils/formatter';
import {Countdown} from '../utils/CountDown';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

export default function Details(props: EventDataTypes) {
  const dt = moment(props.date + ' ' + props?.end_time, 'DD/MM/YYYY HH:mm');
  const time = moment(props.start_time, 'HH:mm').format('h:mm A');
  const date = moment(props.date).format('MMMM D, YYYY');
  const opacity = useRef(new Animated.Value(0)).current;

  function fadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }
  function fadeOut() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    fadeIn();
    return () => {
      fadeOut();
      console.log('fadeout-------------');
    };
  }, []);

  // description read more
  const [readMore, setReadMore] = useState(false);
  const [text, setText] = useState<string | null>(
    props?.description.slice(0, 200),
  );

  console.log();
  const Lng: number = -118.192395;
  const Lat: number = 33.769327;
  return (
    <View className="rounded-[30px] flex-1 px-4 pb-20">
      <View className="">
        <Animated.View
          style={[{opacity}]}
          className="flex-row justify-between mt-4">
          <Text
            className="mt-4 text-2xl my-3 font-bold text-[#000000]"
            font="Montserrat-Bold">
            {props.title}
          </Text>
        </Animated.View>
        <Animated.View
          style={[{opacity}]}
          className="my-1 flex-row items-center justify-between">
          <View className="flex-row justify-between p-2 items-center mr-3 bg-gray-100 border border-gray-300 w-[100%] rounded-3xl">
            <Entypo name="time-slot" size={24} color="#282828" />
            <Countdown date={props.date} end_time={props.end_time} />
          </View>
        </Animated.View>
      </View>
      <View className="flex-row items-center mt-3 bg-gray-200 px-2 justify-between">
        {!props.lowest_price && !props.highest_price ? (
          <Text font="Montserrat-Bold" className="text-lg text-[#f94c57]">
            $0.00
          </Text>
        ) : props?.lowest_price === props?.highest_price ? (
          <View>
            <Text font="Montserrat-Bold" className="text-lg  text-[#f94c57]">
              $ {formatCurrency(props.lowest_price)}
            </Text>
          </View>
        ) : (
          <View>
            <Text font="Montserrat-Bold" className="text-lg  text-[#f94c57]">
              $ {formatCurrency(props.lowest_price)} - ${' '}
              {formatCurrency(props.highest_price)}
            </Text>
          </View>
        )}
      </View>
      <Animated.View
        style={[{opacity}]}
        className="flex-row items-center mt-5 gap-x-2">
        <View className="p-2 items-center mr-3 justify-center h-8 w-8 rounded-full bg-gray-200">
          <Ionicons name="md-calendar" size={16} color="#f94c57" />
        </View>
        <Text
          className="text-gray-600 leading-5 text-xs"
          font="Montserrat-Bold">
          {date}
        </Text>
      </Animated.View>
      <Animated.View
        style={[{opacity}]}
        className="flex-row items-center mt-3 gap-x-2">
        <View className="p-2 items-center mr-3 justify-center h-8 w-8 rounded-full bg-gray-200">
          <AntDesign name="clockcircle" size={16} color="#f94c57" />
        </View>
        <Text
          className="text-gray-600 leading-5 text-xs"
          font="Montserrat-Bold">
          {time}
        </Text>
      </Animated.View>
      <Animated.View
        style={[{opacity}]}
        className="flex-row items-center mt-3 gap-x-2">
        <View className="p-2 items-center mr-3 justify-center h-8 w-8 rounded-full bg-gray-200">
          <Octicons name="location" size={16} color="#f94c57" />
        </View>
        <Text
          className="text-gray-600 leading-5 text-xs"
          font="Montserrat-Bold">
          {props.location}
        </Text>
      </Animated.View>
      {props.website && (
        <Animated.View
        // style={[{ opacity }]}
        >
          <TouchableOpacity
            onPress={() => Linking.openURL(props.website)}
            className="p-2 items-center justify-center h-8 mt-3 w-8 rounded-full bg-gray-200">
            <AntDesign name="link" size={16} color="#f94c57" />
          </TouchableOpacity>
        </Animated.View>
      )}

      <Animated.View
        // style={[{ opacity }]}
        className="mt-6">
        <Text className="text-black leading-5 text-lg" font="Montserrat-Bold">
          Description:
        </Text>
        <Text className="text-gray-600 leading-5" font="montserrat-medium">
          {/* 
// @ts-ignore */}
          {text} {text?.length > 100 && !readMore && '...'}
          <Text
            onPress={() => {
              if (!readMore) {
                setText(props.description);
                setReadMore(true);
              } else {
                setText(props.description.slice(0, 100));
                setReadMore(false);
              }
            }}
            className="font-bold text-gray-300">
            {/* 
// @ts-ignore */}
            {text?.length >= 100 && (
              <Text font="Montserrat-Bold" className="text-gray-900">
                {readMore ? 'Show Less' : 'Read More'}
              </Text>
            )}
          </Text>
        </Text>
      </Animated.View>
    </View>
  );
}

// <View className="rounded-2xl">
//   <MapView
//     initialRegion={{
//       latitude: Lat,
//       longitude: Lng,
//       latitudeDelta: 0.005,
//       longitudeDelta: 0.005,
//     }}
//     className="h-[377px] mt-7"
//   />
// </View>
