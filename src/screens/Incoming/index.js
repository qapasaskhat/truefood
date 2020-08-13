import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '../../components/Header';
import Background from '../../components/Background';

import Pusher from 'pusher-js/react-native';
import {pusherConfig} from './pusher';
import axios from 'axios'
import { connect } from 'react-redux'

import {icFrame2, icRight, icMoney, chat, send} from '../../assets';
import {GiftedChat} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';


const {width, height} = Dimensions.get('window');
const ratio_1 = width / 1500;

class Incoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: {},
      token: '',
      user_id: 1,
      text: ''
    };
    this.pusher = null;
    this.my_channel = null;
  }
  componentDidMount = async() => {
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    console.log(user)
    this.setState({
      token: user.access_token
    })
    const {chat_id,chat_messages} = this.props
    this.getUser(user.access_token)
    this.setState({
      messages: chat_messages
    })
    console.log(this.state.messages)

    Pusher.logToConsole = true;
    console.log('date');
    this.pusher = new Pusher(pusherConfig.key, {
      authEndpoint: 'http://truefood.chat-bots.kz/api/chat',
      cluster: 'ap2',
      encrypted: true,
      secret: '3ceee9abe02b2c2fafd9',
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization:
            `Bearer ${this.state.token}`,
        },
      },
    });
    this.my_channel = this.pusher.subscribe('App.Chat.' + chat_id);
    this.my_channel.bind('message-sent', (data)=> {
      this.setState({
        message: data.message
      })
      this.setState(state => {
        const obj = {
          _id: this.state.message.id,
          text: this.state.message.message,
          createdAt: this.state.message.updated_at,
          user: {
            _id: this.state.message.user_id,
            name: ''
          }
        }
        const messages = [...this.state.messages, obj]
        return {
          messages,
          message: {},
        };
      });
      console.log(this.state.messages);
    });
  };
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
        console.log(response.data.id)
        this.setState({
          user_id: response.data.id
        })
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  componentWillUnmount=()=>{
    this.props.dispatch({type: 'GET_MESSAGE', payload: this.state.messages} )
  }
  sendMessage=(message)=>{
    const {chat_id} = this.props
    var FormData = require('form-data');
    var data = new FormData();
    data.append('message', message);
    data.append('chat_id', chat_id);
    console.log(chat_id)
    var config = {
      method: 'post',
      url: 'http://truefood.chat-bots.kz/api/chat',
      headers: { 
        'Authorization': `Bearer ${this.state.token}`, 
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
  renderBody = () => {
    const menu = [
      {
        title: 'Новая акция от TRUE...',
        open: true,
        date: '12.10.2020',
      },
      {
        title: 'Ваше обращение за...',
        open: true,
        date: '12.10.2020',
      },
      {
        title: 'Здравствуйте! Мы хо...',
        open: false,
        date: '12.10.2020',
      },
      {
        title: 'Ответ получен',
        open: false,
        date: '12.10.2020',
      },
    ];
    return (
      <View style={styles.view}>
        {menu.map((item) => (
          <TouchableOpacity style={styles.btn}>
            <Text
              style={[
                styles.title,
                {
                  fontFamily: item.open
                    ? 'OpenSans-SemiBold'
                    : 'OpenSans-Regular',
                  width: '50%',
                  maxWidth: '50%',
                },
              ]}>
              {item.title}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.countText}>{item.date}</Text>
              {item.open && <View style={styles.point} />}
            </View>
            <Image source={icRight} style={styles.img} />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  render() {
    const {messages,user_id} = this.state;
    const { chat_id } = this.props
    const chat = (
      <GiftedChat
        messages={messages}
        placeholder={'Напишите сообщение...'}
        text={this.state.text}
        onInputTextChanged={text=>this.setState({text})}
        renderSend={(message)=>(
          <TouchableOpacity onPress={()=>{
            this.sendMessage(message.text)
            this.setState({
              text: ''
            })
          }} style={{
            justifyContent:'center',
            alignItems: 'center',
            height: '100%',
            marginRight: 6,
          }}>
            <Image source={send} style={{
              width: 32,
              height: 32,
              resizeMode: 'contain'
            }} />
          </TouchableOpacity>
        )}
        onSend={(message)=>{
          console.log(message[0].text)
          this.sendMessage(message[0].text)
        }}
        user={{
          _id: user_id,
        }}
      />
    );
    return (
      <View style={styles.container}>
        <Header
          title={'Входящие'}
          type={'close'}
          onPressUser={() => {
            console.log('fewewf');
          }}
          close={() => {
            this.props.navigation.goBack();
          }}
        />
        { chat_id===0? 
        
        <Text style={{textAlign: 'center',marginTop:'30%',fontSize: 16,}}>
          Чтобы начать чат переходите в меню {'\n'}<Text style={{fontWeight: 'bold',}}>Обратная связь или помощь</Text>
        </Text>
        :chat}
        {/* <Header
          title={'Входящие'}
          type={'close'}
          onPressUser={() => {
            console.log('fewewf');
          }}
          close={()=>{
            this.props.navigation.goBack();
          }}
        />
        <Background source={icFrame2} style={[styles.bgContainer]}>
        
          {this.renderBody()}
        </Background> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgContainer: {
    width: width,
    height: 2960 * ratio_1,
    backgroundColor: '#fff',
  },
  view: {
    flex: 1,
    padding: 12.5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    margin: 15,
    marginTop: 25,
    borderRadius: 10,
  },
  btn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderColor: '#EEEDF1',
    paddingTop: 10,
    paddingBottom: 10,
    height: 50,
    alignItems: 'center',
    maxHeight: 50,
  },
  title: {
    fontSize: 14,

    color: '#08050B',
  },
  img: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#B7B6BB',
  },
  point: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: '#FE1935',
  },
  push: {
    backgroundColor: '#FE1935',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    paddingTop: 5,
    paddingBottom: 5,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: '#B7B6BB',
    marginRight: 30,
  },
  icMoney: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  price: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
});
const mapStateToProps = (state) => ({
  chat_id: state.appReducer.chat_id,
  chat_messages: state.appReducer.chat_messages
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps,mapDispatchToProps) (Incoming);
