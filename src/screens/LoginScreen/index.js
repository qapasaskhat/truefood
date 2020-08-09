import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {icLogo} from '../../assets';
import SwitchSelector from 'react-native-switch-selector';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const options = [
  {label: 'РУС', value: '1'},
  {label: 'ENG', value: '1.5'},
];

const Input = ({item}) => (
  <View style={{marginTop: 10}}>
    <Text style={styles.h2}>{item.title}</Text>
    <TextInput
      onChangeText={(text) => item.onChangeText(text)}
      value={item.value}
      placeholder={item.placeholder}
      placeholderTextColor={'#08050B'}
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
    error: null
  };

  login=()=>{
    const { email, password } = this.state
    const user = new FormData()
    user.append("email",email)
    user.append("password",password)

    var config = {
      method: 'post',
      url: 'http://truefood.chat-bots.kz/api/login',
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
          error: 'Ошибка входа'
        })
      }
    })
    .catch( (error)=> {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Ошибка входа'
      })
    });

    console.log(`login: ${this.state.email}; password: ${this.state.password}`);
  }
  getAsync=async(data)=>{
    await AsyncStorage.setItem('user', JSON.stringify(data))
  }

  render() {
    const {loading,error} = this.state
    this.list = [
      {
        title: 'Введите email',
        placeholder: 'info@email.ru',
        value: this.state.email,
        onChangeText: (text) => {
          this.setState({email: text});
        },
        password: false
      },
      {
        title: 'Введите пароль',
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
            initial={0}
            onPress={(value) =>
              console.log(`Call onPress with value: ${value}`)
            }
          />
        </View>
        <Text style={styles.register}>Авторизация</Text>
        <View style={{margin: 20}}>
          {this.list.map((item) => (
            <Input key={`key${item}`} item={item} />
          ))}
          <Button onPress={()=>{this.login()}} title={loading?'loading': 'Войти'} styleBtn={{marginTop: 30}} />
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
            У вас еще нет аккаунта?
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
            Зарегистрироваться
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

export default LoginScreen;
