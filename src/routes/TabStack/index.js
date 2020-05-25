import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeStack from './HomeStack';
import UserStack from './UserStack';
import StoreStack from './StoreStack';
import MenuStack from './MenuStack';

import {icUser, icMain, icStore, icMenu} from '../../assets';

export default createAppContainer(
  createBottomTabNavigator(
    {
      HomeStack: HomeStack,
      UserStack: UserStack,
      StoreStack: StoreStack,
      MenuStack: MenuStack,
    },
    {
      initialRouteName: 'HomeStack',

      defaultNavigationOptions: ({navigation}) => ({
        tabBarOptions: {
          showLabel: false,
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
            case 'StoreStack': {
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
            <Image
              source={iconName}
              style={[
                styles.icon,
                {tintColor: focused ? '#000000' : '#E0E2EF'},
              ]}
            />
          );
        },
      }),
    },
  ),
);

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 28,
    height: 28,
  },
});
