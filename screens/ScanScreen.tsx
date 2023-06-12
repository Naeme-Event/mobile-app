import * as React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {HeaderTitle} from '../components/Header';
import {RootDrawerScreenProps} from '../types/types';
import api from '../api';

export default function ScanScreen({
  navigation,
  route,
}: RootDrawerScreenProps<'Scan'>) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: false,
  });

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    const result = barcodes[0]?.content.data;
    if (result) {
      setIsActive(false);
      (async () => {
        try {
          const respose = await api.get(
            `https://naeme-backend.vercel.app/api/my-tickets/${result}`,
          );
          const data = await respose.data;
          navigation.navigate('MyTicketDetail', {...data});
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [barcodes]);

  return (
    <View className="flex-1 px-5 bg-gray-100 items-center">
      <Text
        className="mt-[30%] text-lg text-center text-black"
        style={{
          fontFamily: 'Montserrat-Black',
        }}>
        Scan and validate tickets for your events
      </Text>
      {device != null && hasPermission && (
        <View className="w-[270px] h-[250px] mt-[30%] border-emerald-500 border-[5px] rounded-xl">
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
        </View>
      )}

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

      {/* 
// @ts-ignore */}
      <HeaderTitle navigation={navigation} route={route} title="Scan Tickets" />
    </View>
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
