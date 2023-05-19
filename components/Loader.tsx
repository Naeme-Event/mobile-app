import {ActivityIndicator, View} from 'react-native';
import Text from './Text';

export const Loader = ({isLoading}: {isLoading: boolean}) => {
  return isLoading ? (
    <View className="mx-7 my-7 justify-center items-center">
      <ActivityIndicator size="large" color="#aaa" animating />
    </View>
  ) : null;
};

type Props = {isLoading: boolean; title: string};

export const MyEventLoaderScreen = ({isLoading, title}: Props) => {
  return isLoading ? (
    <View className="mx-7 my-7 justify-center items-center">
      <ActivityIndicator size="large" color="#ffffff" animating />
    </View>
  ) : (
    <View className="mx-4 mt-7">
      <Text className="font-bold text-xl">You have no {title} yet</Text>
    </View>
  );
};
