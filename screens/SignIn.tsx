import React, {useState} from 'react';
import {StatusBar, Text} from 'react-native';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  // Text,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {setUser} from '../redux-toolkit/authSlice';
import {dummyUser} from '../config';
import {useAppDispatch} from '../redux-toolkit/hook';
import {UserType} from '../types/typings';
import {ActivityIndicator} from 'react-native-paper';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn({}) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      if (idToken) {
        await GoogleSignin.clearCachedAccessToken(idToken);
        await api
          .post('/account/google/', {
            auth_token: idToken,
          })
          .then(res => {
            const data = res.data;
            const user: UserType = {
              email: data?.email,
              id: data?.id,
              username: data.username,
              image: data.image,
            };
            AsyncStorage.setItem('@tokens', JSON.stringify(data.tokens));
            dispatch(setUser(user));
            setLoading(false);
            return;
          })
          .catch(e => {
            console.log(e.message);
            setLoading(false);
          });
      }
    } catch (error) {
      console.log('Error signing in:', error);
      if (error.code == statusCodes.IN_PROGRESS) {
        console.log('sign in progress');
      } else if (error.code == statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play service not available');
      } else if (error.code == statusCodes.SIGN_IN_CANCELLED) {
        console.log('sign in cancelled');
      }
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="bg-gray-100 pt-10 h-full w-full items-center">
      <StatusBar barStyle={'dark-content'} backgroundColor={'#f4f4f4'} />
      <View className="w-full px-7">
        <Text
          style={{
            fontFamily: 'Montserrat-Black',
          }}
          className="text-6xl text-start text-black pt-10">
          Book Your Tickets Seamlessly
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
          }}
          className="text-start text-gray-500 text-xl mt-4">
          Effortlessly discover amazing events happening around you.
        </Text>
      </View>

      <View className="items-center absolute bottom-20">
        <TouchableOpacity
          onPress={handleSignIn}
          className="px-10 py-4 bg-[#000] rounded-md">
          {loading ? (
            <ActivityIndicator className="px-16" color="#ffffff" />
          ) : (
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
              }}
              className="text-sm text-gray-100 text-center">
              Continue with google
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
