import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../../components/Header'
import { chat, media } from '../../assets/index'
import Background from '../../components/Background'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button'

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
                        <Button title='отправить сообщение' />
                    </View>
              </View>
          </Background>
      </View>
    );
  }
}

export default Support;
