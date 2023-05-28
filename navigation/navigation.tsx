import useCachedResources from '../hooks/useCachedResources';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from '../screens/SplashScreen';
import RootNavigator from './RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {useAppDispatch} from '../redux-toolkit/hook';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {setUser} from '../redux-toolkit/authSlice';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokensType, UserType} from '../types/typings';
import api from '../api';

export default function Navigation() {
  const isLoadingComplete = useCachedResources();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile'], // Add any additional scopes you require
      webClientId:
        '919602408222-63uj948lf5qtj1vos519rfdr5v1osnc8.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);

  useEffect(() => {
    (async () => {
      const jsonValue = await AsyncStorage.getItem('@tokens');
      const tokens: TokensType =
        jsonValue != null ? JSON.parse(jsonValue) : null;
      try {
        const apiRes = await api.get('/account/user', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        const data = await apiRes.data;
        if (apiRes.status === 200) {
          const user: UserType = {
            email: data?.email,
            id: data?.id,
            username: data.username,
            image: data.image,
          };
          dispatch(setUser(user));
          setLoading(false);
        } else {
          dispatch(setUser(null));
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, []);

  if (!isLoadingComplete) {
    return (
      <SafeAreaProvider>
        <SplashScreen />
      </SafeAreaProvider>
    );
  }
  if (loading) {
    return (
      <SafeAreaProvider>
        <SplashScreen />
      </SafeAreaProvider>
    );
  }
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
