import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Header from '../../components/Header'
import Button from '../../components/Button'
import Background from '../../components/Background'
import axios from 'axios'

class GetGiftCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        discountPrice: this.props.navigation.getParam('discountPrice'),
        email: '',
        comment: ''
    };
  }
  componentDidMount=()=>{
      
  }
  postGift=(price, email)=>{
    // fetch('http://truefood.chat-bots.kz/api/orders/gift-card', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       price: '2000',
    //       email: 'tomboffos@gmail.com'
    //     })
    //   }).then(function(response){
    //     console.log(JSON.stringify(response));
    //   })
      const gift = {
          price: price,
          email: email
      }
      const api = `http://truefood.chat-bots.kz/api/orders/gift-card`
      var data = new FormData();
        data.append('price', '2000');
        data.append('email', 'tomboffos@gmail.com');
      var config = {
        method: 'post',
        url: api,
        
        data: data
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
      const { discountPrice, email, comment } = this.state
    return (
      <View style={{
          flex: 1
      }}>
          <Header title='Оформление' type='back' goBack={()=>this.props.navigation.goBack()}/>
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
                  }}>Введите данные {'\n'}адресата</Text>
                  <Text style={{
                      fontSize: 14,
                      color: '#08050B',
                      lineHeight: 24,
                      fontWeight: '600',
                      fontStyle: 'normal',
                      fontFamily: 'OpenSans-Regular',
                      marginTop:12
                  }}>Введите e-mail получателя</Text>
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
                     }}>Введите комментарий </Text>
                  <TextInput 
                    placeholder='Можете написать несколько хороших слов получателю :)' 
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
                  }}>Итого: {discountPrice} ₸</Text>
                  <Button title='Перейти к оплате' onPress={()=>{
                      this.postGift(discountPrice,email)
                  }} />
              </View>
      </View>
    );
  }
}

export default GetGiftCard;
