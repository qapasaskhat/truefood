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
import AsyncStorage from '@react-native-community/async-storage';
import { Language } from '../../constants/lang'
import { connect } from 'react-redux'


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
    locations: [],
    access_token: '',
    place_id: '',
    comment: '',
    otvet: '',
    basket: []
  };

  componentDidMount =async()=> {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
    this.setState({
      dateOrder: `Сегодня, в ${moment(this.state.date)}`
    })
    console.log(this.props.navigation.getParam('basket').items)
    this.getPlace()
    this.setState({
      basket: this.props.navigation.getParam('basket').items
    })
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    console.log(user.access_token)
    this.setState({
      access_token: user.access_token
    })
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
    const {number, numberPhone, place_id,comment} = this.state

    var FormData = require('form-data');
    var data = new FormData();
    data.append('phone', numberPhone);
    data.append('cart[0]', '{"quantity":1,"variation_id":1}');
    data.append('payment_type_id', '2');
    data.append('pick_up_at', '12:00');
    data.append('comment', comment);

    var config = {
      method: 'post',
      url: 'http://truefood.chat-bots.kz/api/orders/pickup',
      headers: { 
        'Authorization': `Bearer ${this.state.access_token}`, 
      },
      data : data
    };

    axios(config)
    .then( (response)=> {
      console.log(JSON.stringify(response.data));
    })
    .catch( (error) =>{
      console.log(error);
    });
  }
  delivery=()=>{
    const { number, numberPhone, place_id,comment, basket } = this.state

    var FormData = require('form-data');
    var data = new FormData();
    data.append('phone', numberPhone);
    for (let i=0; i<basket.length; i++){
      //console.log(basket[i].variations[0].product_variation_id)
      data.append(`cart[${i}]`, `{"quantity":${1},"variation_id":${basket[i].variations[0].product_variation_id},"product_id": ${basket[i].product.id}}`);
    }

    data.append('payment_type_id', '2');
    data.append('delivery_place_id', place_id);
    data.append('cabinet_number', number);
    data.append('comment', comment);

    var config = {
      method: 'post',
      url: 'http://truefood.chat-bots.kz/api/orders/pickup',
      headers: { 
        'Authorization': `Bearer ${this.state.access_token}`, 
      },
      data : data
    };

    axios(config)
    .then( (response)=> {
      console.log(JSON.stringify(response.data));
      this.setState({
        otvet: response.data.message
      })
      alert(this.state.otvet)
      this.props.navigation.goBack()
    })
    .catch( (error)=> {
      console.log(error);
    });
  }

  _renderWith = () => {
    const { langId } = this.props
    return (
      <View style={styles.view}>
        <View key={'calendar'}>
          <Text style={styles.h2}>{Language[langId].delivery.pickuptext}:</Text>
          <CalendarButton title={'20:00'} />
        </View>
        <View key={'phone'} style={{marginTop: 10}}>
        <Text style={styles.h2}>{Language[langId].delivery.phone}</Text>
          <TextInput
            value={this.state.number}
            onChangeText={(text) => {
              this.setState({number: text});
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
            value={this.state.comment}
            onChangeText={(comment)=>this.setState({comment:comment})}
          />
        </View>
      </View>
    );
  };
  render() {
    const { langId } = this.props
    return (
      <View style={{flex: 1}}>
        <Header openDrawer={()=>this.props.navigation.openDrawer()}/>
        <ButtonUser />
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
              onPress={(value) => this.setState({type: value})}
            />
            {this.state.type ? this._renderWith() : this._renderWithout()}
          </View>
          <Button
            onPress={() => {
              this.delivery()
              //this.props.navigation.navigate('PayScreen')
            }}
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
const mapStateToProps = (state) => ({
  basket: state.appReducer.basket,
  langId: state.appReducer.langId
});
export default connect(mapStateToProps) (DeliveryScreen);
