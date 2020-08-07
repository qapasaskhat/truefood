import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';

import BasketCard from '../../components/BasketCard';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import axios from 'axios'

class BasketScreen extends React.Component {

  state={
    basketProduct: [],
    loading: false
  }

  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
    console.log(this.props.basket.length)
    this.getBasket()
  }

  getAllMoney=()=>{
    const { basket } = this.props
    let money = 0
    basket.map(item=>{
      money = money+ item.variations[0].price
    })
    return money
  }
  getBasket=()=>{
    const { basket } = this.props
    let api = 'http://truefood.chat-bots.kz/api/basket/mobile?'
    for(let i=0; i<basket.length; i++){
      api = api + `cart[${i}][product]=${1}&cart[0][selected_variation]=${1}`
    }
    console.log(api)
      var config = {
        method: 'get',
        url: api,
        headers: { }
      };
      
      axios(config)
      .then( (response) =>{
        console.log(response.data.cart);
        this.setState({basketProduct: response.data.cart})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const {navigation, dispatch, basket} = this.props;
    const { basketProduct, loading } = this.state
    return (
      <View style={{flex: 1}}>
        <Header openDrawer={() => navigation.openDrawer()}/>
        <ButtonUser />
        <Background>
         { loading?<ActivityIndicator />:
          <View style={{flex: 1, padding: 12.5}}>  
            <FlatList 
            data={basketProduct}
            ListFooterComponent={
              <View>
                {
                  basket.length !== 0
                ?
                <Button
                onPress={() => this.props.navigation.navigate('DeliveryScreen',{basket: basketProduct})}
                title={`Оформить за ${this.getAllMoney()} ₸`}
              />: null}
              <Button
                title={'Добавить еще блюда'}
                styleBtn={styles.styleBtn}
                styleText={styles.styleText}
                onPress={()=>{
                  navigation.navigate('HomeScreen')
                }}
              />
              </View>
            }
            ListHeaderComponent={<Text style={styles.h1}>Корзина</Text>}
            renderItem={({item})=>(
              <BasketCard item={item} />
            )}
            ListEmptyComponent={
              <Text style={styles.h1}>Пусто</Text>
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
});

export default connect(mapStateToProps) (BasketScreen);
