import {View, Text} from 'react-native';
import React from 'react';
import {RootStackScreenProps} from '../types/types';
import Header from '../components/Header';

const Terms = ({navigation, route}: RootStackScreenProps<'Terms'>) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text
        style={{
          fontFamily: 'Montserrat-Black',
        }}
        className="text-2xl">
        Naeme Events Terms and Conditions of Use
      </Text>
      {/* 
          // @ts-ignore */}
      {/* <Header navigation={navigation} route={route} /> */}
    </View>
  );
};

export default Terms;
