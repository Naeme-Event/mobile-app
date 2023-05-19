import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import {TabScreenProps} from '../../types/types';

import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  PaidTicketDataTypes,
  PaidTicketResponseType,
  StringOrNull,
} from '../../types/typings';
import TicketCard from '../../components/TicketCard';
import {useIsFocused} from '@react-navigation/native';
import {BaseUrl, dummyUser} from '../../config';
import Text from '../../components/Text';

export default function TicketScreen({
  navigation,
  route,
}: TabScreenProps<'Ticket'>) {
  console.log(route.name);
  const user = dummyUser;
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

  const fetchTickets = async (url: StringOrNull) => {
    const response = await axios.get(`${BaseUrl}/my-tickets/?user=${url}`);
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
    <SafeAreaView className="bg-[#010001] flex-1 w-full">
      <View
        className={`px-4 ${
          Platform.OS === 'android' ? 'mt-[5%]' : 'mt-[10%]'
        }`}>
        <Text font="Montserrat-Bold" className="text-gray-100 mt-[9%] text-2xl">
          My Tickets
        </Text>
        {tickets.length > 1 && (
          <Text
            font="Montserrat-Bold"
            className="text-gray-100 text-start justify-center my-5 text-sm">
            Swipe right to see tickets
          </Text>
        )}
        {loading && <ActivityIndicator size={'large'} />}

        {!loading && tickets.length === 0 && (
          <Text
            font="Montserrat-Bold"
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
    </SafeAreaView>
  );
}