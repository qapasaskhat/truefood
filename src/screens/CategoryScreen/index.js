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
import { connect } from 'react-redux'
import { Language } from '../../constants/lang'

const {width, height} = Dimensions.get('window');

const Tag = ({name,id,onPress}) => (
  <TouchableOpacity style={styles.tag} onPress={onPress}>
    <Text style={{color: '#FE1935', fontFamily: 'OpenSans-Regular'}}>
      {name}
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
    },
    byPrice: 'asc'
  };
  filter=(id)=>{
    this.setState({
      byPrice: this.state.byPrice==='asc'? 'desc': 'asc'
    })
    if(id === 1){
      this.getProduct(this.props.navigation.getParam('id').id,true, this.state.byPrice)

    }
  }
  getProduct=(categoryId, byPrice, value)=>{
    const api =`http://truefood.chat-bots.kz/api/products?category=${categoryId}`
    const apiByPrice = `http://truefood.chat-bots.kz/api/products?category=${categoryId}&byPrice=${value}`
    this.setState({
      product: {
        ...this.state.product, loading: true
      }
    })
    axios.get( byPrice?apiByPrice: api).then(response=>{
      console.log(response.data)
      this.setState({
        product: {
          items: response.data,
          loading: false
        }
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
    const {navigation,dispatch, langId} = this.props;
    const {page,product} = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <ButtonUser />
        <Background>
          <View style={{flex: 1, padding: 12.5}}>
            <Text style={styles.title}>{navigation.getParam('id').name}</Text>
            <View style={styles.view}>
              {[{
                id:0,
                name:Language[langId].home.byPopular
              },{
                id:1, 
                name: Language[langId].home.byPrice
              }].map((item) => (
                <Tag name={item.name} onPress={()=>this.filter(item.id)} />
              ))}
            </View>
            {/* <FilterButton /> */}
            <View style={{marginTop: 10}}>
              <FlatList data={product.items}
              renderItem={({item,index})=>(
                <PopularCard 
                  name={item.name} 
                  id={item.id}
                  imgUrl={item.thumbnail}
                  price= {item.variations && item.variations[0].price } 
                  desc={item.description} 
                  discount={item.variations && item.variations[0].discount}
                  navigation={navigation}
                  text={Language[langId].home.basket}
                  dispatch={dispatch} 
                  coinVisible={true}
                  onPress={()=>{
                    //this.addBasket(item)
                  }} 
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

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
const mapStateToProps = (state) => ({
  basket: state.appReducer.basket,
  langId: state.appReducer.langId

});

export default connect(mapStateToProps,mapDispatchToProps) (CategoryScreen);
