import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import NotFound from '../../components/Empty';
import EventCard from '../../components/EventCard';
import FeaturedEvent from '../../components/FeaturedEvent';
import HomeHeader from '../../components/HomeHeader';
import {Loader} from '../../components/Loader';
import Search from '../../components/Search';
import {TabScreenProps} from '../../types/types';
import {useEventContext} from '../../hooks/useEvent';

const HomeScreen = ({navigation, route}: TabScreenProps<'Home'>) => {
  const {eventData, loading, loadMoreItem, refresh, handleRefresh, searching} =
    useEventContext();

  return (
    <View className="bg-gray-200">
      <StatusBar barStyle={'dark-content'} backgroundColor={'#e5e7eb'} />
      <HomeHeader />
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
            {/* <Search /> */}
            <FeaturedEvent />
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

      <View className="absolute top-0 bottom-0 right-0 left-0 -z-10"></View>
    </View>
  );
};
export default HomeScreen;
