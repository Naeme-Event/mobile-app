import {View, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootDrawerScreenProps} from '../types/types';
import Search from './Search';
import Entypo from 'react-native-vector-icons/Entypo';

const Header = ({navigation, route}: RootDrawerScreenProps<'Home'>) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      }}
      className="px-4 py-2 justify-center absolute top-0 right-0 left-0 z-10">
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          className="rounded-full bg-white drop-shadow-2xl h-10 w-10 items-center justify-center">
          <Image source={require('../assets/images/menu.png')} />
        </TouchableOpacity>
        {route?.name == 'Home' && <Search />}
        {route?.name == 'Home' && (
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateEvent')}
            className="rounded-full relative bg-white shadow-xl h-10 w-10 items-center justify-center">
            <Entypo name="plus" size={22} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
