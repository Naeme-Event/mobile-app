import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/*// @ts-ignore */

import Logo from '../assets/naeme.png';

const BGColor = '#000';

export default function AppSplashScreen() {
  // SafeArea Value...
  const edges = useSafeAreaInsets();
  // useEffect(() => {
  //   // Hide the splash screen after a delay
  // }, []);

  // Animation Values....
  const startAnimation = useRef(new Animated.Value(0)).current;

  // Scaling Down Both logo and Title...
  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;

  // Offset Animation....
  const moveLogo = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const moveTitle = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  // Animating COntent...
  const contentTransition = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  // Animation Done....
  useEffect(() => {
    // Starting Animation after 500ms....
    setTimeout(() => {
      // Parallel Animation...
      Animated.parallel([
        Animated.timing(startAnimation, {
          // For same Height for non safe Area Devices...
          toValue: -Dimensions.get('window').height + (edges.top + 65),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          toValue: 0.6,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          // Scaling to 0.8
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          // Moving to Right Most...
          toValue: {
            x: Dimensions.get('window').width / 2 - 35,
            y: Dimensions.get('window').height / 2 - 5,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          // Moving to Right Most...
          toValue: {
            x: 0,
            // Since image size is 100...
            y: Dimensions.get('window').height / 2 - 90,
          },
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }, 200);
  }, []);

  // Going to Move Up like Nav Bar...
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: BGColor,
          zIndex: 1,
        }}>
        <Animated.View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animated.Image
            source={Logo}
            style={{
              width: 180,
              height: 30,
              marginBottom: 20,
              transform: [{translateY: moveTitle.y}, {scale: scaleLogo}],
            }}></Animated.Image>
          <Animated.View className="flex-row items-center">
            <Animated.Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white',
                transform: [{translateY: moveTitle.y}, {scale: scaleLogo}],
              }}>
              Welcome
            </Animated.Text>
            <Animated.View
              style={{
                transform: [{translateY: moveTitle.y}, {scale: scaleLogo}],
              }}>
              <ActivityIndicator
                className="-ml-4"
                size={'small'}
                color="#eee"
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.04)',
          zIndex: 0,
          transform: [{translateY: contentTransition}],
        }}></Animated.View>
    </View>
  );
}
