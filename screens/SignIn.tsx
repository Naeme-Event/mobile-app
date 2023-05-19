import {StatusBar, Text} from 'react-native';
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  // Text,
} from 'react-native';

export default function SignIn({}) {
  // const { googleAuth } = useAuthContext();

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
          // onPress={() => googleAuth()}
          className="px-10 py-4 bg-[#000] rounded-md">
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
            }}
            className="text-sm text-gray-100 text-center">
            Continue with google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
