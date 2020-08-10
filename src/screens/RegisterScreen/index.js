import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import {icLogo} from '../../assets';
import SwitchSelector from 'react-native-switch-selector';
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'

import axios from 'axios'
import { Language } from '../../constants/lang';
import {connect} from 'react-redux'

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
    password_r: '',
    loading: false,
    langId: 1
  };
  changeLang=(value)=>{
    this.props.dispatch({type: 'CHANGE_LANG', payload: value} )
  }

validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  register =()=>{
    const {first_name, email, password, password_r} = this.state
    console.log( this.validateEmail(email))
    this.setState({
      loading: true
    })
    if(this.validateEmail(email)){
      if(password===password_r)
      {  var FormData = require('form-data');
        var data = new FormData();
        data.append('name', first_name);
        data.append('email', email);
        data.append('password', password);
        data.append('password_confirmation', password_r);

        var config = {
          method: 'post',
          url: 'http://truefood.chat-bots.kz/api/register',
          data : data
        };

        axios(config)
        .then( (response)=> {
          console.log(response.data)
          this.setState({
            loading: false
          })
          this.props.navigation.navigate('TabStack')
          this.getAsync(response.data)
        })
        .catch( (error)=> {
          console.log(error);
        });}
        else{
          alert('password error')
        }
    }else{
      alert('email error')
    }
  }
  getAsync=async(data)=>{
    await AsyncStorage.setItem('user', JSON.stringify(data))
  }
  render() {
    const { loading  } = this.state
    const { langId } = this.props
    this.list = [
      {
        title: Language[langId].register.name,
        placeholder: Language[langId].register.name,
        value: this.state.first_name,
        onChangeText: (text) => {
          this.setState({first_name: text});
        },
        password: false
      },
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
      {
        title: Language[langId].register.repeadPassword,
        placeholder: '*********',
        value: this.state.password_r,
        onChangeText: (text) => {
          this.setState({password_r: text});
        },
        password: true
      },
    ];
    return (
      <View style={{flex: 1}}>
        <ScrollView>
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
          <Text style={styles.register}>{Language[langId].register.title}</Text>
        <View style={{margin: 20}}>
          {this.list.map((item) => (
            <Input item={item} />
          ))}
          <Button onPress={()=>{
              this.register()
             // this.props.navigation.navigate('TabStack')
              }} title={loading?'loading':Language[langId].auth.register} styleBtn={{marginTop: 30}} />
        </View>
        <View>
          <Text
            style={{
              color: '#08050B',
              fontFamily: 'OpenSans-Regular',
              textAlign: 'center',
            }}>
            {Language[langId].register.account}
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
            {Language[langId].auth.signin}
          </Text>
        </View>
        </ScrollView>
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
