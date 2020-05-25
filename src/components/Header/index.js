import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {icBurger, icLogo, icChat} from '../../assets/index';

class Header extends React.Component {
  render() {
    return (
      <View key={'header'} style={styles.container}>
        <TouchableOpacity>
          <Image source={icBurger} style={styles.icBurger} />
        </TouchableOpacity>
        <Image source={icLogo} style={styles.icLogo} />
        <TouchableOpacity>
          <View style={styles.number}>
            <Text style={styles.txtNumber}>3</Text>
          </View>
          <Image source={icChat} style={styles.icChat} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
  },
  icBurger: {
    width: 36,
    height: 28,
    resizeMode: 'contain',
  },
  icLogo: {
    width: Dimensions.get('window').width / 2,
    height: 55,
    resizeMode: 'contain',
  },
  number: {
    backgroundColor: 'red',
    width: 15,
    height: 15,
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -5,
    left: -5,
    zIndex: 1,
  },
  txtNumber: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  icChat: {width: 36, height: 28, resizeMode: 'contain'},
});

export default Header;
