import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { icDown } from '../../assets'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

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
class EditProifle extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    name: '',
    email: '',
    loading: false,
    access_token: ''
  };
  componentDidMount=async()=>{
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    console.log(user.access_token)
    this.getUser(user.access_token)
    this.setState({
      aaccess_token: ser.access_token
    })
  }
  _editProfile=(access_token)=>{
    const { name, first_name, last_name, email } = this.state
    var FormData = require('form-data');
    var data = new FormData();
    data.append('name', 'name');
    data.append('email', 'email@mail.ru');
    data.append('middlename', 'first_name');
    data.append('lastname', 'last_name');

    var config = {
      method: 'put',
      url: 'http://truefood.chat-bots.kz/api/user/',
      headers: { 
        'Authorization': `Bearer ${access_token}`, 
      },
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
  getUser=(token)=>{
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
          first_name: response.data.name,
          last_name: response.data.middlename,
          name: response.data.lastname,
          email: response.data.email,
        })
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  render() {
    this.list = [
      {
        title: 'Введите имя',
        placeholder: 'Малик',
        value: this.state.name,
        onChangeText: (text) => {
          this.setState({name: text});
        },
      },
      {
        title: 'Введите фамилию',
        placeholder: 'Каримов',
        value: this.state.first_name,
        onChangeText: (text) => {
          this.setState({first_name: text});
        },
      },
      {
        title: 'Введите отчество',
        placeholder: '',
        value: this.state.last_name,
        onChangeText: (text) => {
          this.setState({last_name: text});
        },
      },
      {
        title: 'Введите e-mail',
        placeholder: '',
        value: this.state.email,
        onChangeText: (text) => {
          this.setState({email: text});
        },
      },
    ];
    return (
      <View style={styles.container}>
        <Header type={'close'} title={'Редактировать профиль'} close={()=>{this.props.navigation.goBack()}} />
        <View style={{padding: 12.5, backgroundColor: 'white'}}>
          {this.list.map((item) => (
            <Input item={item} />
          ))}
          {/* <Text style={[styles.h2,{marginTop:10}]}>Введите дату рождения</Text>
          <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <View style={styles.calendar}>
              <Text style={styles.calendarTxt}>12</Text>
              <TouchableOpacity>
              <Image source={icDown} style={styles.downImg}/>
              </TouchableOpacity>
            </View>
            <View style={styles.calendar}>
              <Text style={styles.calendarTxt}>сентябрь</Text>
              <TouchableOpacity>
              <Image source={icDown} style={styles.downImg}/>
              </TouchableOpacity>
            </View>
            <View style={styles.calendar}>
              <Text style={styles.calendarTxt}>1980</Text>
              <TouchableOpacity>
              <Image source={icDown} style={styles.downImg}/>
              </TouchableOpacity>
            </View>
          </View> */}
          <Button title={'сохранить данные'} styleBtn={{marginTop: 30}} onPress={()=>{
            this._editProfile(this.state.access_token)
            this.props.navigation.goBack()
          }}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  calendar:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingVertical: 12,
    borderRadius: 60,
    paddingHorizontal:10,
    alignItems:'center'
  },
  downImg:{
    tintColor: '#FE1935',
    width: 16,
    height: 16,
    resizeMode: 'contain'
  },
  calendarTxt: {
    fontSize: 16,
    lineHeight: 30,
    color: '#08050B',
    fontWeight: 'normal',
    fontFamily: 'OpenSans-SemiBold',
    marginRight: 16
  }
});

export default EditProifle;
