import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image, Alert} from 'react-native';


import Background from '../../components/Background';
import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';
import SwitchSelector from 'react-native-switch-selector';
import CalendarButton from '../../components/Button/CalendarButton';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import RadioButton from '../../components/RadioButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { Language } from '../../constants/lang'
import { connect } from 'react-redux'
import localization from 'moment/locale/ru';


class DeliveryScreen extends React.Component {
  state = {
    type: false,
    numberPhone: '',
    calendarActive: false,
    dateOrder: 'Сегодня, в 14:30',
    date: new Date(Date.now()),
    number: '',
    locations: [],
    access_token: '',
    place_id: '',
    comment: '',
    otvet: '',
    basket: [],
    loading: false,
    time: '',
    token: '',
    user: {},
    bonus: 0,
    payment_url: null,
    payment_type_id: '1',
    show: false,
    showTime: '10:00',
    sendTime: null,
    dayType: 0,
    useBonus: false,
    cardPay: 0
  };

  componentDidMount =async()=> {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
    this.setState({
      dateOrder: `Сегодня, в ${moment(this.state.date)}`
    })
    this.getPlace()
    this.setState({
      basket: this.props.navigation.getParam('basket').items
    })
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    this.setState({
      access_token: user.access_token
    })
    this.getUser(user.access_token)
    this.getBonus()
  }
  getBonus=()=>{
    let bonus = this.state.user.bill
    let totalPrire = this.props.totalPrice
    if (totalPrire>bonus){
      this.setState({
        bonus: bonus,
        cardPay: totalPrire - bonus,
      })
    } else if(totalPrire===bonus){
      this.setState({
        bonus: totalPrire,
        cardPay: 0
      })
    } else if(totalPrire<bonus){
      this.setState({
        bonus: totalPrire,
        cardPay: 0
      })
    }
  }
  getPlace=()=>{
    var config = {
      method: 'get',
      url: 'http://truefood.kz/api/places',
      headers: { 
        'Accept': 'application/json'
      }
    };

    axios(config)
    .then( (response) => {
      console.log(response.data.locations);
      this.setState({
        locations: response.data.locations
      })
      this.setState(state=>{
        const locations = state.locations.map(i=>
          i.id === i.id?
          {...i, active: false}:i);
          return {locations}
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  pickup=()=>{
    const {number, numberPhone, time,comment, basket,bonus,payment_type_id, sendTime} = this.state

    var FormData = require('form-data');
    var data = new FormData();
    data.append('phone', numberPhone);
    for (let i=0; i<basket.length; i++){
      //console.log(basket[i].variations[0].product_variation_id)
      data.append(`cart[${i}]`, `{"quantity":${1},"variation_id":${basket[i].variations[0].product_variation_id},"product_id": ${basket[i].product.id}}`);
    }
    data.append('payment_type_id', `${payment_type_id}`);
    data.append('pick_up_at', sendTime);
    data.append('comment', comment);
    data.append('delivery_type_id', '2')
    data.append('cabinet_number', number);
    data.append('bonuses',bonus)

    var config = {
      method: 'post',
      url: 'http://truefood.kz/api/orders/pickup',
      headers: { 
        'Authorization': `Bearer ${this.state.access_token}`, 
      },
      data : data
    };
    this.setState({
      loading: true
    })
    axios(config)
    .then( (response)=> {
      console.log(JSON.stringify(response.data));
      this.setState({
        otvet: response.data.message,
        loading: false
      })
      Alert.alert("Cпасибо",this.state.otvet,[{ text: "OK",style: "cancel" ,onPress: () => console.log("OK Pressed") }],{cancelable: false})
      this.props.dispatch({type: 'CLEAR_BASKET', payload: []})
      this.props.dispatch({type: 'TOTAL_RESET',})
      this.props.navigation.goBack()
    })
    .catch( (error) =>{
      console.log(error);
      alert(error.message)
      this.setState({
        loading: false
      })
    });
  }
  delivery=(type)=>{
    const { number, numberPhone, place_id,comment, basket,time, bonus, payment_type_id } = this.state
    if ( comment.length>1 )
    {  var FormData = require('form-data');
      var data = new FormData();
      data.append('phone', numberPhone);
      for (let i=0; i<basket.length; i++){
        data.append(`cart[${i}]`, `{"quantity":${basket[i].quantity},"variation_id":${basket[i].variations[0].product_variation_id},"product_id": ${basket[i].product.id}}`);
      }
      data.append('delivery_type_id', '1')
      data.append('delivery_type', type)
      data.append('payment_type_id', `${payment_type_id}`);
      data.append('delievery_place_id', `${place_id}`);
      data.append('cabinet_number', number);
      //data.append('pick_up_at', 12);
      data.append('message', `${comment}`);
      data.append('bonuses',bonus)
      console.log(data)
      var config = {
        method: 'post',
        url: 'http://truefood.kz/api/orders/pickup',
        headers: { 
          'Authorization': `Bearer ${this.state.access_token}`, 
        },
        data : data
      };
      this.setState({
        loading: true
      })
      axios(config)
      .then( (response)=> {
        console.log(JSON.stringify(response));
        if (response.status === 201){
          this.setState({
            payment_url: response.data.payment_url,
            otvet: response.data.message,
          })
          Alert.alert("Cпасибо",this.state.otvet,[{ text: "OK",style: "cancel" ,onPress: () => console.log("OK Pressed") }],{cancelable: false})
          this.props.navigation.replace('Payment',{payment_url: this.state.payment_url})
          this.props.dispatch({type: 'CLEAR_BASKET', payload: []} )
          this.props.dispatch({type: 'TOTAL_RESET'})
        }else if(response.status === 200){
          this.setState({
            otvet: response.data.message,
          })
          alert(this.state.otvet)
          this.props.navigation.goBack()
          this.props.dispatch({type: 'CLEAR_BASKET', payload: []} )
          this.props.dispatch({type: 'TOTAL_RESET'})
        }      
      })
      .catch( (error)=> {
        console.log(error);
        alert(error.message)
        this.setState({
          loading: false
        })
      });}
      else{
        Alert.alert(
          '',
          'Поле не должен быть пустым',{}
        )
      }
  }
  getUser =(token)=>{
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
        console.log('get user',response.data)
        this.setState({
          user: response.data,
          numberPhone: response.data.phone
        })
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  setDateIos = (event, selectedDate) => {
    const {dayType} = this.state
    const currentDate = selectedDate || date;
    console.log(event.timeStamp)
    this.setState({
      showTime: moment(currentDate)
        .locale('ru', localization)
        .add(dayType, 'days').calendar(),
      sendTime: event.timeStamp,
      show: false
    });
  };

  _renderWith = () => {
    const { langId } = this.props
    const { show, showTime } = this.state
    return (
      <View style={styles.view}>
        <View key={'radioView'} style={styles.radioView}>
          <Text style={styles.h2} >Блок Geneva</Text>
        </View>
        <View style={{
          marginVertical: 5
        }}>
        <SwitchSelector
              borderColor={'#FE1935'}
              buttonColor={'#FE1935'}
              style={{borderColor: '#FE1935'}}
              textStyle={styles.text}
              selectedTextStyle={styles.text}
              height={30}
              options={[
                {label: Language[langId].delivery.today, value: 0},
                {label: Language[langId].delivery.tomorrow, value: 1},
              ]}
              initial={0}
              onPress={(value) => {
                this.setState({dayType: value})
              }}
            />
            </View>
            <Text style={styles.h2}>{Language[langId].delivery.time}</Text>
            <CalendarButton title={showTime} onPress={()=>{
              this.setState({
                show: true
              })
            }}/>
            {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={'time'}
              locale={'ru'}
              is24Hour={true}
              display="default"
              onChange={this.setDateIos}
            />
          )}
        <View key={'phone'} style={{marginTop: 10}}>
        <Text style={styles.h2}>{Language[langId].delivery.phone}</Text>
          <TextInput
            value={this.state.numberPhone}
            onChangeText={(text) => {
              this.setState({numberPhone: text});
            }}
          />
        </View>
        <View key={'description'} style={{marginTop: 10}}>
          <Text style={styles.h2}>{Language[langId].delivery.wish}</Text>
          <TextInput
            placeholder={Language[langId].delivery.enter}
            placeholderTextColor={''}
            style={{height: 150, borderRadius: 20}}
            multiline={true}
          />
        </View>
      </View>
    );
  }
  _radioBtn=(id)=>{
    this.setState(state=>{
      const locations = state.locations.map(i=>
        i.id === i.id?
        {...i, active: false}:i);
        return {locations}
    })
    this.setState(state=>{
      const locations = state.locations.map(i=>
        i.id === id?
        {...i, active: true}:i);
        return {locations}
    })
    this.setState({
      place_id: id
    })
  }
  onChange=(date)=>{
    console.log(moment(date.nativeEvent.timestamp).format('lll'));
    this.setState({
      date: date.nativeEvent.timestamp,
      dateOrder: moment(date.nativeEvent.timestamp).format('lll').toString()
    })
  }
  _renderWithout = () => {
    const { langId } = this.props
    const { show, showTime } = this.state
    return (
      <View style={styles.view}>
        <View key={'radioView'} style={styles.radioView}>
          {this.state.locations.map((item) => (
            <RadioButton item={item} radioBtn={()=>{this._radioBtn(item.id)}}/>
          ))}
        </View>
        <View key={'cabinet'} style={{marginTop: 10}}>
          <Text style={styles.h2}>{Language[langId].delivery.cabinet}</Text>
          <TextInput 
            placeholder={'20'}
            value={this.state.number}
            onChangeText={(text) => {
              this.setState({number: text});
            }}
             />
        </View>
        <View style={{
          marginVertical: 5
        }}>
        <SwitchSelector
              borderColor={'#FE1935'}
              buttonColor={'#FE1935'}
              style={{borderColor: '#FE1935'}}
              textStyle={styles.text}
              selectedTextStyle={styles.text}
              height={30}
              options={[
                {label: Language[langId].delivery.today, value: 0},
                {label: Language[langId].delivery.tomorrow, value: 1},
              ]}
              initial={0}
              onPress={(value) => {
                this.setState({dayType: value})
              }}
            />
            </View>
            <Text style={styles.h2}>{Language[langId].delivery.time}</Text>
            <CalendarButton title={showTime} onPress={()=>{
              this.setState({
                show: true
              })
            }}/>
            {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={'time'}
              locale={'ru'}
              is24Hour={true}
              display="default"
              onChange={this.setDateIos}
            />
          )}
        <View key={'phone'} style={{marginTop: 10}}>
          <Text style={styles.h2}>{Language[langId].delivery.phone}</Text>
          <TextInput
            value={this.state.numberPhone}
            placeholder={'Номер телефона'}
            onChangeText={(text) => {
              this.setState({numberPhone: text});
            }}
          />
        </View>
        <View key={'description'} style={{marginTop: 10}}>
          <Text style={styles.h2}>{Language[langId].delivery.wish}</Text>
          <TextInput
            placeholder={Language[langId].delivery.enter}
            placeholderTextColor={''}
            style={{height: 150, borderRadius: 20}}
            multiline={true}
            value={this.state.comment}
            onChangeText={(comment)=>this.setState({comment:comment})}
          />
        </View>
      </View>
    );
  };
  render() {
    const { langId } = this.props
    const {user,useBonus} = this.state
    return (
      <View style={{flex: 1}}>
        <Header openDrawer={()=>this.props.navigation.openDrawer()}/>
        <ButtonUser name={user.name}  cashback={user.bill}/>
        <Background>
          <View style={{flex: 1, padding: 12.5}}>
            <Text style={styles.h1}>{Language[langId].basket.title}</Text>
            <SwitchSelector
              borderColor={'#FE1935'}
              buttonColor={'#FE1935'}
              style={{borderColor: '#FE1935'}}
              textStyle={styles.text}
              selectedTextStyle={styles.text}
              height={55}
              options={[
                {label: Language[langId].delivery.delivety, value: false},
                {label: Language[langId].delivery.pickup, value: true},
              ]}
              initial={0}
              onPress={(value) => {
                this.setState({type: value,show: false})
              }}
            />
            <View style={{
              marginVertical: 10
            }}>
            <SwitchSelector
              borderColor={'#FE1935'}
              buttonColor={'#FE1935'}
              style={{borderColor: '#FE1935'}}
              textStyle={styles.text}
              selectedTextStyle={styles.text}
              height={40}
              options={[
                {label: Language[langId].delivery.online, value: '1'},
                {label: Language[langId].delivery.nal, value: '2'},
              ]}
              initial={0}
              onPress={(value) => {
                this.setState({payment_type_id: value})
              }}
            /></View>
            {this.state.type ? this._renderWith() : this._renderWithout()}
          </View>
          <View style={[styles.view,{marginHorizontal: 12.5}]}>
            <View style={{flexDirection: 'row',alignItems:'center'}}>
              <View style={{
                width:20,
                height:20,
                backgroundColor: '#fff',
                borderRadius: 3,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
                justifyContent:'center',
                alignItems:'center'
              }}>
                <TouchableOpacity onPress={()=>{
                  this.getBonus()
                  this.setState({
                    useBonus: !this.state.useBonus
                  })
                }} style={{
                  width: 13,
                  height: 13,
                  backgroundColor: useBonus?'#FE1935':'#fff',
                  borderRadius: 3
                }}/>
              </View>
              <Text style={styles.h2}>
                {Language[langId].delivery.bonus}<Text style={{color: '#000',opacity: 0.4}}> ({user.bill})</Text>
                </Text>
            </View>
            {useBonus?
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}> 
              <View style={styles.viewCard}>
                <Text style={{textAlign: 'center'}}>
                  {this.state.cardPay}{'\n'} С карты
                </Text>
              </View>
              <View style={styles.viewBonus}>
                <Text style={{textAlign: 'center', color: '#fff'}}>
                {this.state.bonus}{'\n'} бонусы
                </Text>
              </View>
            </View>
            // <TextInput 
            //   placeholder='2000'
            //   value={this.state.bonus}
            //   onChangeText={(text)=>this.setState({bonus:text})}
            //    />
               :<View/>}
          </View>
          <Button
            onPress={() => {
              this.state.type?this.delivery(2):this.delivery(1)
              //this.props.navigation.navigate('PayScreen')
            }}
            loading={this.state.loading}
            title={Language[langId].delivery.checkout}
            styleBtn={{margin: 10}}
          />
        </Background>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    backgroundColor: 'white',
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  h1: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    marginBottom: 20,
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-SemiBold',
    fontWeight: '500',
    letterSpacing: 1
  },
  h2: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  radioView: {
    borderBottomColor: '#EEEDF1',
    borderBottomWidth: 1,
    marginLeft: -15,
    marginRight: -15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
  viewCard:{
    height: 64,
    width:'45%', 
    borderRadius: 11,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewBonus:{
    height: 64,
    width:'45%', 
    borderRadius: 11,
    backgroundColor: '#FE1935',
    justifyContent:'center',
    alignItems: 'center'
  }
});
const mapStateToProps = (state) => ({
  basket: state.appReducer.basket,
  langId: state.appReducer.langId,
  totalPrice: state.appReducer.totalPrice,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps,mapDispatchToProps) (DeliveryScreen);
