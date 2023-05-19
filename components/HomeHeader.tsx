import {View, Platform} from 'react-native';
import Search from './Search';
import {StyleSheet} from 'react-native';

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
      } pb-2 px-5 overflow-x-hidden border-b border-gray-300 mt-4`}>
      <View className="flex-row justify-between items-start">
        <Search />
      </View>
    </View>
  );
}
