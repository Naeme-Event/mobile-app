import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  TextInput,
  Image,
  Pressable,
  Animated,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from 'react-native';

import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import React, {useEffect, useRef, useState} from 'react';
import {RootStackScreenProps} from '../types/types';
import {Controller, useForm} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import {formatDate, formatTime} from '../utils/formatter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokensType} from '../hooks/useCachedResources';
import moment from 'moment';
import {EventDataTypes} from '../types/typings';
import {BaseUrl, dummyUser} from '../config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {Text} from 'react-native-paper';
import api from '../api';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

type Category = {
  label: string;
  value: string;
}[];

export function fadeIn(opacity: Animated.Value) {
  Animated.timing(opacity, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();
}
export default function CreateEventScreen({
  navigation,
  route,
}: RootStackScreenProps<'CreateEvent'>) {
  const [image, setImage] = useState<DocumentPickerResponse | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date(1598051730000));
  const [endDate, setEndDate] = useState<Date>(new Date(1598051730000));
  const [startTime, setStartTime] = useState<Date>(new Date(15980988770000));
  const [endTime, setEndTime] = useState<Date>(new Date(15980988770000));
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [category, setCategory] = useState<Category>([]);
  const [seletedcategory, setSeletedCategory] = useState('');
  const [error, setError] = useState('');
  const [catError, setCatError] = useState('');
  const opacity = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const user = dummyUser;

  // states ended

  // animation functions
  function fadeImage() {
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }
  const pickImage = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });
      // @ts-ignore
      console.log('chosend', result);
      setImage(result);
      fadeImage();
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };
  // Effects
  useEffect(() => {
    fadeIn(opacity);
  }, []);

  async function getCategories() {
    try {
      const response = await api.get(`/event-category/`);
      const categrory = await response.data;
      const categoryData = categrory?.results?.map(
        (item: {id: string; name: string}) => ({
          value: item?.id,
          label: item?.name,
        }),
      );
      if (categoryData) {
        setCategory(categoryData);
      }
    } catch (error) {
      throw error;
    }
  }

  // date time functions
  const onStartDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    if (event.type === 'dismissed' || event.type === 'set')
      Platform.OS === 'android' && setShowStartDate(false);
    setStartDate(currentDate);
  };
  const onEndDateChange = (event: any, selectedDate: any) => {
    console.log('end date------');

    const currentDate = selectedDate;
    if (event.type === 'dismissed' || event.type === 'set')
      Platform.OS === 'android' && setShowEndDate(false);
    setEndDate(currentDate);
  };

  const onStartTimeChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    if (event.type === 'dismissed' || event.type === 'set')
      Platform.OS === 'android' && setShowStartTime(false);
    setStartTime(currentDate);
  };
  const onEndTimeChange = (event: any, selectedTime: any) => {
    const currentDate = selectedTime;
    if (event.type === 'set' || event.type === 'dismissed')
      Platform.OS === 'android' && setShowEndTime(false);
    setEndTime(currentDate);
  };

  // ends

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      dirtyFields,
      isDirty,
      isSubmitted,
      isValidating,
      isValid,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      end_time: '',
      start_time: '',
      end_date: '',
      start_date: '',
      country: '',
      state: '',
      city: '',
      venue: '',
      website: '',
      organizer: '',
      terms: '',
    },
  });

  // submit function

  const onSubmit = async (data: any) => {
    setError('');
    setCatError('');

    if (!seletedcategory) {
      setCatError('Please select a category for this event');
      return;
    }
    if (
      startDate.toLocaleDateString() ===
      new Date(1598051730000).toLocaleDateString()
    ) {
      console.log(new Date(1598051730000).toLocaleDateString());
      console.log(startDate.toLocaleDateString());
      setError('Check your date field and make sure all fields are provided');
      return;
    }

    if (
      endDate.toLocaleDateString() ===
      new Date(1598051730000).toLocaleDateString()
    ) {
      setError('Check your date field and make sure all fields are provided');
      return;
    }

    if (
      startTime.toLocaleTimeString() ===
      new Date(15980988770000).toLocaleTimeString()
    ) {
      setError('Check your time field and ensure all fields are provided');
      return;
    }
    if (
      endTime.toLocaleTimeString() ===
      new Date(15980988770000).toLocaleTimeString()
    ) {
      setError('Check your time field and ensure all fields are provided');
      return;
    }

    let Uri = image?.uri;
    let fileName = Uri?.split('/').pop();

    // @ts-ignore */
    let match: RegExpExecArray | null = /\.(\w+)$/.exec(fileName);
    let type = match ? `image/${match[1]}` : `image`;
    const start_date = moment(startDate).format('YYYY-MM-DD');
    const end_date = moment(endDate).format('YYYY-MM-DD');
    const start_time = startTime?.toLocaleTimeString();
    const end_time = endTime?.toLocaleTimeString();
    const jsonValue = await AsyncStorage.getItem('naemeUser');
    const tokens: TokensType = jsonValue != null ? JSON.parse(jsonValue) : null;
    const access = JSON.parse(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg1NjE4ODc1LCJpYXQiOjE2ODUwMTQwNzUsImp0aSI6ImIyNGJkNjY1YmFiYzRkNDI5YzExMjQ3YjIyNGFlYzFlIiwidXNlcl9pZCI6Ijk5MmQ0OGYzLWI1YTQtNDE2OS05YjdmLWNiZDEzNDczZTgwMSJ9.AiA8WD1Gio6WuySZy4f3B6EHm7cxpkYmh2ABrukQ38k',
    );

    console.log({start_date, end_time});
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', {
      name: fileName,
      type: type,
      uri: Platform.OS === 'ios' ? Uri?.replace('file://', '') : Uri,
      size: image?.size,
    });
    formData.append('category', seletedcategory);
    formData.append('country', data.country);
    formData.append('state', data.state);
    formData.append('city', data.city);
    formData.append('venue', data.venue);
    formData.append('start_date', start_date);
    formData.append('end_date', end_date);
    formData.append('start_time', start_time);
    formData.append('end_time', end_time);
    formData.append('website', data.website);
    formData.append('owner', user?.id);
    formData.append('organizer', user.name);
    formData.append('terms', data.terms);

    const url = `${BaseUrl}/events/`;
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${access}`,
      },
      body: formData,
    };
    try {
      setLoading(true);
      const response = await fetch(url, requestOptions);
      const data: EventDataTypes = await response.json();
      console.log(response);
      if (response.status === 201) {
        const jsonValue = JSON.stringify(data.id);
        AsyncStorage.setItem('eventId', jsonValue);
        navigation.navigate('CreateTicket');
        setLoading(false);
      }
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCategories();
      reset();
      setImage(null);
    });
    return unsubscribe;
  }, [navigation]);

  function errorChecker(e: any) {
    console.log({e});
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable
        onPress={() => {
          setShowEndTime(false);
          setShowStartTime(false);
          setShowStartDate(false);
          setShowEndDate(false);
        }}
        className="flex-1 pb-32 px-6 bg-white">
        <StatusBar animated={true} barStyle="dark-content" />
        <SafeAreaView className={Platform.OS === 'ios' ? 'mt-10' : 'mt-7'}>
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              className="p-2 bg-white rounded-3xl"
              onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={22} color="#181818" />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
              }}
              className="text-xl text-[#1CAE81]">
              Create Event
            </Text>
            <View />
          </View>
        </SafeAreaView>
        <View className="mt-7">
          {/* title */}
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="mb-2 text-sm">
            Title
          </Text>
          <Animated.View
            style={[{opacity}]}
            className="bg-gray-100 rounded-lg px-3">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  className=" text-gray-500 py-2 text-xs"
                  onBlur={onBlur}
                  style={{
                    fontFamily: 'Montserrat-Regular',
                  }}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Event title"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="title"
            />
          </Animated.View>
          {errors.title && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}

          {/* Category */}
          <Animated.View style={[{opacity}]} className="">
            <Text
              className="my-2 mt-4 text-[#3A3F58] text-[14px]"
              style={{
                fontFamily: 'Montserrat-Bold',
              }}>
              Choose event categrory
            </Text>

            <Dropdown
              style={[styles.dropdown]}
              selectedTextStyle={styles.selectedTextStyle}
              data={category}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Event Category"
              onChange={item => {
                setSeletedCategory(item.label);
              }}
            />
          </Animated.View>
          {catError && (
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
              }}
              className="text-rose-500 mt-2">
              {catError}
            </Text>
          )}

          {/* location */}
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="my-1 mt-2 text-sm">
            Venue
          </Text>
          <Animated.View
            style={[{opacity}]}
            className="bg-gray-100 rounded-lg my-2 px-3">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  className="text-gray-500 text-xs"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={{
                    fontFamily: 'Montserrat-Regular',
                  }}
                  value={value}
                  textContentType="location"
                  placeholder="Your event location"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="venue"
            />
          </Animated.View>
          {errors.venue && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}

          {/* country */}

          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="my-1 mt-2 text-sm">
            Country
          </Text>
          <Animated.View
            style={[{opacity}]}
            className="bg-gray-100 rounded-lg my-2 px-3">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  className="text-gray-500 text-xs"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textContentType="location"
                  style={{
                    fontFamily: 'Montserrat-Regular',
                  }}
                  autoComplete="postal-address-country"
                  placeholder="Country"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="country"
            />
          </Animated.View>
          {errors.country && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}

          {/* state */}
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="my-1 mt-2 text-sm">
            State
          </Text>
          <Animated.View
            style={[{opacity}]}
            className="bg-gray-100 rounded-lg my-2 px-3">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  className="text-gray-500 text-xs"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textContentType="location"
                  style={{
                    fontFamily: 'Montserrat-Regular',
                  }}
                  autoComplete="postal-address-country"
                  placeholder="State"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="state"
            />
          </Animated.View>
          {errors.state && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}

          {/* city */}

          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="my-1 mt-2 text-sm">
            City
          </Text>
          <Animated.View
            style={[{opacity}]}
            className="bg-gray-100 rounded-lg my-2 px-3">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  className="text-gray-500 text-xs"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textContentType="location"
                  autoComplete="postal-address-country"
                  placeholder="City"
                  style={{
                    fontFamily: 'Montserrat-Regular',
                  }}
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="city"
            />
          </Animated.View>
          {errors.city && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}

          {/* description  */}

          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="my-1 text-sm">
            Description
          </Text>
          <Animated.View
            style={[{opacity}]}
            className="bg-gray-100 px-3 rounded-lg my-2">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  className="text-gray-500 text-xs"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    fontFamily: 'Montserrat-Regular',
                  }}
                  placeholder="Description"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="description"
            />
          </Animated.View>
          {errors.description && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="my-1 text-sm">
            Link
          </Text>
          <Animated.View
            style={[{opacity}]}
            className="bg-gray-100 px-4 rounded-lg my-2">
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  className="text-gray-500 text-xs"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textContentType="URL"
                  style={{
                    fontFamily: 'Montserrat-Regular',
                  }}
                  keyboardType="url"
                  placeholder="Provide link to your website or social media page"
                  placeholderTextColor={'#9d9c9d'}
                />
              )}
              name="website"
            />
          </Animated.View>
          {errors.website && (
            <Text className="text-rose-400 text-xs">This is required.</Text>
          )}

          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="my-3 mt-5 text-sm">
            Date and Time
          </Text>
          <Animated.View style={[{opacity}]} className="my-5 flex-row gap-x-4">
            <TouchableOpacity
              onPress={() => setShowStartDate(!showStartDate)}
              className="px-4  bg-gray-100 rounded-lg flex-1">
              <View className="flex-row items-center justify-between">
                <Text
                  style={{
                    fontFamily: 'Montserrat-Medium',
                  }}
                  className="text-xs py-3 text-gray-500">
                  {formatDate(startDate) === 'August 22, 2020'
                    ? 'Select start date'
                    : formatDate(startDate)}
                </Text>

                {showStartDate && Platform.OS === 'ios' && (
                  <AntDesign
                    name="close"
                    className=""
                    size={16}
                    color="#9f9e9e"
                    onPress={() => setShowStartDate(false)}
                  />
                )}
              </View>
              {showStartDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  value={startDate}
                  mode={'date'}
                  themeVariant="light"
                  onChange={onStartDateChange}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowEndDate(!showEndDate)}
              className="px-4  bg-gray-100 rounded-lg flex-1">
              <View className="flex-row items-center justify-between">
                <Text
                  style={{
                    fontFamily: 'Montserrat-Medium',
                  }}
                  className="text-xs py-3 text-gray-500">
                  {formatDate(endDate) === 'August 22, 2020'
                    ? 'Select end date'
                    : formatDate(endDate)}
                </Text>

                {showEndDate && Platform.OS === 'ios' && (
                  <AntDesign
                    name="close"
                    className=""
                    size={16}
                    color="#9f9e9e"
                    onPress={() => setShowEndDate(false)}
                  />
                )}
              </View>
              {showEndDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  value={endDate}
                  mode={'date'}
                  themeVariant="light"
                  onChange={onEndDateChange}
                />
              )}
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[{opacity}]} className="mb-5 flex-row gap-x-4">
            <TouchableOpacity
              onPress={() => {
                setShowStartTime(true);
                setShowEndTime(false);
                setShowStartDate(false);
                setShowEndDate(false);
              }}
              className={`bg-gray-100 px-4 py-3 flex-1 justify-center rounded-lg ${
                showStartTime && 'h-14'
              }`}>
              <View className="flex-row items-center justify-between">
                <Text
                  style={{
                    fontFamily: 'Montserrat-Medium',
                  }}
                  className="text-xs text-gray-500">
                  {formatTime(startTime) === '4:32 AM'
                    ? 'Start Time'
                    : formatTime(startTime)}
                </Text>

                {showStartTime && Platform.OS === 'ios' && (
                  <AntDesign
                    name="close"
                    className=""
                    size={16}
                    color="#9f9e9e"
                    onPress={() => setShowStartTime(false)}
                  />
                )}
              </View>
              {showStartTime && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startTime}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  themeVariant="light"
                  mode={'time'}
                  is24Hour={false}
                  onChange={onStartTimeChange}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowEndTime(true);
                setShowStartTime(false);
                setShowStartDate(false);
              }}
              className={`bg-gray-100 px-3 py-3 flex-1 justify-center rounded-lg ${
                showEndDate && 'h-14'
              }`}>
              <View className="flex-row items-center justify-between">
                <Text
                  style={{
                    fontFamily: 'Montserrat-Medium',
                  }}
                  className="text-xs text-gray-500">
                  {formatTime(endTime) === '4:32 AM'
                    ? 'End Time'
                    : formatTime(endTime)}
                </Text>

                {showEndTime && Platform.OS === 'ios' && (
                  <AntDesign
                    name="close"
                    className=""
                    size={16}
                    color="#9f9e9e"
                    onPress={() => setShowEndTime(false)}
                  />
                )}
              </View>
              {showEndTime && (
                <DateTimePicker
                  testID="dateTimePicker"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  themeVariant="light"
                  value={endTime}
                  mode={'time'}
                  is24Hour={false}
                  onChange={onEndTimeChange}
                />
              )}
            </TouchableOpacity>
          </Animated.View>
          {error && (
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
              }}
              className="text-rose-500">
              {error}
            </Text>
          )}

          {/* image */}

          <Animated.View style={[{opacity}]} className="h-[300px] mt-4">
            {image && (
              <Animated.View style={[{opacity: imageOpacity}]}>
                <Image
                  source={{uri: image.uri}}
                  className="h-full w-full rounded-2xl"
                  resizeMode="cover"
                  fadeDuration={2.4}
                />
                <TouchableOpacity
                  onPress={pickImage}
                  className="absolute bg-gray-400 p-2 rounded-full right-3 top-3">
                  <AntDesign name="edit" size={26} color="black" />
                </TouchableOpacity>
              </Animated.View>
            )}
            {!image && (
              <TouchableOpacity
                onPress={pickImage}
                className="items-center justify-center">
                <Ionicons name="image" size={54} />
                <Text
                  style={{
                    fontFamily: 'Montserrat-Medium',
                  }}
                  className="text-center">
                  Upload event image
                </Text>
                {isSubmitted && image === null && (
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                    }}
                    className="mt-2 text-center text-rose-500 w-2/4 text-xs">
                    Note! more people respond to events with a banner; Required
                  </Text>
                )}
              </TouchableOpacity>
            )}
            <View className="flex-row mt-12 items-center justify-center">
              <TouchableOpacity
                // onPress={() => navigation.navigate('CreateTicket')}
                onPress={handleSubmit(onSubmit, errorChecker)}
                className={
                  image === null
                    ? 'bg-[#c7c6c6] rounded-xl'
                    : 'bg-[#000] rounded-xl'
                }>
                {loading ? (
                  <ActivityIndicator size={'small'} className="p-3 px-20" />
                ) : (
                  <Text
                    className={
                      image === null
                        ? 'px-14 py-4 text-gray-100'
                        : 'px-14 py-4 text-rose-300'
                    }
                    style={{
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    Create Event
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 54,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 12,
  },

  placeholderStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  selectedTextStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
});
