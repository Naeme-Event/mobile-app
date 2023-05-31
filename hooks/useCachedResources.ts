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
