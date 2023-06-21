import {
  FlatList,
  RefreshControl,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import NotFound from '../components/Empty';
import EventCard from '../components/EventCard';
import FeaturedEvent from '../components/FeaturedEvent';
import HomeHeader from '../components/HomeHeader';
import {Header} from '../components/Header';
import {Loader} from '../components/Loader';
import {RootDrawerScreenProps, TabScreenProps} from '../types/types';
import {useEventContext} from '../hooks/useEvent';
import {Skeleton} from '@rneui/themed';

const HomeScreen = ({navigation, route}: RootDrawerScreenProps<'Home'>) => {
  const {
    eventData,
    loadingMore,
    loadMoreItem,
    refresh,
    handleRefresh,
    searching,
  } = useEventContext();

  const {loading} = useEventContext();
  console.log({loading});

  return (
    <View className="bg-gray-100">
      <StatusBar barStyle={'dark-content'} backgroundColor={'#e5e7eb'} />
      <FlatList
        contentContainerStyle={{paddingBottom: 200}}
        data={eventData}
        renderItem={({item}) => (
          <View>
            {loading ? (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{paddingVertical: 20}}
                className="gap-6 p-6">
                {[1, 2, 3].map((i, index) => (
                  <View key={index}>
                    <Skeleton
                      animation="pulse"
                      height={200}
                      style={{
                        backgroundColor: '#ddd',
                        borderRadius: 14,
                        width: '100%',
                        marginTop: -40,
                      }}
                      skeletonStyle={{
                        backgroundColor: '#eee',
                        borderRadius: 14,
                      }}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <>{!item.featured && <EventCard {...item} />}</>
            )}
          </View>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <HomeHeader />
            {!searching && <FeaturedEvent />}
          </View>
        )}
        ListFooterComponent={<Loader isLoading={loadingMore} />}
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
