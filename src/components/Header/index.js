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
  icBack,
} from '../../assets/index';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class Header extends React.Component {
  state={
    message: 0
  }
  componentDidMount=async()=>{
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    this.getChat(user.access_token)
  }
  getChat=(token)=>{
    var config = {
      method: 'get',
      url: 'http://truefood.chat-bots.kz/api/chat',
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
    };
    
    axios(config)
    .then( (response) => {
      this.setState({
        message: response.data.messages.length
      })
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const {openDrawer, type, onPressUser, close, goBack, navigation } = this.props;
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
    } else if (type === 'back') {
      return (
        <View style={[styles.profileContainer, {justifyContent: 'flex-start'}]}>
          <TouchableOpacity
            onPress={goBack}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image
                source={icBack}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={styles.textProfile}>{this.props.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (type === 'close') {
      return (
        <View style={styles.profileContainer}>
          <View>
            <Text style={styles.textProfile}>{this.props.title}</Text>
          </View>
          <TouchableOpacity onPress={close}>
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
          <TouchableOpacity onPress={()=>{
            console.log('Incoming')
            navigation.navigate('Incoming')
          }}>
            <View style={styles.number}>
            <Text style={styles.txtNumber}>{this.state.message}</Text>
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
    width: 16,
    height: 16,
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
    fontSize: 10,
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
