import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';

import {icMoney, icDinner, icVilka} from '../../../assets';

class OrderCard extends React.Component {
  render() {
    const { item,text } = this.props
    return (
      <View
        style={{
          marginBottom: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          backgroundColor: 'white',
          borderRadius: 10,
        }}>
        <View key={'header'} style={styles.container}>
          <Image
            style={styles.foodImg}
            source={{
              uri:
              `http://truefood.kz/storage/${item.entity && item.entity.product.thumbnail}`
            }}
          />
          <View style={styles.body}>
            <Text style={styles.title}>{item.entity && item.entity.product.name}</Text>
            <Text style={styles.description}>
              {item.entity && item.entity.product.description}
            </Text>
            <View style={styles.bottom}>
              <View style={styles.horizontal}>
                <Image source={icMoney} style={styles.icMoney} />
                <Text style={styles.coinTXT}>{item.unit_cashback}</Text>
              </View>

              <Text style={styles.price}>{item.entity.price} ₸</Text>
            </View>
          </View>
        </View>
        <View
          key={'bootom'}
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          {/* <View style={{padding: 10, paddingLeft: 15}}>
            <Text style={styles.razner}>Размер порций</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 3,
              }}>
              <Image
                source={icDinner}
                style={{width: 16, height: 16, resizeMode: 'contain'}}
              />
              <Text style={{fontFamily: 'OpenSans-SemiBold', marginLeft: 5}}>
                160 гр
              </Text>
            </View>
          </View> */}
          <View style={{padding: 10, paddingLeft: 15}}>
        <Text style={styles.razner}>{text}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 3,
              }}>
              <Image
                source={icVilka}
                style={{width: 16, height: 16, resizeMode: 'contain'}}
              />
              <Text style={{fontFamily: 'OpenSans-SemiBold', marginLeft: 5}}>
                {item.unit_quantity} шт
              </Text>
            </View>
          </View>
        </View>
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
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,

    borderWidth: 0.7,
    borderColor: '#E9E9E9',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  horizontal: {flexDirection: 'row', alignItems: 'center'},

  foodImg: {
    width: '30%',
    height: 120,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  body: {
    width: '70%',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  description: {
    color: '#B7B6BB',
    fontFamily: 'OpenSans-Regular',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  coinTXT: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    marginLeft: 5,
  },
  icMoney: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  razner: {
    fontFamily: 'OpenSans-Regular',
    color: '#08050B',
    fontSize: 12,
  },
});

export default OrderCard;
