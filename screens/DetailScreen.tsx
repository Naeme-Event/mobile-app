import {View, TouchableOpacity, Platform, Animated, Image} from 'react-native';
import React, {useRef} from 'react';
import {RootStackScreenProps} from '../types/types';
import Details from '../components/Details';
import {dummyUser} from '../config';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text} from 'react-native-paper';

export const BANNER_H = 400;
export const TOPNAVI_H = 0;

export default function DetailScreen({
  navigation,
  route,
}: RootStackScreenProps<'Detail'>) {
  const scrollA = useRef(new Animated.Value(0)).current;
  const user = dummyUser;
  const data = route.params;
  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }}>
      <View className="w-full absolute bottom-0 py-4 mb-2 items-center z-10">
        <TouchableOpacity
          onPress={() => navigation.navigate('TicketCart', {...data})}
          className="bg-[#000000] flex-row px-20 py-3 rounded-xl shadow-md   mx-auto">
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="text-[#ffffff] text-lg mr-1">
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.ScrollView
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        showsVerticalScrollIndicator={false}>
        {/*// @ts-ignore */}
        <View>
          <Image
            source={{uri: data.image}}
            resizeMode="cover"
            className="h-[330px]"
          />
        </View>

        <Details {...data} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Main', {screen: 'Home'})}
          className={` ${
            Platform.OS === 'ios' ? 'top-5' : 'top-12'
          } bg-[#f7f7f7] shadow-sm shadow-gray-500 z-30 absolute rounded-full left-5 items-center p-2`}>
          {Platform.OS === 'android' ? (
            <AntDesign name="arrowleft" size={17} color="#181818" />
          ) : (
            <AntDesign name="close" size={17} color="#181818" />
          )}
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
}
