import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../config';

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

  const url = `${BaseUrl}/token/verify/`;
  const refreshUrl = `${BaseUrl}/token/refresh/`;
  const checkLoginCredentials = async () => {
    const jsonValue = await AsyncStorage.getItem('naemeUser');
    const tokens: TokensType = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log({tokens});
    if (tokens) {
      try {
        const verifyRequestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({token: tokens.access}),
        };

        console.log(tokens.access);
        const res = await fetch(url, verifyRequestOptions);
        if (res.ok) {
          return;
        } else {
          try {
            const refreshRequestOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({token: tokens.refresh}),
            };
            const res = await fetch(refreshUrl, refreshRequestOptions);
            if (res.ok) {
              const data = await res.json();
              const jsonValue = JSON.stringify(data);
              await AsyncStorage.setItem('naemeUser', jsonValue);
              return;
            } else {
              await AsyncStorage.removeItem('naemeUser');
              return null;
            }
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
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
