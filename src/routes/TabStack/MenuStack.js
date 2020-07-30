import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {SettingScreen,AboutScreen} from '../../screens';

const MenuStack = createAppContainer(
  createStackNavigator(
    {
      SettingScreen,
      AboutScreen
    },
    {
      initialRouteName: 'SettingScreen',
      header: null,
      headerMode: 'none',
    },
  ),
);

export default MenuStack;
