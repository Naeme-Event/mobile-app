import {NavigationContainer} from '@react-navigation/native';

import {RootNavigator} from './RootNavigation';
import useCachedResources from '../hooks/useCachedResources';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from '../screens/SplashScreen';

export default function Navigation() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return (
      <SafeAreaProvider>
        <SplashScreen />
      </SafeAreaProvider>
    );
  }
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
