/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Platform, View, Text, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Provider,connect} from 'react-redux';
import store from './src/redux/store';
import {fcmService} from './src/notification'
import InitialStack from './src/routes/InitialStack';
import AsyncStorage from '@react-native-community/async-storage';

console.disableYellowBox = true;

class App extends React.Component {
  state={
    token: '',
    user: {}
  }
  componentDidMount=async()=>{
    fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification)
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    console.log(user)
    this.setState({
      token: user.access_token
    })
  }
  onRegister=(token)=>{
    console.log('device token ', token)
    this.setState({
      device_token: token
    })

  }
  onNotification=(notify)=>{
    console.log('onNotification ', notify)
    const channelObj = {
        channelId: 'trueFoodChannelId',
        channelName: 'trueFoodChannelName',
        channelDes: 'trueFoodChannelDes'
    }
    const channel = fcmService.buildChannel(channelObj)
    const buildNotify = {
        dataId: notify._notificationId,
        title: notify._title,
        content: notify._body,
        sound: 'default',
        channel: channel,
        data: {},
        color: '#007BED',
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_launcher',
        vibrate: true
    }
    const notification = fcmService.buildNotification(buildNotify)
    //console.log(notification)
    fcmService.displayNotify(notification)
  }
  onOpenNotification=(notify)=>{
      console.log('onOpenNotification app.js', notify._body)
      
  }
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <SafeAreaView style={{flex: 1}} forceInset={{bottom: 'never'}}>
            <StatusBar barStyle="dark-content" />
            <InitialStack />
          </SafeAreaView>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default App;
