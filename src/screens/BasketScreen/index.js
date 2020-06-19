import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';

import BasketCard from '../../components/BasketCard';

class BasketScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <ButtonUser />
        <Background>
          <View style={{flex: 1, padding: 12.5}}>
            <Text style={styles.h1}>Корзина</Text>
            {[{}, {}, {}].map((item) => (
              <BasketCard />
            ))}
          </View>
        </Background>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    marginBottom: 20,
  },
});

export default BasketScreen;
