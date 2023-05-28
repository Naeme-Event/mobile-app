import {
  View,
  Text,
  Image,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux-toolkit/hook';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../redux-toolkit/authSlice';

const AppDrawer = (props: DrawerContentComponentProps) => {
  const user = useAppSelector(state => state.users.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function logoutFunction() {
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('@tokens');
    dispatch(setUser(null));
  }
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: 20,
          backgroundColor: 'transparent',
          flex: 1,
        }}>
        <View className="flex-row mb-9 px-6">
          <TouchableOpacity
            onPress={() => props.navigation.closeDrawer()}
            className="p-1 rounded-full bg-[#eee]">
            <MaterialCommunityIcons
              name="arrow-left-thin"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View className="px-6 flex-row items-center justify-start">
          <Image
            source={{uri: user?.image}}
            className="h-[69px] w-[69px] rounded-full drop-shadow-xl mr-4"
          />
          <View className="">
            <Text
              style={{
                fontFamily: 'Montserrat-Black',
              }}
              className="text-[20px] my-2">
              {user?.username}
            </Text>
          </View>
        </View>
        <View className="flex-1 mt-10">
          <DrawerItemList {...props} />
        </View>
        <View
          className={` ${
            Platform.OS === 'android' ? 'bottom-[3%]' : 'bottom-[5%]'
          } right-10 left-10 absolute`}>
          <TouchableOpacity
            className="py-4 bg-gray-300 rounded-full "
            style={{backgroundColor: '#D9D9D9'}}
            onPress={logoutFunction}>
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text
                style={{
                  fontFamily: 'Montserrat-Black',
                }}
                className="text-center text-lg">
                Logout
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default AppDrawer;
