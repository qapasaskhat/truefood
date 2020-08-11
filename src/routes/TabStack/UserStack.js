import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {
  UserScreen,
  EditProifle,
  HistoryOrder,
  Incoming,
  OrderScreen,
} from '../../screens';
import React, {Component} from 'react';
import {Animated, Easing, Dimensions} from 'react-native';
import CustomComponent from '../../components/CustomComponent'
const {width} = Dimensions.get('window');

const UserStack = createAppContainer(
  createDrawerNavigator(
   { User:
    createStackNavigator(
      {
        UserScreen,
        EditProifle,
        HistoryOrder,
        Incoming,
        OrderScreen,
      },
      {
        initialRouteName: 'UserScreen',
        header: null,
        headerMode: 'none',
        mode: 'card',
          transitionConfig: () => ({
            transitionSpec: {
              duration: 50,
              easing: Easing.step0,
              timing: Animated.timing,
            },
            screenInterpolator: (sceneProps) => {
              const {layout, position, scene} = sceneProps;
              const {index} = scene;

              const width = layout.initWidth;
              const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, 0],
              });

              const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
              });

              return {opacity, transform: [{translateX: translateX}]};
            },
          }),
      },
    ),},{
      initialRouteName: 'User',
      header: null,
      headerMode: 'none',

      drawerPosition: 'left',
      drawerWidth: width / 2 + width / 4,
      drawerType: 'front',
      contentComponent: (props) => <CustomComponent {...props} />,
    }
  )
);

export default UserStack;
