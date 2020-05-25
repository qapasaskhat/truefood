import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {UserScreen} from '../../screens';

const UserStack = createAppContainer(
  createStackNavigator(
    {
      UserScreen,
    },
    {
      initialRouteName: 'UserScreen',
      header: null,
      headerMode: 'none',
    },
  ),
);

export default UserStack;
