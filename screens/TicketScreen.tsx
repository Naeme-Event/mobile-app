import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {dummyUser} from '../config';
import {useState, useEffect} from 'react';
import {PaidTicketDataTypes, PaidTicketResponseType} from '../types/typings';
import {RootDrawerScreenProps, TabScreenProps} from '../types/types';
import {useIsFocused} from '@react-navigation/native';
import api from '../api';
import {Text} from 'react-native-paper';
import TicketCard from '../components/TicketCard';
import {useAppSelector} from '../redux-toolkit/hook';
import Header from '../components/Header';

export default function TicketScreen({
  navigation,
  route,
}: RootDrawerScreenProps<'Ticket'>) {
  const user = useAppSelector(state => state.users.user);
  const [tickets, setTickets] = useState<PaidTicketDataTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const isFocused = useIsFocused();

  const handleRefresh = async () => {
    setLoading(true);
    const data = await fetchTickets(user?.id);
    setTickets(data);
    setLoading(false);
  };

  const fetchTickets = async (url: string | undefined) => {
    const response = await api.get(`/my-tickets/?user=${url}`);
    const data: PaidTicketResponseType = await response.data;
    setLoading(false);
    return data?.results;
  };

  useEffect(() => {
    try {
      (async () => {
        setLoading(true);
        const data = await fetchTickets(user?.id);
        setTickets(data);
        setRefresh(false);
        setLoading(false);
      })();
    } catch (e) {
      e;
    }
    setRefresh(false);
  }, [isFocused]);

  return (
    <SafeAreaView className="bg-gray-100 flex-1 w-full">
      <View
        className={`px-6 ${
          Platform.OS === 'android' ? 'mt-[5%]' : 'mt-[10%]'
        }`}>
        <View className="flex-row mb-10 justify-between mt-[20%]">
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="text-gray-900  text-xl">
            My Tickets
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.naeme.app/dashboard')}
            className="">
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
              }}
              className="text-sm text-gray-900">
              View Dashboard
            </Text>
          </TouchableOpacity>
        </View>
        {tickets.length > 1 && (
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="text-gray-700 text-center justify-center my-5 text-sm">
            Swipe right to see tickets
          </Text>
        )}
        {loading && <ActivityIndicator size={'large'} />}

        {!loading && tickets.length === 0 && (
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
            }}
            className="text-gray-100 text-center justify-center mt-52 text-lg">
            You dont have any ticket yet
          </Text>
        )}
        <FlatList
          data={tickets}
          renderItem={({item}): JSX.Element => {
            return <TicketCard item={item} />;
          }}
          keyExtractor={({id}) => id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }
        />
      </View>
      <Header navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
