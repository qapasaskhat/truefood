import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  icBurger,
  icLogo,
  icChat,
  icMoney,
  icProfile,
  icClose,
} from '../../assets/index';

class Header extends React.Component {
  render() {
    const {openDrawer, type, onPressUser} = this.props;
    if (type === 'profile') {
      return (
        <View style={styles.profileContainer}>
          <View>
            <Text style={styles.textProfile}>Профиль</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.horizontal, {marginRight: 30}]}>
              <Image source={icMoney} style={styles.icMoney} />
              <Text style={styles.countText}>140</Text>
            </View>
            <TouchableOpacity
              onPress={() => onPressUser()}
              style={styles.profileBtn}>
              <Image
                source={icProfile}
                style={{width: 18, height: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (type === 'close') {
      return (
        <View style={styles.profileContainer}>
          <View>
            <Text style={styles.textProfile}>{this.props.title}</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={icClose}
              style={{
                width: 18,
                height: 18,
                resizeMode: 'contain',
                tintColor: 'black',
              }}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View key={'header'} style={styles.container}>
          <TouchableOpacity onPress={() => openDrawer()}>
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
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
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
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
  },
  icMoney: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  profileContainer: {
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: 'white',
    padding: 10,
  },
  textProfile: {fontFamily: 'OpenSans-SemiBold', fontSize: 16},
  profileBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 50,
  },
});

export default Header;
