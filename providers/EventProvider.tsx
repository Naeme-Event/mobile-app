import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
interface EventCartContextType {
  loading: boolean;
  loadingMore: boolean;
  setLoadingMore: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading(value: boolean): void;
  setNextPage: React.Dispatch<React.SetStateAction<string | null>>;
  nextPage: string | null;
  eventData: EventDataTypes[] | undefined;
  setEventData: React.Dispatch<
    React.SetStateAction<EventDataTypes[] | undefined>
  >;
  fetchData: (url: any) => Promise<void>;
  fetchInitialData: (url: any) => Promise<void>;
  loadMoreItem: () => void;
  handleRefresh: () => void;
  refresh: boolean;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setTextState: React.Dispatch<React.SetStateAction<string>>;
  textState: string;
  location: LocationType;
  like: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
  featuredEvent: EventDataTypes[];
  setFeaturedEvent: React.Dispatch<React.SetStateAction<EventDataTypes[]>>;
  searching: boolean;
}

type LocationType = {
  country: string | null;
  city: string | null;
};

export const EventContext = createContext({} as EventCartContextType);

import {EventDataTypes, ResponseType} from '../types/typings';
import api from '../api';

export default function EventProvider({children}: {children: ReactNode}) {
  const [featuredEvent, setFeaturedEvent] = useState<EventDataTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [eventData, setEventData] = useState<EventDataTypes[]>();
  const [refresh, setRefresh] = useState(true);
  const [searching, setSearching] = useState<boolean>(false);
  const [textState, setTextState] = useState('');
  const [prevPage, setPreviousPage] = useState<string | null>(null);
  const [like, setLike] = useState(true);
  const [location, setLocation] = useState<LocationType>({
    city: null,
    country: null,
  });

  const loadMoreItem = () => {
    setLoadingMore(true);
    if (searching === false) {
      if (!!nextPage) {
        loadMore();
      } else {
        setLoadingMore(false);
      }
    } else {
      setLoadingMore(false);
    }
  };

  const loadMore = async () => {
    try {
      if (nextPage !== prevPage) {
        const response = await fetch(`${nextPage}`);
        const data: ResponseType = await response.json();
        if (eventData?.length! < data?.count!) {
          setEventData([...eventData!, ...data?.results]);
        }
        setPreviousPage(data.previous);
        setNextPage(data?.next);
        setLoadingMore(false);
      }
    } catch (e) {
      setLoadingMore(false);
      console.log('LoadMore Error: ', e);
    }
  };

  const Url = '/events';

  const fetchData = useCallback(
    async (url: any) => {
      setLoading(true);
      try {
        setSearching(false);
        const response = await api.get(url);
        const data: ResponseType = await response.data;
        if (data.next !== null) {
          setNextPage(data?.next);
        }
        setPreviousPage(data.previous);
        setRefresh(false);
        setEventData(data?.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    },
    [eventData],
  );

  const fetchInitialData = async (url: any) => {
    setLoading(true);
    try {
      setSearching(false);
      const response = await api.get(url);
      const data: ResponseType = await response.data;
      if (data.next !== null) {
        setNextPage(data?.next);
      }
      setPreviousPage(data.previous);
      setRefresh(false);
      setEventData(data?.results);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    setSearching(false);
    fetchData(Url);
  };

  useEffect(() => {
    fetchData(Url);
  }, []);

  return (
    <EventContext.Provider
      value={{
        location,
        loading,
        setLoading,
        eventData,
        setEventData,
        fetchInitialData,
        fetchData,
        nextPage,
        setNextPage,
        loadMoreItem,
        refresh,
        handleRefresh,
        setSearching,
        searching,
        setTextState,
        textState,
        like,
        setLike,
        setFeaturedEvent,
        featuredEvent,
        loadingMore,
        setLoadingMore,
      }}>
      {children}
    </EventContext.Provider>
  );
}
