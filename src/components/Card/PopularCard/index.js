import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import {icMoney} from '../../../assets';

class PopularCard extends React.Component {
  render() {
    const {key, navigation} = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CardScreen')}
        style={styles.container}
        key={key}>
        <Image
          style={styles.foodImg}
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0Ii6AjpDUAE_dWSrsXHh5GJTWmialB8kMJ5P7qwP2M9ByqW4Y&usqp=CAU',
          }}
        />
        <View style={styles.body}>
          <Text style={styles.title}>Стейк Рибай</Text>
          <Text style={styles.description}>
            Состав блюда: свинина,{'\n'}специи, лук, перец
          </Text>
          <View style={styles.bottom}>
            <Text style={styles.price}>395 ₸</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={icMoney}
                style={{width: 15, height: 15, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 12,
                  marginLeft: 5,
                }}>
                170
              </Text>
            </View>
            <TouchableOpacity style={styles.btnView}>
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
  title: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
  },
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
});

export default PopularCard;
