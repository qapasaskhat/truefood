import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {NavigationActions, StackActions} from 'react-navigation';
import HomeStack from './HomeStack';
import UserStack from './UserStack';
import StoreStack from './StoreStack';
import MenuStack from './MenuStack';
import {connect} from 'react-redux';
import store from '../../redux/store'
import {icUser, icMain, icStore, icMenu} from '../../assets';
//createAppContainer(
const AppContainer = 
  createBottomTabNavigator(
    {
      HomeStack: HomeStack,
      UserStack: UserStack,
      Store: StoreStack,
      MenuStack: MenuStack,
    },
    {
      initialRouteName: 'HomeStack',
      defaultNavigationOptions: ({navigation, screenProps}) => ({
        tabBarOptions: {
          showLabel: false,
        },
        tabBarOnPress: ({navigation, defaultHandler}) => {
          console.log(navigation);
          // defaultHandler();
          let parentNavigation = navigation.dangerouslyGetParent();
          let prevRoute =
            parentNavigation.state.routes[parentNavigation.state.index];
          let nextRoute = navigation.state;
          console.log({prevRoute, nextRoute});

          if (prevRoute.key === nextRoute.key) {
            if (
              nextRoute.routes[0] &&
              nextRoute.routes[0].routes &&
              nextRoute.routes[0].routes.length === 1
            )
              defaultHandler();
            else {
              if (nextRoute === prevRoute) {
                defaultHandler();
              } else {
                navigation.dispatch(NavigationActions.back());
              }
            }
          } else {
            if (nextRoute.key === 'MenuStack') {
              console.log('lllllloooooooggggg')
              console.log(prevRoute)
              prevRoute.routes[0].routes[0].params.openDrawer();
            } else {
              defaultHandler();
            }
          }
        },
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          const {routeName} = navigation.state;
          let iconName;
          switch (routeName) {
            case 'HomeStack': {
              iconName = icMain;
              break;
            }
            case 'UserStack': {
              iconName = icUser;
              break;
            }
            case 'Store': {
              iconName = icStore;
              break;
            }
            case 'MenuStack': {
              iconName = icMenu;
              break;
            }
            default:
              break;
          }
          return (
            <AppD iconName={iconName} focused={focused} />
          );
        },
      }),
    },
  )
//  ,);


class App extends React.Component {
  render() {
    const { iconName,focused,basket } = this.props
    return (
      <View>
      {iconName === icStore && (
        <View style={styles.number}>
          <Text style={styles.txtNumber}>
            {basket.length}
          </Text>
        </View>
      )}
      <Image
        source={iconName}
        style={[
          styles.icon,
          {tintColor: focused ? '#000000' : '#B7B6BB'},
        ]}
      />
    </View>
    );
  }
}

const mapStateToProps = (state) => ({
  basket: state.appReducer.basket,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default AppContainer
const AppD =  connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 28,
    height: 28,
  },
  number: {
    backgroundColor: 'red',
    width: 15,
    height: 15,
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -5,
    left: -5,
    zIndex: 1,
  },
  txtNumber: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
