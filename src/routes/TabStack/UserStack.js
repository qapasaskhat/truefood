import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {UserScreen, EditProifle, HistoryOrder, Incoming} from '../../screens';

const UserStack = createAppContainer(
  createStackNavigator(
    {
      UserScreen,
      EditProifle,
      HistoryOrder,
      Incoming,
    },
    {
      initialRouteName: 'UserScreen',
      header: null,
      headerMode: 'none',
    },
  ),
);

export default UserStack;
