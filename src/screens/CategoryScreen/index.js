import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';
import FilterButton from '../../components/FilterButton';
import Background from '../../components/Background';
import {icTop} from '../../assets';
import {PopularCard} from '../../components/Card';
import axios from 'axios'

const {width, height} = Dimensions.get('window');

const Tag = ({item}) => (
  <TouchableOpacity style={styles.tag}>
    <Text style={{color: '#FE1935', fontFamily: 'OpenSans-Regular'}}>
      {item}
    </Text>
    <Image source={icTop} style={styles.icTop} />
  </TouchableOpacity>
);

class CategoryScreen extends React.Component {
  state = {
    page: 1,
    product:{
      loading: false,
      error: null,
      items: []
    }
  };
  getProduct=(categoryId)=>{
    const api =`http://truefood.chat-bots.kz/api/products?category=${categoryId}`
    this.setState({
      product: {
        ...this.state.product, loading: true
      }
    })
    axios.get(api).then(response=>{
      console.log(response.data)
      this.setState({
        product: {
          items: response.data,
          loading: false}
      })
    }).catch(err=>{
      this.setState({
        product:{
          error: err,
          loading: false}
      })
    })
  }
  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
    console.log(this.props.navigation.getParam('id').name)
    this.getProduct(this.props.navigation.getParam('id').id)
  }
  render() {
    const {navigation} = this.props;
    const {page,product} = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <ButtonUser />
        <Background>
          <View style={{flex: 1, padding: 12.5}}>
            <Text style={styles.title}>{navigation.getParam('id').name}</Text>
            <View style={styles.view}>
              {['по популярности', 'по цене'].map((item) => (
                <Tag item={item} />
              ))}
            </View>
            <FilterButton />
            <View style={{marginTop: 10}}>
              <FlatList data={product.items}
              renderItem={({item,index})=>(
                <PopularCard 
                  name={item.name} 
                  price= {item.variations && item.variations[0].price } 
                  desc={item.description} 
                  discount={item.variations && item.variations[0].discount}
                  navigation={navigation} 
                  coinVisible={true} 
                  key={index}/>
              )}
              ListEmptyComponent={
                <Text style={{
                  textAlign: 'center',
                  fontFamily: 'OpenSans-SemiBold',
                  fontWeight: '200'
                }}>пусто</Text>
              }
               />
            </View>
            {/* { product.items.length !==0 && <View style={styles.pagination}>
              {  [1, 2, 3, 4].map((item) => (
                <TouchableOpacity onPress={() => this.setState({page: item})}>
                  <Text
                    style={{
                      color: page === item ? '#FE1935' : '#08050B',
                      fontFamily: 'OpenSans-SemiBold',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>} */}
          </View>
        </Background>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imaContainer: {
    padding: 0,
    backgroundColor: '#f3f5f7',
    height: '105%',
    width: '100%',
  },
  pagination: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imgStyle: {
    resizeMode: 'repeat',
    overflow: 'visible',
    backfaceVisibility: 'visible',
    flex: 1,
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
  },
  tag: {
    backgroundColor: '#FFEFF1',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 50,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icTop: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  view: {flexDirection: 'row', marginTop: 20, marginBottom: 15},
});

export default CategoryScreen;
