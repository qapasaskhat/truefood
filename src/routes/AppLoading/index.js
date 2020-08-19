/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, ActivityIndicator,Image} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import {icLogo} from '../../assets/index'

class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.rehydrated = false;
  }
  componentDidMount= async() =>{
    let usr =  await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    if(!user){
      this.props.navigation.navigate('AuthStack');
    }else{
      this.props.navigation.navigate('TabStack');
    }
  }

  render() {
    return (
      <View
        key={1}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image source={icLogo} style={{
            width: '50%',
            resizeMode: 'contain'
          }} />
        </View>
    );
  }
}

const mapStateToProps = (state) => ({
  rehydrated: state._persist.rehydrated,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
