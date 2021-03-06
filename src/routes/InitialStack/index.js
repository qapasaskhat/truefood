import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import TabStack from '../TabStack';
import AppLoading from '../AppLoading';
import AuthStack from '../AuthStack';

const MyApp = createStackNavigator(
  {
    AppLoading: AppLoading,
    TabStack: TabStack,
    AuthStack: AuthStack,
  },
  {
    headerMode: 'none',
    mode: 'card',
    initialRouteName: 'AppLoading',
  },
);

const App = createAppContainer(MyApp);

export default App;
