import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import OrderCard from '../../components/Card/OrderCard';
import {icMoney} from '../../assets';
import Button from '../../components/Button';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'

class OrderScreen extends React.Component {
  state={
    orders: {}
  }
  componentDidMount = async() =>{
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    console.log(user.access_token)
    console.log(this.props.navigation.getParam('param'))
    this.getOrder(user.access_token,this.props.navigation.getParam('param'))
  }
  getOrder=(token,id)=>{
    var config = {
      method: 'get',
      url: `http://truefood.chat-bots.kz/api/user/orders/${id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then( (response) =>{
      console.log(response.data)
      this.setState({
        orders: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getPrice=()=>{
    const { orders } = this.state
    let price = 0
    orders.details && orders.details.map(item=>
      price = price + item.unit_price
      )
    return price
  }
  getCash=()=>{
    const { orders } = this.state
    let cash = 0
    orders.details && orders.details.map(item=>
      cash = cash + item.unit_cashback
      )
    return cash
  }
  render() {
    const { orders } = this.state
    return (
      <View style={{flex: 1}}>
        <Header
          navigation={this.props.navigation}
          goBack={()=>this.props.navigation.goBack()}
          type={'back'}
          title={`Заказ от ${moment(orders.created_at).format('ll')}`}
        />
        <Background>
          <View style={{flex: 1, padding: 12.5}}>
            {orders.details &&  orders.details.map((item) => (
              <OrderCard item={item}  />
            ))}
            <View style={styles.view}>
              <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 18}}>
                Итого:
              </Text>
              <View style={styles.horizontal}>
                <Image source={icMoney} style={styles.icMoney} />
                <Text style={styles.coinTXT}>{this.getCash()}</Text>
              </View>
              <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 18}}>
                {this.getPrice()} ₸
              </Text>
            </View>
            {/* <Button title={'Повторить заказ'} styleBtn={{marginTop: 10}} /> */}
          </View>
        </Background>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  horizontal: {flexDirection: 'row', alignItems: 'center'},
  coinTXT: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    marginLeft: 5,
  },
  icMoney: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default OrderScreen;
