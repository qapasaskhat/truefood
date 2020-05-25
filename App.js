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
import {Provider} from 'react-redux';
import store from './src/redux/store';

import InitialStack from './src/routes/InitialStack';

console.disableYellowBox = true;

class App extends React.Component {
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
