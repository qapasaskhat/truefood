import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import TabStack from '../TabStack';
import AppLoading from '../AppLoading';

const MyApp = createStackNavigator(
  {
    AppLoading: AppLoading,
    TabStack: TabStack,
  },
  {
    headerMode: 'none',
    mode: 'card',
    initialRouteName: 'TabStack',
  },
);

const App = createAppContainer(MyApp);

export default App;
