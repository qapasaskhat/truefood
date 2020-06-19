import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {icLogo} from '../../assets';
import SwitchSelector from 'react-native-switch-selector';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

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
    />
  </View>
);

class LoginScreen extends React.Component {
  state = {
    first_name: '',
    email: '',
    password: '',
  };

  render() {
    this.list = [
      {
        title: 'Введите email',
        placeholder: 'info@email.ru',
        value: this.state.email,
        onChangeText: (text) => {
          this.setState({email: text});
        },
      },
      {
        title: 'Введите пароль',
        placeholder: '*********',
        value: this.state.password,
        onChangeText: (text) => {
          this.setState({password: text});
        },
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
            <Input item={item} />
          ))}
          <Button title={'Войти'} styleBtn={{marginTop: 30}} />
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
