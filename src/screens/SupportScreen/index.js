import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../../components/Header'
import { chat, media } from '../../assets/index'
import Background from '../../components/Background'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button'
import axios from 'axios'
import { connect } from 'react-redux';
import { Language } from '../../constants/lang'
import AsyncStorage from '@react-native-community/async-storage';

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
        message: '',
        token: '',
        loading: false,
        messages: [],
        message: {},
    };
  }
  componentDidMount=async()=>{
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    console.log(user.access_token)
    this.setState({
      token: user.access_token
    })
  }

  sendMessage=(message)=>{
    var FormData = require('form-data');
    var data = new FormData();
    data.append('message', message);
    
    var config = {
      method: 'post',
      url: 'http://truefood.chat-bots.kz/api/chat',
      headers: { 
        'Authorization': `Bearer ${this.state.token}`, 
      },
      data : data
    };
    this.setState({
      loading: true
    })
    axios(config)
    .then( (response)=> {
        if(response.status === 200){
          this.setState(state => {
            const obj = {
              _id: response.data.message.id,
              text: response.data.message.message,
              createdAt: response.data.message.updated_at,
              user: {
                _id: response.data.message.user_id,
                name: ''
              }
            }
            const messages = [...this.state.messages, obj]
            return {
              messages,
            };
          });
            alert('Отправлено')
            this.props.navigation.goBack()
            this.props.dispatch({type: 'GET_CHAT_ID', payload: response.data.chat.id} )
            this.props.dispatch({type: 'GET_MESSAGE', payload: this.state.messages} )
            console.log(response.data)
            this.setState({
              loading: false
            })
        }
      console.log(JSON.stringify(response.data));
    })
    .catch( (error) =>{
      this.setState({
        loading: false
      })
      alert(error.message)
      console.log(error);
    });
  }

  render() {
    const { langId } = this.props
    const { loading } = this.state
    return (
      <View style={{flex: 1}}>
          <Header type='back' title={Language[langId].support.title} goBack={()=>this.props.navigation.goBack()}/>
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
                      }}>{Language[langId].support.answer}</Text>
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
                  }}>{Language[langId].support.text}</Text>
                  <TextInput 
                    placeholder={Language[langId].support.enter}
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
                        {/* <TouchableOpacity style={{
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
                            }}>{Language[langId].support.sendPhoto}</Text>
                        </TouchableOpacity> */}
                        <Button loading={loading} title={Language[langId].support.send} onPress={()=>{this.sendMessage(this.state.message)}} />
                    </View>
              </View>
          </Background>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  langId: state.appReducer.langId
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps,mapDispatchToProps) (Support);
