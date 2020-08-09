import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../../components/Header'
import { chat, media } from '../../assets/index'
import Background from '../../components/Background'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button'
import axios from 'axios'

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
        message: ''
    };
  }

  sendMessage=(message)=>{
    var FormData = require('form-data');
    var data = new FormData();
    data.append('message', message);
    
    var config = {
      method: 'post',
      url: 'http://truefood.chat-bots.kz/api/chat',
      headers: { 
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiODkzNDdkZjkwNDM3ZDJkMGNiNWI1MzNjYzVhOTUzNWM0ZmE1YWE1NjFlOTI5ZGQxMjRhOTI1N2QyOWIyOTM3NjQxY2I5ODJhMWRlNTk0MmUiLCJpYXQiOjE1OTY3MTQwMjMsIm5iZiI6MTU5NjcxNDAyMywiZXhwIjoxNjI4MjUwMDIzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.lOd8AeSVMwFeH6AP-4OJQBSyh9mLrjzDkUFa03r_kQULZ9TFd6x_FNDjAvP82dX_6acDyt2Gxo51W3EqgBFqgWsWl5oePRWCVhXiNysrH9VczGyHMl77gKNmE86OjC3aefMafREH5a8d6rMsZZTDvNOXdBS3ZDL-myUQqLdYK7rSayITdPu6rb2bGEyQ_q0_y_uSQAFXkf5z4CDw-2MOtBTJspcktEWI7-38MIHBVJ-CahHavS7uDsWCsnn3Qv3tH96cH3ru3CSJhiUZ_9iFcijlcHGwx6XB3Gcq0hAkDJSOpjZTd8wNPCDTSxQH4uOEF3bzwQ-CM9aQbxwqxDd6_UvCVvYCkUdWIfIeU0OS0yX0GZK-6U-O9RMFHJc90GCDdbFdCnv0IIn39Ic0RMEc4PTIcu3n3QaJIlKqmIJT2WWrBvldrFjjWWJbn4r7dzfBYmEKg5zOZilEGQIoFCyjygTOGowTFFeqqq85u0zRgmOd2wOcvqc5rMA3eOfF7qBewsX8mXk85ZblmjdMpSwlWrBLLObDjz2juCoNOVE7DI7IhkV0k0Hto9xcfSPktIA53pDCf3vRjmB7A5l4aY1XLFuW1h82FH7rqg9s5qExNCgfjmyw0gBjuOiAtBz2YH5-IQ65F1KdWb5xhxwuAXSJV9cX7oxh5h6Ci4m11FPxHiw', 
      },
      data : data
    };
    
    axios(config)
    .then( (response)=> {
        if(response.status === 200){
            alert('Отправлено')
            this.props.navigation.goBack()
        }
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
          <Header type='back' title='Помощь' goBack={()=>this.props.navigation.goBack()}/>
          <Background>
              <View style={{
                  marginHorizontal: 12,
                  marginTop: 20,
                  backgroundColor: '#fff',
                  borderRadius: 8
              }}>
                  <View style={{
                      flexDirection:'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: 20,
                      marginBottom: 20
                  }}>
                      <Text style={{
                          fontSize: 24,
                          lineHeight: 30,
                          color: '#08050B',
                          fontStyle: 'normal',
                          fontWeight: '600',
                          fontFamily: 'OpenSans-Regular',
                          textAlign: 'left',
                          marginTop: 16
                      }}>Здесь вы можете{'\n'}задать вопрос</Text>
                      <Image source={chat} style={{
                          width: 54,
                          height: 54,
                          resizeMode: 'contain',
                      }} />
                  </View>
                  <Text style={{
                      marginLeft:20,
                      fontSize: 14,
                          lineHeight: 24,
                          color: '#08050B',
                          fontStyle: 'normal',
                          fontWeight: '600',
                          fontFamily: 'OpenSans-Regular',
                  }}>Ваше сообщение</Text>
                  <TextInput 
                    placeholder='Напишите свой вопрос или пожелание'
                    multiline
                    value={this.state.message}
                    onChangeText={(text)=>this.setState({message: text})}
                    style={{
                        marginHorizontal: 20,
                        backgroundColor: '#F7F9FB',
                        borderRadius: 20,
                        fontSize: 16,
                        height: 200,
                        paddingLeft: 8,
                        marginBottom: 12,
                        paddingTop: 8
                    }} />
                    <View style={{
                        marginHorizontal: 20,
                        marginBottom: 20
                    }}>
                        <TouchableOpacity style={{
                            //flexDirection: 'row',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#FE1935',
                            borderRadius: 60,
                            alignItems: 'center',
                            paddingVertical: 8,
                            marginBottom: 12
                        }}>
                            <Image source={media} style={{
                                width: 26,
                                height: 26,
                                resizeMode: 'contain',
                                marginLeft: 20,
                                position: 'absolute',
                                left: 0
                            }}/>
                            <Text style={{
                                fontSize: 12,
                                lineHeight: 24,
                                color: '#08050B',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                               // marginLeft: 30
                            }}>Прикрепить фото</Text>
                        </TouchableOpacity>
                        <Button title='отправить сообщение' onPress={()=>{this.sendMessage(this.state.message)}} />
                    </View>
              </View>
          </Background>
      </View>
    );
  }
}

export default Support;
