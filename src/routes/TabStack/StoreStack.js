import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {BasketScreen, DeliveryScreen} from '../../screens';

const StoreStack = createAppContainer(
  createStackNavigator(
    {
      BasketScreen,
      DeliveryScreen,
    },
    {
      initialRouteName: 'BasketScreen',
      header: null,
      headerMode: 'none',
    },
  ),
);

export default StoreStack;
