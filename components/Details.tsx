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
import {formatCurrency} from '../utils/formatter';
import {Countdown} from '../utils/CountDown';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {Text} from 'react-native-paper';

export default function Details(props: EventDataTypes) {
  const dateime = moment(
    props.end_date + ' ' + props?.start_time,
    'DD/MM/YYYY HH:mm',
  );
  const time = moment(props.start_time, 'HH:mm').format('h:mm A');
  const date = moment(props.start_date).format('MMMM D, YYYY');
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
    <View className="rounded-[30px] flex-1 px-6 pb-20 bg-white -mt-7">
      <View className="">
        <Animated.View
          style={[{opacity}]}
          className="flex-row justify-between mt-4">
          <Text
            className="mt-4 text-2xl my-3 font-ExtraBold text-black"
            style={{
              fontFamily: 'Montserrat-ExtraBoldItalic',
            }}>
            {props.title}
          </Text>
        </Animated.View>
        <Animated.View
          style={[{opacity}]}
          className="my-1 flex-row items-center justify-between">
          <Countdown date={props.end_date} end_time={props.end_time} />
        </Animated.View>
      </View>
      <View className="flex-row items-center mt-3 px-2 justify-between">
        {!props.lowest_price && !props.highest_price ? (
          <Text
            style={{
              fontFamily: 'Montserrat-BoldI',
            }}
            className="text-sm text-gray-500">
            Free
          </Text>
        ) : props?.lowest_price === props?.highest_price ? (
          <View>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
              }}
              className="text-lg  text-gray-500">
              $ {formatCurrency(props.lowest_price)}
            </Text>
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
              }}
              className="text-sm  text-gray-500">
              $ {formatCurrency(props.lowest_price)} - ${' '}
              {formatCurrency(props.highest_price)}
            </Text>
          </View>
        )}
      </View>
      <Animated.View
        style={[{opacity}]}
        className="flex-row items-center mt-10 gap-x-2 border-t pt-4 border-gray-200">
        <View className="items-center mr-3 justify-center rounded-full">
          <Octicons name="location" size={24} color="#1CAE81" />
        </View>
        <Text
          className="text-gray-600 leading-5"
          style={{
            fontFamily: 'Montserrat-Medium',
          }}>
          {props.venue} {props.city}, {props.state}.
        </Text>
      </Animated.View>
      <Animated.View
        style={[{opacity}]}
        className="flex-row items-center mt-4 gap-x-2">
        <View className="items-center mr-3 justify-center rounded-full">
          <Ionicons name="md-calendar" size={24} color="#1CAE81" />
        </View>
        <Text
          className="text-gray-600 leading-5"
          style={{
            fontFamily: 'Montserrat-Medium',
          }}>
          {date}
        </Text>
      </Animated.View>
      <Animated.View
        style={[{opacity}]}
        className="flex-row items-center mt-4 gap-x-2">
        <View className="items-center mr-3 justify-center rounded-full">
          <Ionicons name="time-outline" size={26} color="#1CAE81" />
        </View>
        <Text
          className="text-gray-600 leading-5"
          style={{
            fontFamily: 'Montserrat-Medium',
          }}>
          {time}
        </Text>
      </Animated.View>

      {props.website && (
        <Animated.View
        // style={[{ opacity }]}
        >
          <TouchableOpacity
            onPress={() => Linking.openURL(props.website)}
            className="items-start justify-center mt-4 rounded-full">
            <AntDesign name="link" size={24} color="#1CAE81" />
          </TouchableOpacity>
        </Animated.View>
      )}

      <Animated.View
        // style={[{ opacity }]}
        className="my-6">
        <Text
          className="text-[#FFA26B] leading-5 text-lg mb-4"
          style={{
            fontFamily: 'Montserrat-ExtraBold',
          }}>
          About Event:
        </Text>
        <Text
          className="text-gray-600 leading-5"
          style={{
            fontFamily: 'Montserrat-Medium',
          }}>
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
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                }}
                className="text-gray-900">
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
