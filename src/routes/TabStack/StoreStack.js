import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {BasketScreen, DeliveryScreen, PayScreen} from '../../screens';

const StoreStack = createAppContainer(
  createStackNavigator(
    {
      BasketScreen,
      DeliveryScreen,
      PayScreen,
    },
    {
      initialRouteName: 'BasketScreen',
      header: null,
      headerMode: 'none',
    },
  ),
);

export default StoreStack;
