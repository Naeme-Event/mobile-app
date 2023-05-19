import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  Text,
} from 'react-native';
import React, {ReactNode, useCallback, useState} from 'react';

import {Controller, useForm} from 'react-hook-form';
import {useEventContext} from '../hooks/useEvent';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootTabParamList} from '../types/types';
import {BaseUrl, dummyUser} from '../config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

type NavProps = NavigationProp<RootTabParamList, 'Home'>;

export default function Search() {
  const {setLoading, setEventData, textState, setTextState, setSearching} =
    useEventContext();
  const navigation = useNavigation<NavProps>();
  const user = dummyUser;

  const {
    control,
    resetField,
    formState: {errors, isDirty, dirtyFields},
  } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const searchData = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/events/?title=${text}`);
      const data = await response.json();
      setLoading(false);
      return data?.results;
    } catch (e) {
      setLoading(false);
    }
  };

  const searchFunction = useCallback(async (text: string) => {
    if (text) {
      const data = await searchData(text);
      if (data) {
        setEventData(data);
      }
    }
  }, []);

  return (
    <View className="-mt-2 flex-1 flex-col">
      <View className="flex-row mb-1 items-start">
        <View className="">
          <Text
            style={{fontFamily: 'Montserrat-Black'}}
            className="text-[26px] text-gray-900">
            Discover Amazing Events Happening Now!
          </Text>
        </View>
      </View>
      <View className="rounded-3xl my-2 justify-between flex-row items-center shadow-2xl bg-gray-300 px-2">
        <TouchableOpacity className="p-1 rounded-full">
          {dirtyFields.search ? (
            <AntDesign
              onPress={() => {
                resetField('search');
                setSearching(false);
                // fetchData();
              }}
              name="closecircleo"
              size={24}
              color="#000"
            />
          ) : (
            <Feather name="search" size={24} color="#000" />
          )}
        </TouchableOpacity>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              className="text-gray-700 px-2 h-10 flex-1 bg-opacity-25"
              onChangeText={text => {
                onChange(text);
                setTextState(text);
              }}
              value={value}
              onBlur={onBlur}
              onSubmitEditing={e => {
                setSearching(true);
                searchFunction(e.nativeEvent.text);
              }}
              keyboardAppearance="light"
              defaultValue={textState}
              placeholder="Search events by name"
              underlineColorAndroid="transparent"
              placeholderTextColor={'#191d26'}
            />
          )}
          name="search"
        />
      </View>
    </View>
  );
}
