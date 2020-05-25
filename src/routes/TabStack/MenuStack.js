import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {SettingScreen} from '../../screens';

const MenuStack = createAppContainer(
  createStackNavigator(
    {
      SettingScreen,
    },
    {
      initialRouteName: 'SettingScreen',
      header: null,
      headerMode: 'none',
    },
  ),
);

export default MenuStack;
