import * as React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import {RootDrawerScreenProps, RootStackScreenProps} from '../types/types';

export default function App({
  navigation,
  route,
}: RootDrawerScreenProps<'Scan'>) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.front;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    device != null &&
    hasPermission && (
      <View className="flex-1 px-5 bg-gray-100 items-center">
        <Text
          className="mt-[30%] text-lg text-center text-black"
          style={{
            fontFamily: 'Montserrat-Black',
          }}>
          Scan and validate tickets for your events
        </Text>
        <View className="w-[270px] h-[250px] mt-[30%] border-emerald-500 border-[5px] rounded-xl">
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
        </View>

        <TouchableOpacity
          onPress={() => setIsActive(!isActive)}
          className="bg-black px-10 py-3 mt-7 rounded-lg">
          <Text
            style={{
              fontFamily: 'Montserrat-Black',
            }}
            className="text-white">
            {isActive ? 'Stop Scan' : ' Click to Scan'}
          </Text>
        </TouchableOpacity>

        {barcodes?.map((barcode, idx) => (
          <Text key={idx} style={styles.barcodeTextURL}>
            {barcode.displayValue}
          </Text>
        ))}
        {/* 
// @ts-ignore */}
        <Header navigation={navigation} route={route} />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
