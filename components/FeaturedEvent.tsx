import {
  View,
  Pressable,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import moment from 'moment';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export type useNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Detail'
>;

import {RootStackParamList} from '../types/types';
import {useEventContext} from '../hooks/useEvent';
import {EventDataTypes} from '../types/typings';
import {formatCurrency} from '../utils/formatter';
import {BaseUrl} from '../config';
import {Text} from 'react-native-paper';

export default function FeaturedEvent() {
  const navigation = useNavigation<useNavigationProps>();
  const [like, setLike] = useState(false);
  const {fetchData} = useEventContext();
  const [featuredEvent, setFeaturedEvent] = useState<
    EventDataTypes[] | undefined
  >([]);

  const Url = `${BaseUrl}/events/?featured=true`;

  useLayoutEffect(() => {
    (async () => {
      const EventData = await fetchData(Url);
      setFeaturedEvent(EventData);
    })();
  }, []);

  return (
    <View className="px-4">
      <View className="flex-row justify-between items-center my-3">
        <Text
          style={{fontFamily: 'Montserrat-BlackItalic'}}
          className="px-4 text-[#1DAF81] text-xl">
          Featured Events🔥
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateEvent')}>
          <Icon name="create" size={30} color="#1DAF81" />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingVertical: 20}}
        className="">
        {featuredEvent?.map((data: EventDataTypes) => {
          const month = moment(data.date).format('MMM');
          const day = moment(data.date).format('DD');
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={data.id}
              onPress={() => navigation.navigate('Detail', {...data})}
              className=" mx-3 rounded-3xl bg-white w-[270px] h-[254px]">
              <View className="shadow-md">
                <Image
                  resizeMode="cover"
                  className="rounded-t-3xl h-[132px]"
                  source={{uri: data?.image}}
                />
              </View>

              <View className="w-full px-4 py-5 flex-1 rounded-b-3xl">
                <View className="mt-2  items-center p-2 ml-4 absolute shadow-md shadow-gray-300 bg-white z-30 -top-10 rounded-xl w-14">
                  <Text className="text-[20px] font-bold text-rose-500">
                    {month}
                  </Text>
                  <Text className="text-[13px] -mt-1 leading-4">{day}</Text>
                </View>
                <Text
                  style={{fontFamily: 'Montserrat-Bold'}}
                  className="mt-3 text-[18px]">
                  {data.title}
                </Text>
                <View className="flex-row mt-1 items-center mr-2">
                  <Text className="text-[13px] font-medium text-gray-400">
                    by {data.organizer}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between">
                  {data.lowest_price ? (
                    <Text className="text-gray-500 font-semibold">
                      $ {formatCurrency(data.lowest_price)}
                    </Text>
                  ) : (
                    <Text className="text-gray-500 font-semibold">$ 0.00</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
