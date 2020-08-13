import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import {icUser, icRight, icMoney} from '../../assets';

class ButtonUser extends React.Component {
  state={
    user: {},
    token: ''
  }
  componentDidMount=async()=>{
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    console.log(user.access_token)
    this.setState({
      token: user.access_token
    })
    this.getUser(user.access_token)
    this.props.navigation.addListener ('willFocus', () =>
      {
        this.getUser(this.state.token)
      }
    );
  }
  getUser =(token)=>{
    var config = {
      method: 'get',
      url: 'http://truefood.chat-bots.kz/api/user',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then( (response) => {
      if(response.status === 200){
        this.setState({
          user: response.data
        })
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  render() {
    const { name,cashback } = this.props
    const { user } = this.state
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.horizontal,
            styles.border,
            styles.shadow,
            styles.body,
          ]}>
          <View style={styles.horizontal}>
            <Image source={icUser} style={styles.icUser} />
        <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.horizontal}>
            <View style={[styles.horizontal, {marginRight: 30}]}>
              <Image source={icMoney} style={styles.icMoney} />
        <Text style={styles.countText}>{cashback}</Text>
            </View>
            <Image source={icRight} style={[styles.icRight,{tintColor: '#fff'}]} />
          </View>
        </View>
      </View>
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
