import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {HomeScreen, CardScreen, CategoryScreen} from '../../screens';

const HomeStack = createAppContainer(
  createStackNavigator(
    {
      HomeScreen,
      CardScreen,
      CategoryScreen,
    },
    {
      initialRouteName: 'HomeScreen',
      header: null,
      headerMode: 'none',
    },
  ),
);

export default HomeStack;
