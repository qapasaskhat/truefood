import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';
import AsyncStorage from '@react-native-community/async-storage'

import BasketCard from '../../components/BasketCard';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import axios from 'axios'
import { Language } from '../../constants/lang'

class BasketScreen extends React.Component {

  state={
    basketProduct: [],
    loading: false,
    token: '',
    user: {},
    price: 0
  }

  componentDidMount= async()=> {
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    console.log(user.access_token)
    this.setState({
      token: user.access_token
    })
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
    console.log(this.props.basket.length)
    this.getBasket()
    this.getUser(this.state.token)
    this.props.navigation.addListener ('willFocus', () =>
      {
        this.getBasket()
        console.log(this.props.basket)
        this.props.dispatch({type: 'TOTAL_PRICE'})
        this.props.basket.length === 0 && this.setState({
          basketProduct: []
        })
        this.getUser(this.state.token)
      }
    );
    this.props.navigation.addListener ('didFocus', () =>
      {
        console.log('didfocus')
        this.props.navigation.closeDrawer()
      }
    );
    this.props.dispatch({type: 'TOTAL_PRICE'})
  }
  getAllMoney=()=>{
    const { basketItems } = this.props
    let money = 0
    basketItems.map(item=>{
      money = money + item.variations[0].price * item.quantity
    })
    this.setState({
      price: money
    })
  }
  getBasket=()=>{
    const { basket } = this.props
    let api = 'http://truefood.chat-bots.kz/api/basket/mobile?'
    for(let i=0; i<basket.length; i++){
      const a = basket.length===i+1?'': '&'
      api = api + `cart[${i}][product]=${basket[i].id}&cart[${i}][selected_variation]=${1}&cart[${i}][quantity]=${basket[i].quantity}${a}` //basket[i].quantity
    }
    console.log(api)
      var config = {
        method: 'get',
        url: api,
        headers: { 
          'Accept': 'application/json',
        }
      };
      axios(config)
      .then( (response) =>{
        console.log(response.data.cart);
        this.props.dispatch({type: 'GET_BASKET', payload: response.data.cart})
        this.props.dispatch({type: 'TOTAL_PRICE'})
        this.setState({basketProduct: response.data.cart})
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  deleteBAsketItem=(id)=>{
    this.props.dispatch({type: 'DELETE_BASKET_ITEM', payload: id} )
    this.props.dispatch({type: 'TOTAL_PRICE'})
    this.setState(state => {
      const basketProduct = this.state.basketProduct.filter(item=>item.id !== id)
      return {
        basketProduct,
      };
    });
    setTimeout(() => {
      this.getBasket()
    }, 1000);
  }
  getUser =(token)=>{
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
        this.setState({
          user: response.data
        })
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  render() {
    const {navigation, dispatch, basket, langId, basketItems, totalPrice} = this.props;
    const { basketProduct, loading,user,price } = this.state
    return (
      <View style={{flex: 1}}>
        <Header openDrawer={() => navigation.openDrawer()} navigation={navigation}/>
        <ButtonUser name={user.name} cashback={user.bill} />
        <Background>
         { loading? <ActivityIndicator />:
          <View style={{flex: 1, padding: 12.5}}>  
            <FlatList 
            data={basketItems}
            ListFooterComponent={
              <View>
                {totalPrice !== 0?
                <Button
                onPress={() => this.props.navigation.navigate('DeliveryScreen',{basket: {name: 'basket', items: basketProduct}})}
                title={`${Language[langId].basket.delivery} ${totalPrice} ₸`}/>: null}
              <Button
                title={Language[langId].basket.add}
                styleBtn={styles.styleBtn}
                styleText={styles.styleText}
                onPress={()=>{
                  navigation.navigate('HomeScreen')
                }}/>
              </View>}
            ListHeaderComponent={<Text style={styles.h1}>{Language[langId].basket.title}</Text>}
            renderItem={({item})=>(
              //basket.length !==0 &&
              <BasketCard langId={langId} item={item} onPress={()=>this.deleteBAsketItem(item.product.id)}/>
            )}
            ListEmptyComponent={
            <Text style={styles.h1}>{Language[langId].basket.empty}</Text>
            }
             />
          </View>}
        </Background>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    marginBottom: 20,
  },
  styleBtn: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FE1935',
  },
  styleText: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
  },
});
const mapStateToProps = (state) => ({
  basket: state.appReducer.basket,
  langId: state.appReducer.langId,
  basketItems: state.appReducer.basketItems,
  totalPrice: state.appReducer.totalPrice
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps,mapDispatchToProps) (BasketScreen);
