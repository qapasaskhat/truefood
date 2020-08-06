import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import {icMoney} from '../../../assets';

class PopularCard extends React.Component {
  render() {
    const {key,item, navigation, coinVisible, image, name, price,desc, id, onPress} = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CardScreen',{param: id})}
        style={styles.container}
        key={key}>
        <Image
          style={styles.foodImg}
          source={{
            uri:
              'https://alimero.ru/uploads/images/18/76/55/2019/08/05/3e0c56.png',
          }}
        />
        <View style={styles.body}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.description}>
            {desc}
          </Text>
          <View style={styles.bottom}>
            <Text style={styles.price}>{price} ₸</Text>
            {coinVisible && (
              <View style={styles.horizontal}>
                <Image source={icMoney} style={styles.icMoney} />
                <Text style={styles.coinTXT}>170</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() =>{
                onPress()
                this.props.dispatch({type: 'ADD_BASKET', payload: item} )}
              }
              style={styles.btnView}>
              <Text style={styles.btnText}>в корзину</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 0.7,
    borderColor: '#E9E9E9',
  },
  horizontal: {flexDirection: 'row', alignItems: 'center'},
  title: {color: '#08050B',fontFamily: 'OpenSans-SemiBold',fontSize: 20,},
  foodImg: {
    width: '30%',
    height: 120,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  body: {width: '70%',justifyContent: 'space-between',padding: 10,},
  title: {fontFamily: 'OpenSans-SemiBold',fontSize: 16,},
  description: {color: '#B7B6BB',fontFamily: 'OpenSans-Regular',},
  bottom: {flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',},
  price: {color: '#08050B',fontFamily: 'OpenSans-SemiBold',fontSize: 16,},
  btnView: {
    backgroundColor: '#FE1935',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
    paddingLeft: 13,
    paddingRight: 13,
  },
  btnText: {
    textTransform: 'uppercase',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  coinTXT: {fontFamily: 'OpenSans-SemiBold',fontSize: 12,marginLeft: 5,},
  icMoney: {width: 15,height: 15,resizeMode: 'contain',},
});

export default PopularCard;
