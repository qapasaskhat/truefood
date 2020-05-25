import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';

import Header from '../../components/Header';
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
