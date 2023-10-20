/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS, ROUTES} from '../constants';
import {View} from 'react-native';
import {
  Accepted,
  CompletedDetails,
  Dispatched,
  Home,
  Message,
  NewOrder,
  Notification,
  Profile,
} from '../screens';
import {LogoRedSvg} from '../assets';

const Stack = createStackNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

//default navigation option for home
const defaultNavOptionsForHome = {
  cardStyleInterpolator: forFade,
  headerTintColor: COLORS.white,
  headerBackTitle: 'Back',
  headerBackTitleVisible: false,
  headerShown: true,
  headerBackVisible: false,
  headerStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  gestureEnabled: false,
  headerLeft: () => null,
  headerTitle: () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}>
      <LogoRedSvg />
    </View>
  ),
};
//default navigation option
const defaultNavOptions = {
  cardStyleInterpolator: forFade,
  headerTintColor: COLORS.white,
  headerLayoutPreset: 'center',
  headerBackTitle: null,
  headerBackTitleVisible: false,
  headerShown: true,
  headerBackVisible: true,
  headerStyle: {
    backgroundColor: COLORS.black,
    elevation: 0,
  },
  gestureEnabled: false,
  headerTitle: () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}>
      <LogoRedSvg />
    </View>
  ),
};
//new deliver navigation option
const newDeliverNavOptions = {
  cardStyleInterpolator: forFade,
  headerTintColor: COLORS.white,
  headerLayoutPreset: 'center',
  headerBackTitle: null,
  headerBackTitleVisible: false,
  headerShown: true,
  headerBackVisible: true,
  headerStyle: {
    backgroundColor: COLORS.black,
    elevation: 0,
  },
  gestureEnabled: false,
  headerTitle: () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}>
      <LogoRedSvg />
    </View>
  ),
};

function DashboardNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Stack.Screen
        name={ROUTES.HOME}
        component={Home}
        options={defaultNavOptionsForHome}
      />
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={defaultNavOptions}
      />
      <Stack.Screen
        name={ROUTES.MESSAGE}
        component={Message}
        options={defaultNavOptions}
      />
      <Stack.Screen
        name={ROUTES.NOTIFICATION}
        component={Notification}
        options={defaultNavOptions}
      />
      <Stack.Screen
        name={ROUTES.NEW_ORDER}
        component={NewOrder}
        options={newDeliverNavOptions}
      />
      <Stack.Screen
        name={ROUTES.ACCEPTED}
        component={Accepted}
        options={newDeliverNavOptions}
      />
      <Stack.Screen
        name={ROUTES.DISPATCHED}
        component={Dispatched}
        options={newDeliverNavOptions}
      />
      <Stack.Screen
        name={ROUTES.COMPLETED_DETAIL}
        component={CompletedDetails}
        options={defaultNavOptions}
      />
    </Stack.Navigator>
  );
}

export default DashboardNavigator;
