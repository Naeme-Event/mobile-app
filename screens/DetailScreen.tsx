import {
  View,
  TouchableOpacity,
  Platform,
  Animated,
  Pressable,
} from 'react-native';
import React, {useRef} from 'react';
import {RootStackScreenProps} from '../types/types';
import Details from '../components/Details';
import Text from '../components/Text';
import {dummyUser} from '../config';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
    <View className="flex-1">
      <View className="w-full absolute bottom-0 py-4 mb-2 items-center z-10">
        <TouchableOpacity
          onPress={() => navigation.navigate('TicketCart', {...data})}
          className="bg-[#000000] flex-row px-20 py-3 rounded-xl shadow-md w-3/5 mx-auto">
          <Text font="Montserrat-Bold" className="text-[#f94c57] text-xs mr-1">
            Book Now
          </Text>
          <FontAwesome name="ticket" size={12} color="#f94c57" />
        </TouchableOpacity>
      </View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        showsVerticalScrollIndicator={false}>
        {/*// @ts-ignore */}
        <View className={styles.bannerContainer}>
          <Animated.Image
            style={styles.banner(scrollA)}
            source={{uri: data.image}}
            resizeMode="cover"
          />
        </View>

        <Details {...data} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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

const styles = {
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: (scrollA: Animated.Value) => ({
    height: BANNER_H,
    width: '200%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
};

// f94c57;
// fc3c44;

// c2cad7;
