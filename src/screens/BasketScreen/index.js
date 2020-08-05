import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';

import BasketCard from '../../components/BasketCard';
import Button from '../../components/Button';

class BasketScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
  }

  render() {
    const {navigation, dispatch} = this.props;
    return (
      <View style={{flex: 1}}>
        <Header openDrawer={() => navigation.openDrawer()}/>
        <ButtonUser />
        <Background>
          <View style={{flex: 1, padding: 12.5}}>
            <Text style={styles.h1}>Корзина</Text>
            {[{}, {}].map((item) => (
              <BasketCard />
            ))}
            
              <Button
                onPress={() => this.props.navigation.navigate('DeliveryScreen')}
                title={`Оформить за ${2950} ₸`}
              />
              <Button
                title={'Добавить еще блюда'}
                styleBtn={styles.styleBtn}
                styleText={styles.styleText}
              />
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
  styleBtn: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FE1935',
  },
  styleText: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
  },
});

export default BasketScreen;
