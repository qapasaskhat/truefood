import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import axios from 'axios'
import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';
import Categories from '../../components/Categories';
import PopularList from './PopularList';
import TopList from './TopList';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'

class HomeScreen extends React.Component {
  state={
    popularProduct: {
      loading: false,
      products: [],
      error: null
    },
    topList:{
      loading: false,
      products: [],
      error: null
    },
    category:{
      loading: false,
      category: [],
      error: null
    },
    user:{
      name: '',
      cashback: 0
    },
    token: ''
  }

  getPopularProduct=()=>{
    const api = 'http://truefood.kz/api/products?popular=1'
    this.setState({
      popularProduct: {
        ...this.state.popularProduct, loading: true
      }
    })
    axios.get(api).then(response=>{
      console.log(response.data)
      this.setState({
        popularProduct: {
          products: response.data,
          loading: false}
      })
    }).catch(err=>{
      this.setState({
        popularProduct:{
          error: err,
          loading: false}
      })
    })
  }
  getCategory=()=>{
    const api = 'http://truefood.kz/api/categories'
    this.setState({
      category: {
        ...this.state.category, loading: true
      }
    })
    axios.get(api).then(response=>{
      console.log(response.data)
      this.setState({
        category: {
          category: response.data,
          loading: false}
      })
    }).catch(err=>{
      console.log('err')
      console.log(err)
      this.setState({
        category:{
          error: err,
          loading: false}
      })
    })
  }
  getTopList=()=>{
    const api = 'http://truefood.chat-bots.kz/api/products?dishOfTheWeek=1'
    this.setState({
      topList: {
        ...this.state.topList, loading: true
      }
    })
    axios.get(api).then(response=>{
      console.log(response.data)
      this.setState({
        topList: {
          products: response.data,
          loading: false}
      })
    }).catch(err=>{
      this.setState({
        topList:{
          error: err,
          loading: false}
      })
    })
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
        this.setState({
          user: {
            name: response.data.name,
            cashback: response.data.bill
          }
        })
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  componentDidMount=async()=> {
    if (new Date(Date.now()).getHours()<8 && new Date(Date.now()).getHours()>21 ){
      alert('Наш ресторан работает с 8:00 утра до 21:00 вечера')
    }
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
    this.getPopularProduct()
    this.getTopList()
    this.getCategory()
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    console.log('user');
    //console.log(user)
    this.setState({
      token: user.access_token
    })
    this.getUser(user.access_token)
    this.props.navigation.addListener ('willFocus', () =>
      {
        this.getUser(this.state.token)
      }
    );
    this.props.navigation.addListener ('didFocus', () =>
      {
        console.log('didfocus')
        this.props.navigation.closeDrawer()
      }
    );
  }
  render() {
    const {navigation, dispatch, langId } = this.props;
    const { popularProduct, topList, category, user } = this.state
    return (
      category.error ? <Text>eeerrr</Text> :
      <View style={styles.container}>
        <Header openDrawer={() => navigation.openDrawer()} navigation={navigation} />
        <ButtonUser name = {user.name } cashback={user.cashback}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}>
          <Categories category={category.category['Категорий']} navigation={navigation} dispatch={dispatch} />
          <PopularList 
            loading={popularProduct.loading} 
            items={popularProduct.products} 
            langId={langId}
            onPress={()=>{
              navigation.navigate('CategoryScreen',{id: {id: 'all' ,name: 'Все блюда'}})
            }}
            navigation={navigation} 
            dispatch={dispatch} />
          <TopList navigation={navigation} langId={langId} dispatch={dispatch} items={topList.products} loading={topList.loading} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    margin: 10,
    marginTop: 20,
    marginBottom: 15,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  btnView: {
    backgroundColor: '#FE1935',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  btnText: {
    textTransform: 'uppercase',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
});

const mapStateToProps = (state) => ({
  basket: state.appReducer.basket,
  langId: state.appReducer.langId
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);