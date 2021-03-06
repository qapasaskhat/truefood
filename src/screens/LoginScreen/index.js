import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image, Alert} from 'react-native';
import {icLogo} from '../../assets';
import SwitchSelector from 'react-native-switch-selector';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {Language} from '../../constants/lang'
import {connect} from 'react-redux'
import { fcmService } from '../../notification'
import firebase from 'react-native-firebase'

const options = [
  {label: 'ENG', value: 0},
  {label: 'РУС', value: 1},
];

const Input = ({item}) => (
  <View style={{marginTop: 10}}>
    <Text style={styles.h2}>{item.title}</Text>
    <TextInput
      onChangeText={(text) => item.onChangeText(text)}
      value={item.value}
      placeholder={item.placeholder}
      placeholderTextColor={'#d1d1d1'}
      style={styles.niput}
      secureTextEntry={item.password}
    />
  </View>
);

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false,
    error: null,
    langId: 1,
    device_token: ''
  };
  componentDidMount=()=>{
    fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification)
  }
  onRegister=(token)=>{
    console.log('device token ', token)
    this.setState({
      device_token: token
    })
  }
  onNotification=(notify)=>{
      console.log('onNotification ', notify)
      const channelObj = {
          channelId: 'trueFoodChannelId',
          channelName: 'trueFoodChannelName',
          channelDes: 'trueFoodChannelDes'
      }
      const channel = fcmService.buildChannel(channelObj)
      const buildNotify = {
          dataId: notify._notificationId,
          title: notify._title,
          content: notify._body,
          sound: 'default',
          channel: channel,
          data: {},
          color: '#007BED',
          largeIcon: 'ic_launcher',
          smallIcon: 'ic_launcher',
          vibrate: true
      }
      const notification = fcmService.buildNotification(buildNotify)
      //console.log(notification)
      fcmService.displayNotify(notification)
  }
  onOpenNotification=(notify)=>{
      console.log('onOpenNotification ', notify)
      //alert(notify._body)
  }

  login=()=>{
    const { email, password,device_token } = this.state
    if(email===''){
      Alert.alert('Введите email')
      this.setState({loading: false})
      return
    }
    if(password ===''){
      Alert.alert('Введите пароль')
      this.setState({loading: false})
      return
    }
    const { langId } = this.props
    const user = new FormData()
    user.append("email", email)
    user.append("password", password)
    user.append("device_token", device_token)

    var config = {
      method: 'post',
      url: 'http://truefood.kz/api/login',
      headers: { 
      },
      data : user
    };
    this.setState({
      loading: true
    })
    axios(config)
    .then( (response) => {
      console.log((response))
      if(response.status===200){
        this.props.navigation.navigate('TabStack')
        this.getAsync(response.data)
        this.setState({
          loading: false
        })
      }else{
        this.setState({
          loading: false,
          error: Language[langId].auth.error
        })
      }
    })
    .catch( (error)=> {
      console.log(error);
      this.setState({
        loading: false,
        error: Language[langId].auth.error
      })
    });
    console.log(`login: ${this.state.email}; password: ${this.state.password}`);
  }
  getAsync=async(data)=>{
    await AsyncStorage.setItem('user', JSON.stringify(data))
  }
  changeLang=(value)=>{
    this.props.dispatch({type: 'CHANGE_LANG', payload: value} )
  }

  render() {
    const {loading,error,device_token} = this.state
    const {langId} = this.props
    this.list = [
      {
        title: Language[langId].auth.email,
        placeholder: 'info@email.ru',
        value: this.state.email,
        onChangeText: (text) => {
          this.setState({email: text});
        },
        password: false
      },
      {
        title: Language[langId].auth.password,
        placeholder: '*********',
        value: this.state.password,
        onChangeText: (text) => {
          this.setState({password: text});
        },
        password: true
      },
    ];
    return (
      <View style={{flex: 1}}>
        <Image source={icLogo} style={styles.icLogo} />
        <View style={styles.switch}>
          <SwitchSelector
            textColor={'#B7B6BB'}
            borderColor={'#B7B6BB'}
            buttonColor={'#FE1935'}
            style={{borderColor: '#FE1935'}}
            textStyle={styles.textSwitch}
            selectedTextStyle={styles.textSwitch}
            height={33}
            options={options}
            initial={langId}
            onPress={(value) =>
              this.changeLang(value)
            }
          />
        </View>
          <Text style={styles.register}>{Language[langId].auth.title}</Text>
        <View style={{margin: 20}}>
          {this.list.map((item) => (
            <Input key={`key${item}`} item={item} />
          ))}
          <Button onPress={()=>{this.login()}} title={loading?'loading': Language[langId].auth.signin} styleBtn={{marginTop: 30}} />
          {
            error && <Text style={{
              color: 'red',
              textAlign: 'center'
            }}>{error}</Text>
          }
        </View>
        <View>
          <Text
            style={{
              color: '#08050B',
              fontFamily: 'OpenSans-Regular',
              textAlign: 'center',
            }}>
            {Language[langId].auth.account}
          </Text>
          <Text
            style={{
              color: '#FE1935',
              fontFamily: 'OpenSans-Regular',
              textAlign: 'center',
              marginTop: 10,
            }} onPress={()=>{
              this.props.navigation.navigate('RegisterScreen')
            }}>
            {Language[langId].auth.register}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icLogo: {
    width: '50%',
    height: 65,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  textSwitch: {
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-SemiBold',
    fontWeight: '600',
  },
  switch: {
    height: 33,
    width: '30%',
    alignSelf: 'center',
    marginTop: 20,
  },
  h2: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  niput: {
    backgroundColor: '#F7F9FB',
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  register: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
});

const mapStateToProps = (state) => ({
  langId: state.appReducer.langId
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps,mapDispatchToProps) (LoginScreen);
