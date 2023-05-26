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
import api from '../api';

type NavProps = NavigationProp<RootTabParamList, 'Home'>;

export default function Search() {
  const {
    setLoading,
    searching,
    setEventData,
    textState,
    setSearching,
    fetchInitialData,
  } = useEventContext();
  const navigation = useNavigation<NavProps>();
  const user = dummyUser;

  console.log({
    searching,
  });
  const {
    control,
    resetField,
    reset,
    formState: {errors, isDirty, dirtyFields},
  } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const searchData = async (text: string) => {
    setLoading(true);
    try {
      const response = await api.get(`${BaseUrl}/events/?title=${text}`);
      const data = await response.data;
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
    <View className="flex-col flex-1 mx-4">
      <View className="rounded-3xl my-2 justify-between flex-row items-center shadow-2xl bg-gray-100 px-2">
        <TouchableOpacity className="p-1 rounded-full">
          {dirtyFields.search ? (
            <AntDesign
              onPress={async () => {
                reset();
                setSearching(false);
                await fetchInitialData('/events');
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
