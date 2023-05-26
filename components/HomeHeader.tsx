import {View, Platform} from 'react-native';
import {Text} from 'react-native-paper';

interface StyleProps {
  headerStyle: string;
  locationStyle: string;
}

export default function HomeHeader() {
  return (
    <View>
      <Header headerStyle="text-lg" locationStyle="text-black ml-1" />
    </View>
  );
}

export function Header({headerStyle, locationStyle}: StyleProps) {
  return (
    <View
      className={`${
        Platform.OS === 'ios' ? 'pt-10' : 'pt-5'
      } pb-2 px-5 overflow-x-hidden border-b border-[#eee] mt-14`}>
      <View className="flex-row justify-between items-start">
        <View className="flex-row mb-1 items-start">
          <Text
            style={{fontFamily: 'Montserrat-Black'}}
            className="text-[26px] text-gray-900">
            Discover Amazing Events Happening Now!
          </Text>
        </View>
      </View>
    </View>
  );
}
