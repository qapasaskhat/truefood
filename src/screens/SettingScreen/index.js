import React from 'react';
import {StyleSheet, Platform, View, Text, StatusBar} from 'react-native';
import Header from '../../components/Header'

class SettingScreen extends React.Component {
  render() {
    const { navigation } = this.props
    return (
    <View style={styles.container}>
      <Header openDrawer={() => navigation.openDrawer()} />
      <Text>
        Setting
      </Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingScreen;
