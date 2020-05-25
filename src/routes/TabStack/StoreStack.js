import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {BasketScreen} from '../../screens';

const StoreStack = createAppContainer(
  createStackNavigator(
    {
      BasketScreen,
    },
    {
      initialRouteName: 'BasketScreen',
      header: null,
      headerMode: 'none',
    },
  ),
);

export default StoreStack;
