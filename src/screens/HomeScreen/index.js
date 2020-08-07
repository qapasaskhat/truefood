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
    }
  }

  getPopularProduct=()=>{
    const api = 'http://truefood.chat-bots.kz/api/products?popular=1'
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
    const api = 'http://truefood.chat-bots.kz/api/categories'
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

  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
    this.getPopularProduct()
    this.getTopList()
    this.getCategory()

    // const card = [
    //   {
    //     'quantity': '1',
    //     'product': '1',
    //     'selected_variation': '1',
    //   }
    // ]
    // fetch('http://truefood.chat-bots.kz/api/orders/pickup',{
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(card)
    // }).then(response=>{
    //   console.log(response)
    // }).catch(error=>{
    //   console.log(error)
    // })

  }
  render() {
    const {navigation, dispatch} = this.props;
    const { popularProduct, topList, category } = this.state
    return (
      <View style={styles.container}>
        <Header openDrawer={() => navigation.openDrawer()} />
        <ButtonUser />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}>
          <Categories category={category.category.categories} navigation={navigation} dispatch={dispatch} />
          <PopularList 
            loading={popularProduct.loading} 
            items={popularProduct.products} 
            navigation={navigation} 
            dispatch={dispatch} />
          <TopList dispatch={dispatch} items={topList.products} loading={topList.loading} />
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
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);