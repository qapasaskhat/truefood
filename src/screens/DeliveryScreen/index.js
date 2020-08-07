import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';


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

const options = [
  {label: 'Доставка', value: false},
  {label: 'Забрать из True Food', value: true},
];
const CalendarView=({active})=>(
  active?<View style={{
    position: 'absolute',
    width:'100%',
    height: '100%',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 1111,
  }}>
    <View style={{
      width:'80%',
      height: '60%',
      borderRadius: 11,
    }}>
    </View>
  </View>:null
)

class DeliveryScreen extends React.Component {
  state = {
    type: false,
    numberPhone: '',
    calendarActive: false,
    dateOrder: 'Сегодня, в 14:30',
    date: new Date(Date.now()),
    number: null,
    locations: []
  };

  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
    this.setState({
      dateOrder: `Сегодня, в ${moment(this.state.date)}`
    })
    console.log(this.props.navigation.getParam('basket'))
    this.getPlace()
    //this.delivery()
  }
  getPlace=()=>{
    axios.get('http://truefood.chat-bots.kz/api/places').then(response=>{
      console.log(response.data.locations)
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
  pickup=()=>{

  }
  delivery=()=>{
    
    var FormData = require('form-data');
    var data = new FormData();
    data.append('phone', '87073039917');
    data.append('cart[0]', '{"quantity":1,"variation_id":1}');
    data.append('payment_type_id', '2');
    data.append('delivery_place_id', '1');
    data.append('cabinet_number', '1');

    var config = {
      method: 'post',
      url: 'http://truefood.chat-bots.kz/api/orders/pickup',
      headers: { 
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiODkzNDdkZjkwNDM3ZDJkMGNiNWI1MzNjYzVhOTUzNWM0ZmE1YWE1NjFlOTI5ZGQxMjRhOTI1N2QyOWIyOTM3NjQxY2I5ODJhMWRlNTk0MmUiLCJpYXQiOjE1OTY3MTQwMjMsIm5iZiI6MTU5NjcxNDAyMywiZXhwIjoxNjI4MjUwMDIzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.lOd8AeSVMwFeH6AP-4OJQBSyh9mLrjzDkUFa03r_kQULZ9TFd6x_FNDjAvP82dX_6acDyt2Gxo51W3EqgBFqgWsWl5oePRWCVhXiNysrH9VczGyHMl77gKNmE86OjC3aefMafREH5a8d6rMsZZTDvNOXdBS3ZDL-myUQqLdYK7rSayITdPu6rb2bGEyQ_q0_y_uSQAFXkf5z4CDw-2MOtBTJspcktEWI7-38MIHBVJ-CahHavS7uDsWCsnn3Qv3tH96cH3ru3CSJhiUZ_9iFcijlcHGwx6XB3Gcq0hAkDJSOpjZTd8wNPCDTSxQH4uOEF3bzwQ-CM9aQbxwqxDd6_UvCVvYCkUdWIfIeU0OS0yX0GZK-6U-O9RMFHJc90GCDdbFdCnv0IIn39Ic0RMEc4PTIcu3n3QaJIlKqmIJT2WWrBvldrFjjWWJbn4r7dzfBYmEKg5zOZilEGQIoFCyjygTOGowTFFeqqq85u0zRgmOd2wOcvqc5rMA3eOfF7qBewsX8mXk85ZblmjdMpSwlWrBLLObDjz2juCoNOVE7DI7IhkV0k0Hto9xcfSPktIA53pDCf3vRjmB7A5l4aY1XLFuW1h82FH7rqg9s5qExNCgfjmyw0gBjuOiAtBz2YH5-IQ65F1KdWb5xhxwuAXSJV9cX7oxh5h6Ci4m11FPxHiw', 
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

  _renderWith = () => {
    return (
      <View style={styles.view}>
        <View key={'calendar'}>
          <Text style={styles.h2}>Заберу заказ в:</Text>
          <CalendarButton title={this.state.dateOrder} />
        </View>
        <View key={'phone'} style={{marginTop: 10}}>
          <Text style={styles.h2}>Ваш номер телефона</Text>
          <TextInput
            value={this.state.number}
            onChangeText={(text) => {
              this.setState({number: text});
            }}
          />
        </View>
        <View key={'description'} style={{marginTop: 10}}>
          <Text style={styles.h2}>Пожелания ко всему заказу</Text>
          <TextInput
            placeholder={'Напишите свои пожелания к заказу'}
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
  }

  onChange=(date)=>{
    console.log(moment(date.nativeEvent.timestamp).format('lll'));
    this.setState({
      date: date.nativeEvent.timestamp,
      dateOrder: moment(date.nativeEvent.timestamp).format('lll').toString()
    })
  }
  _renderWithout = () => {
    return (
      <View style={styles.view}>
        <View key={'radioView'} style={styles.radioView}>
          {this.state.locations.map((item) => (
            <RadioButton item={item} radioBtn={()=>{this._radioBtn(item.id)}}/>
          ))}
        </View>
        <View key={'cabinet'} style={{marginTop: 10}}>
          <Text style={styles.h2}>Введите номер кабинета</Text>
          <TextInput 
            placeholder={'20'}
            value={this.state.number}
            onChangeText={(text) => {
              this.setState({number: text});
            }}
            
             />
        </View>
        <View key={'phone'} style={{marginTop: 10}}>
          <Text style={styles.h2}>Ваш номер телефона</Text>
          <TextInput
            value={this.state.numberPhone}
            onChangeText={(text) => {
              this.setState({numberPhone: text});
            }}
          />
        </View>
        <View key={'description'} style={{marginTop: 10}}>
          <Text style={styles.h2}>Пожелания ко всему заказу</Text>
          <TextInput
            placeholder={'Напишите свои пожеланияк заказу'}
            placeholderTextColor={''}
            style={{height: 150, borderRadius: 20}}
            multiline={true}
          />
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Header openDrawer={()=>this.props.navigation.openDrawer()}/>
        <ButtonUser />
        <Background>
          <View style={{flex: 1, padding: 12.5}}>
            <Text style={styles.h1}>Корзина</Text>
            <SwitchSelector
              borderColor={'#FE1935'}
              buttonColor={'#FE1935'}
              style={{borderColor: '#FE1935'}}
              textStyle={styles.text}
              selectedTextStyle={styles.text}
              height={55}
              options={options}
              initial={0}
              onPress={(value) => this.setState({type: value})}
            />
            {this.state.type ? this._renderWith() : this._renderWithout()}
          </View>
          <Button
            onPress={() => this.props.navigation.navigate('PayScreen')}
            title={'Перейти к оплате'}
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
    fontWeight: '600',
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
});

export default DeliveryScreen;
