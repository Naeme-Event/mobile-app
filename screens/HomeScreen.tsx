import {
  FlatList,
  Platform,
  RefreshControl,
  Image,
  View,
  StatusBar,
} from 'react-native';
import NotFound from '../components/Empty';
import EventCard from '../components/EventCard';
import FeaturedEvent from '../components/FeaturedEvent';
import HomeHeader from '../components/HomeHeader';
import Header from '../components/Header';
import {Loader} from '../components/Loader';
import Search from '../components/Search';
import {RootDrawerScreenProps, TabScreenProps} from '../types/types';
import {useEventContext} from '../hooks/useEvent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation, route}: RootDrawerScreenProps<'Home'>) => {
  const {eventData, loading, loadMoreItem, refresh, handleRefresh, searching} =
    useEventContext();

  return (
    <View className="bg-gray-100">
      <StatusBar barStyle={'dark-content'} backgroundColor={'#e5e7eb'} />
      <FlatList
        contentContainerStyle={{paddingBottom: 200}}
        data={eventData}
        renderItem={({item}) => {
          return <EventCard {...item} />;
        }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <HomeHeader />
            {!searching && <FeaturedEvent />}
          </View>
        )}
        ListFooterComponent={<Loader isLoading={loading} />}
        ListEmptyComponent={() => (
          <View>
            {!loading && eventData?.length === 0 && <NotFound title="event" />}
          </View>
        )}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl
            tintColor={'#fff'}
            refreshing={refresh}
            onRefresh={handleRefresh}
          />
        }
      />

      <Header navigation={navigation} route={route} />
    </View>
  );
};
export default HomeScreen;
