import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {HomeScreen} from '../../screens';

const HomeStack = createAppContainer(
  createStackNavigator(
    {
      HomeScreen,
    },
    {
      initialRouteName: 'HomeScreen',
      header: null,
      headerMode: 'none',
    },
  ),
);

export default HomeStack;
