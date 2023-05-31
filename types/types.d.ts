/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {EventDataTypes, PaidTicketDataTypes, User} from './typings';

export type AuthRootStackParamList = {
  SignIn: undefined;
};

export type RootDrawerParamList = {
  Home: undefined;
  User: undefined;
  Ticket: undefined;
  Scan: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<RootDrawerParamList> | undefined;
  Auth: NavigatorScreenParams<AuthRootStackParamList> | undefined;
  Detail: EventDataTypes;
  EditEventModal: EventDataTypes;
  PaymentModal: undefined;
  CreateEvent: undefined;
  Terms: undefined;
  CreateTicket: {
    eventId?: string;
  };
  TicketCart: EventDataTypes;
  MyTicketDetail: PaidTicketDataTypes;
};

export type AuthStackScreenProps<Screen extends keyof AuthRootStackParamList> =
  NativeStackScreenProps<AuthRootStackParamList, Screen>;

export type RootStackScreenProp<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type TabScreenProps<T extends keyof RootDrawerParamList> = {
  navigation: NativeStackNavigationProp<RootDrawerParamList, T>;
  route: RouteProp<RootDrawerParamList, T>;
};

export type RootTabScreenProps<Screen extends keyof RootDrawerParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootDrawerParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type RootDrawerScreenProps<Screen extends keyof RootDrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<RootDrawerParamList, Screen>,
    NativeStackScreenProps<RootDrawerParamList>
  >;
