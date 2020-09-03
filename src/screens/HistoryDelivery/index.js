import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image,Alert} from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';
import SwitchSelector from 'react-native-switch-selector';
import CalendarButton from '../../components/Button/CalendarButton';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import RadioButton from '../../components/RadioButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Language} from '../../constants/lang';
import {connect} from 'react-redux';
import localization from 'moment/locale/ru';

class HistoryDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      access_token: '',
      type: false,
      locations: [],
      loading: false,
      orders: {},
      number: null,
      comment: '',
      numberPhone: '',
      showTime: '10:00',
      show: false,
    dayType: 0,
    payment_type_id: '1',
    payment_url: null,
    bonus: 0,
    place_id: 1,
    otvet: '',
    details: [],
    showTime: '10:00',
    useBonus: false,
    cardPay: 0,
    };
  }
  componentDidMount = async () => {
      this.setState({
          orders: this.props.navigation.getParam('items'),
          number: this.props.navigation.getParam('items').cabinet_number,
          comment: this.props.navigation.getParam('items').comment,
          numberPhone: this.props.navigation.getParam('items').phone,
          details: this.props.navigation.getParam('items').details,
      })
      console.log(this.props.navigation.getParam('items'))
      let usr = await AsyncStorage.getItem('user');
      let user = JSON.parse(usr);
      this.setState({
        access_token: user.access_token,
      });
      this.getUser(user.access_token);
      this.getPlace()
  };
  getBonus=()=>{
    let bonus = this.state.user.bill
    let totalPrice = this.state.details[0] && this.state.details[0].unit_price
    if (totalPrice>bonus){
      this.setState({
        bonus: bonus,
        cardPay: totalPrice - bonus,
      })
    } else if(totalPrice===bonus){
      this.setState({
        bonus: totalPrice,
        cardPay: 0
      })
    } else if(totalPrice<bonus){
      this.setState({
        bonus: totalPrice,
        cardPay: 0
      })
    }
  }
  delivery=(type)=>{
    const { number, numberPhone, place_id,comment, basket, bonus, payment_type_id, orders ,details} = this.state
    var FormData = require('form-data');
    var data = new FormData();
    data.append('phone', numberPhone);
    for (let i=0; i<details; i++){
      data.append(`cart[${i}]`, `{"quantity":${details[i].unit_quantity},"variation_id":${12},"product_id": ${details[i].entity.product_id}}`);
    }
    data.append('cart[0]','{"quantity":1,"variation_id":12,"product_id":8}')
    data.append('delivery_type_id', '1')
    data.append('delivery_type', type)
    data.append('payment_type_id', `${payment_type_id}`);
    data.append('delievery_place_id', `${place_id}`);
    data.append('cabinet_number', number);
    data.append('message', `${comment}`);
    data.append('bonuses',bonus)
    console.log(details)
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
        alert(this.state.otvet)
        this.props.navigation.replace('Payment',{payment_url: this.state.payment_url})
      }else if(response.status === 200){
        this.setState({
          otvet: response.data.message,
        })
        Alert.alert("Cпасибо",this.state.otvet,[{ text: "OK",style: "cancel" ,onPress: () => console.log("OK Pressed") }],{cancelable: false})
        this.props.navigation.goBack()
      }      
    })
    .catch( (error)=> {
      console.log(error);
      alert(error.message)
      this.setState({
        loading: false
      })
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
  getPlace=()=>{
    axios.get('http://truefood.kz/api/places?local=en').then(response=>{
      console.log(response.data)
      this.setState({
        locations: response.data.locations
      })
      this.setState(state=>{
        const locations = state.locations.map(i=>
          i.id === i.id?
          {...i, active: false}:i);
          return {locations}
      })
    }).catch(err=>{
      console.log(err)
    })
  }
  getUser = (token) => {
    var config = {
      method: 'get',
      url: 'http://truefood.kz/api/user',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            user: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  _renderWith = () => {
    const {langId} = this.props;
    const {show, showTime} = this.state;
    return (
      <View style={styles.view}>
        <View key={'radioView'} style={styles.radioView}>
          <Text style={styles.h2}>Блок Geneva</Text>
        </View>
        <View
          style={{
            marginVertical: 5,
          }}>
          <SwitchSelector
            borderColor={'#FE1935'}
            buttonColor={'#FE1935'}
            style={{borderColor: '#FE1935'}}
            textStyle={styles.text}
            selectedTextStyle={styles.text}
            height={30}
            options={[
              {label: 'сегодня', value: 0},
              {label: 'завтра', value: 1},
            ]}
            initial={0}
            onPress={(value) => {
              this.setState({dayType: value});
            }}
          />
        </View>
          <Text style={styles.h2}>{Language[langId].delivery.time}</Text>
        <CalendarButton
          title={showTime}
          onPress={() => {
            this.setState({
              show: true,
            });
          }}
        />
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
            value={this.state.comment}
            style={{height: 150, borderRadius: 20}}
            multiline={true}
            onChangeText={(comment) => this.setState({comment: comment})}
          />
        </View>
      </View>
    );
  };
  _radioBtn = (id) => {
    this.setState((state) => {
      const locations = state.locations.map((i) =>
        i.id === i.id ? {...i, active: false} : i,
      );
      return {locations};
    });
    this.setState((state) => {
      const locations = state.locations.map((i) =>
        i.id === id ? {...i, active: true} : i,
      );
      return {locations};
    });
    this.setState({
      place_id: id,
    });
  };
  onChange = (date) => {
    console.log(moment(date.nativeEvent.timestamp).format('lll'));
    this.setState({
      date: date.nativeEvent.timestamp,
      dateOrder: moment(date.nativeEvent.timestamp).format('lll').toString(),
    });
  };
  _renderWithout = () => {
    const {langId} = this.props;
    return (
      <View style={styles.view}>
        <View key={'radioView'} style={styles.radioView}>
          {this.state.locations.map((item) => (
            <RadioButton
              item={item}
              radioBtn={() => {
                this._radioBtn(item.id);
              }}
            />
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
            <CalendarButton title={this.state.showTime} onPress={()=>{
              this.setState({
                show: true
              })
            }}/>
            {this.state.show && (
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
            onChangeText={(comment) => this.setState({comment: comment})}
          />
        </View>
      </View>
    );
  };
  render() {
    const {navigation, langId} = this.props;
    const {user, type,useBonus} = this.state;
    return (
      <View style={{flex: 1}}>
        <Header openDrawer={() => navigation.openDrawer()} />
        <ButtonUser name={user.name} cashback={user.bill} />
        <Background>
          <View style={{flex: 1, padding: 12.5}}>
            <Text style={styles.h1}>{Language[langId].delivery.repeat_order}</Text>
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
                this.setState({type: value,show: false});
              }}
            />
            <View
              style={{
                marginVertical: 10,
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
                  this.setState({payment_type_id: value});
                }}
              />
            </View>
            {this.state.type ? this._renderWith() : this._renderWithout()}
          </View>
          <View style={[styles.view,{marginHorizontal: 12.5}]}>
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
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
              <Text style={styles.h2}>{Language[langId].delivery.bonus}</Text>
            </View>
            {
              useBonus?<View style={{flexDirection: 'row', justifyContent:'space-around'}}>
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
              </View>:<View/>
            }
            {/* <TextInput 
              placeholder='2000'
              value={this.state.bonus}
              onChangeText={(text)=>this.setState({bonus:text})}
               /> */}
          </View>
          <Button
            onPress={() => {
                //this.delivery(2)
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
    letterSpacing: 1,
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
  langId: state.appReducer.langId,
});
export default connect(mapStateToProps)(HistoryDelivery);
