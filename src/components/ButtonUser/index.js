import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';

import {icUser, icRight, icMoney} from '../../assets';

class ButtonUser extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View
          style={[
            styles.horizontal,
            styles.border,
            styles.shadow,
            styles.body,
          ]}>
          <View style={styles.horizontal}>
            <Image source={icUser} style={styles.icUser} />
            <Text style={styles.name}>Каримов Малик</Text>
          </View>
          <View style={styles.horizontal}>
            <View style={[styles.horizontal, {marginRight: 30}]}>
              <Image source={icMoney} style={styles.icMoney} />
              <Text style={styles.countText}>140</Text>
            </View>
            <Image source={icRight} style={styles.icRight} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    paddingBottom: 5,
  },
  body: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  border: {
    borderTopWidth: 0.3,
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#C6CCD1',
  },
  name: {
    fontSize: 14,
    color: '#08050B',
    fontFamily: 'OpenSans-Regular',
    marginLeft: 10,
  },
  icUser: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#C6CCD1',
  },
  icMoney: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  icRight: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
  },
});

export default ButtonUser;
