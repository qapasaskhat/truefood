import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import OrderCard from '../../components/Card/OrderCard';
import {icMoney} from '../../assets';
import Button from '../../components/Button';

class OrderScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          navigation={this.props.navigation}
          type={'back'}
          title={'Заказ от 26.05.2020'}
        />
        <Background>
          <View style={{flex: 1, padding: 12.5}}>
            {[{}, {}].map((item) => (
              <OrderCard />
            ))}
            <View style={styles.view}>
              <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 18}}>
                Итого:
              </Text>
              <View style={styles.horizontal}>
                <Image source={icMoney} style={styles.icMoney} />
                <Text style={styles.coinTXT}>170</Text>
              </View>
              <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 18}}>
                650 ₸
              </Text>
            </View>
            <Button title={'Повторить заказ'} styleBtn={{marginTop: 10}} />
          </View>
        </Background>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  horizontal: {flexDirection: 'row', alignItems: 'center'},
  coinTXT: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    marginLeft: 5,
  },
  icMoney: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default OrderScreen;
