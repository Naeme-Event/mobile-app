import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../config';
import api from '../api';

type Fonts = {
  'Montserrat-Bold': string;
  'montserrat-medium': string;
  'montserrat-regular': string;
  'montserrat-semibold': string;
};

export interface TokensType {
  access: string;
  refresh: string;
}
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const url = '/token/verify/';
  const refreshUrl = `/token/refresh/`;
  const checkLoginCredentials = async () => {
    const jsonValue = await AsyncStorage.getItem('@tokens');
    const tokens: TokensType = jsonValue != null ? JSON.parse(jsonValue) : null;
    if (tokens) {
      try {
        const res = await api.post(
          url,
          {
            token: tokens.access,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (res.status == 200) {
          return;
        } else {
          await AsyncStorage.removeItem('@tokens');
        }
        return;
      } catch (e) {
        console.log('-------', e);
      }
    }

    return;
  };

  useEffect(() => {
    (async () => {
      try {
        // SplashScreen.preventAutoHideAsync();
        await checkLoginCredentials();
      } catch (e) {
        throw e;
      } finally {
        setLoadingComplete(true);
        // SplashScreen.hideAsync();
      }
    })();
  }, []);

  return {isLoadingComplete};
}
