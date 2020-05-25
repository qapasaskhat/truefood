import React from 'react';
import {StyleSheet, Platform, View, Text, StatusBar} from 'react-native';

class BasketScreen extends React.Component {
  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BasketScreen;
