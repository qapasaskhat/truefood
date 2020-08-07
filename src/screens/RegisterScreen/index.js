import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {icLogo} from '../../assets';
import SwitchSelector from 'react-native-switch-selector';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import axios from 'axios'

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
      secureTextEntry ={item.password}
    />
  </View>
);

class LoginScreen extends React.Component {
  state = {
    first_name: '',
    email: '',
    password: '',
  };

validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  register =()=>{
    const {first_name, email, password} = this.state
    console.log( this.validateEmail(email))
    
      var FormData = require('form-data');
      var data = new FormData();
      data.append('name', 'askhat');
      data.append('email', 'askhat@mail.ru');
      data.append('password', '123456');

      var config = {
        method: 'post',
        url: 'http://truefood.chat-bots.kz/api/register',
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }
  render() {
    this.list = [
      {
        title: 'Введите имя',
        placeholder: 'Имя',
        value: this.state.first_name,
        onChangeText: (text) => {
          this.setState({first_name: text});
        },
        password: false
      },
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
        <Text style={styles.register}>Регистариция</Text>
        <View style={{margin: 20}}>
          {this.list.map((item) => (
            <Input item={item} />
          ))}
          <Button onPress={()=>{
              this.register()
             // this.props.navigation.navigate('TabStack')
              }} title={'Зарегистрироваться'} styleBtn={{marginTop: 30}} />
        </View>
        <View>
          <Text
            style={{
              color: '#08050B',
              fontFamily: 'OpenSans-Regular',
              textAlign: 'center',
            }}>
            У вас уже есть аккаунт?
          </Text>
          <Text
            onPress={() => {
              this.props.navigation.goBack()
            }}
            style={{
              color: '#FE1935',
              fontFamily: 'OpenSans-Regular',
              textAlign: 'center',
              marginTop: 10,
            }}>
            Войти
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
