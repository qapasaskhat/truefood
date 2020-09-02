import React, { Component } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import Header from '../../components/Header'
import Button from '../../components/Button'
import Background from '../../components/Background'
import axios from 'axios'
import { connect } from 'react-redux'
import { Language } from '../../constants/lang'
import AsyncStorage from '@react-native-community/async-storage'

class GetGiftCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        discountPrice: this.props.navigation.getParam('discountPrice'),
        email: '',
        comment: '',
        token: ''
    };
  }
  componentDidMount=async()=>{
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    this.setState({
      token: user.access_token
    })
  }
  postGift=(price, email, comment)=>{

    var FormData = require('form-data');
    var data = new FormData();
    data.append('email', email);
    data.append('price', price);
    data.append('comment', comment);
    
    var config = {
      method: 'post',
      url: 'http://truefood.kz/api/orders/gift-card',
      headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${this.state.token}`, 
      },
      data : data
    };
    
    axios(config)
    .then( (response)=> {
      console.log(JSON.stringify(response.data));
      this.props.navigation.replace('HomeScreen')
      this.props.navigation.navigate('Payment',{payment_url:response.data.payment_url})
      Alert.alert("Успешно",response.data.message,[{ text: "OK",style: "cancel" ,onPress: () => console.log("OK Pressed") }],{cancelable: false})
    })
    .catch( (error)=> {
      Alert.alert("Ошибка",'Повторите позже',[{ text: "OK",style: "cancel" ,onPress: () => console.log("OK Pressed") }],{cancelable: false})
      console.log(error);
    });
  }
  render() {
      const { discountPrice, email, comment } = this.state
      const { langId } = this.props
    return (
      <View style={{
          flex: 1
      }}>
          <Header title={Language[langId].giftCards.btn} type='back' goBack={()=>this.props.navigation.goBack()}/>
          <Background type='red'>
              <View style={{
                  marginHorizontal: 12,
                  marginTop: 20,
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  paddingHorizontal: 20,
                  paddingTop: 16
              }}>
                  <Text style={{
                      fontSize: 24,
                      lineHeight: 30,
                      color: '#08050B',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      fontFamily: 'OpenSans-Regular',
                  }}>{Language[langId].giftCards.get.title}</Text>
                  <Text style={{
                      fontSize: 14,
                      color: '#08050B',
                      lineHeight: 24,
                      fontWeight: '600',
                      fontStyle: 'normal',
                      fontFamily: 'OpenSans-Regular',
                      marginTop:12
                  }}>{Language[langId].giftCards.get.email}</Text>
                  <TextInput 
                    placeholder='info@mail.ru' 
                    value={email}
                    onChangeText={(email)=>this.setState({email})}
                    placeholderTextColor='#B1AEAE'
                    style={{
                        backgroundColor: '#FFF4F4',
                        borderRadius: 60,
                        paddingVertical: 18,
                        paddingHorizontal: 8,
                        marginTop: 8,
                        marginBottom: 16,
                        fontFamily: 'OpenSans-Regular',
                        fontSize: 16,
                    }}
                     />
                     <Text style={{
                      fontSize: 14,
                      color: '#08050B',
                      lineHeight: 24,
                      fontWeight: '600',
                      fontStyle: 'normal',
                      fontFamily: 'OpenSans-Regular',
                      marginTop:12
                     }}>{Language[langId].giftCards.get.comment} </Text>
                  <TextInput 
                    placeholder={Language[langId].giftCards.get.enter} 
                    placeholderTextColor='#B1AEAE'
                    value={comment}
                    onChangeText={(comment)=>this.setState({comment})}
                    multiline
                    style={{
                        backgroundColor: '#FFF4F4',
                        borderRadius: 30,
                        paddingVertical: 18,
                        paddingHorizontal: 18,
                        marginTop: 8,
                        marginBottom: 16,
                        fontFamily: 'OpenSans-Regular',
                        fontSize: 16,
                        paddingTop: 12,
                        height: 154
                    }}
                     />
              </View>
          </Background>
          <View style={{
                  position: 'absolute',
                  width: '90%',
                  alignSelf: 'center',
                  bottom: 20
              }}>
                  <Text style={{
                      textAlign: 'center',
                      marginBottom: 24,
                      fontSize: 18,
                      lineHeight:30,
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                      fontStyle: 'normal'
                  }}>{Language[langId].giftCards.get.all}: {discountPrice} ₸</Text>
                  <Button title={Language[langId].giftCards.get.btn} onPress={()=>{
                      this.postGift(discountPrice,email)
                  }} />
              </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  langId: state.appReducer.langId
});

export default connect(mapStateToProps) (GetGiftCard);
