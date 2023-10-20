/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../constants';
import {SignIn} from '../screens';
import DashboardNavigator from './DashboardNavigator';

const Stack = createStackNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SIGN_IN}
      screenOptions={{
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Stack.Screen
        name={ROUTES.SIGN_IN}
        component={SignIn}
        options={{headerShown: false, cardStyleInterpolator: forFade}}
      />
      <Stack.Screen
        name={ROUTES.DASHBOARD}
        component={DashboardNavigator}
        options={{headerShown: false, cardStyleInterpolator: forFade}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
