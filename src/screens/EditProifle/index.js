import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { icDown } from '../../assets'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import ImagePicker from 'react-native-image-picker'
import Axios from 'axios';

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
    access_token: '',
    phone: '',
    avatarSource: null,
    dataImg: null,
  };
  componentDidMount=async()=>{
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    this.getUser(user.access_token)
    this.setState({
      access_token: user.access_token
    })
    
  }
  _editProfile=(access_token)=>{
    const { name, email,phone, avatarSource,dataImg } = this.state
    console.log(
      avatarSource
    )
    var FormData = require('form-data');
    var data = new FormData();
    let file = {}
    file.name = "photo_123_1231232_324-903i4.jpg";
    file.type = 'image/jpeg';
    file.uri = avatarSource;

    data.append('name', name);
    data.append('email', email);
    data.append('phone', phone);
    dataImg && data.append('avatar', dataImg)
    data.append('_method','PUT')

    var config = {
      method: 'post',
      url: 'http://truefood.chat-bots.kz/api/user',
      headers: { 
        'Accept':'application/json',
        'Authorization': `Bearer ${this.state.access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      data : data
    };
    //Axios.post(config.url,file)

    axios(config)
    .then( (response)=> {
      console.log(JSON.stringify(response.data))
      this.props.navigation.goBack()
    })
    .catch(function (error) {
      alert(error.message)
      console.log(error);
    });
  }
  getUser=(token)=>{
    var config = {
      method: 'get',
      url: 'http://truefood.kz/api/user',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then( (response) => {
      if(response.status === 200){
        this.setState({
          first_name: response.data.lastname,
          phone: response.data.phone,
          name: response.data.name,
          email: response.data.email,
        })
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  selectImage = () => {
    console.log('ergs');
    const options = {
      title: 'select a image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const ResponseObj = ImagePicker.launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: Platform.OS==='ios'? response.uri : 'file://'+response.path,
          name: 'picture.jpg',
          type: response.type,
        };
        const isVertical = response.isVertical;
        console.log('Image picker, ', source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          dataImg: source,
          //isVerticalImage: isVertical,
        });
      }
    });
  };

  getPhoto = async ()=>{
    console.log('camera');
    const options = {
      title: 'Выбрать аватар',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    const ResponseImage =  ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response.uri);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            avatarSource: Platform.OS==='android'?+`file:/${response.path}` : response.uri,
          });
        }
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
      // {
      //   title: 'Введите фамилию',
      //   placeholder: 'Каримов',
      //   value: this.state.first_name,
      //   onChangeText: (text) => {
      //     this.setState({first_name: text});
      //   },
      // },
      {
        title: 'Введите номер телефона',
        placeholder: '',
        value: this.state.phone,
        onChangeText: (text) => {
          this.setState({phone: text});
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
          <View>
            <Button 
              title='Выбрать фото' 
              styleBtn={{marginTop: 30, backgroundColor: '#eee'}}
              styleText={{color: '#FE1935'}}
              onPress={()=>{this.selectImage()}}
              />
          </View>
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
          <View style={{justifyContent: 'center', width: '100%', marginTop: 20}}>
            {this.state.dataImg && <Image source={{uri: this.state.dataImg.uri}} 
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center'
            }} />}
          </View>
          <Button title={'сохранить данные'} styleBtn={{marginTop: 30}} onPress={()=>{
            this._editProfile(this.state.access_token)
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
