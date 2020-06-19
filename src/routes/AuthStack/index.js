import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {LoginScreen, RegisterScreen} from '../../screens';

const StoreStack = createAppContainer(
  createStackNavigator(
    {
      LoginScreen,
      RegisterScreen,
    },
    {
      initialRouteName: 'RegisterScreen',
      header: null,
      headerMode: 'none',
    },
  ),
);

export default StoreStack;
