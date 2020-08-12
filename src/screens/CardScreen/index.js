import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios'
import { connect } from 'react-redux'

import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';
const {width, height} = Dimensions.get('window');
import Slider from '../../components/Slider';
import TagList from './TagList';
import Button from '../../components/Button';
import {icLeft, icMoney, icAdd, icRemove} from '../../assets';

const BackButton = ({onBack}) => {
  return (
    <TouchableOpacity onPress={() => onBack()} style={styles.btnBack}>
      <Image source={icLeft} style={styles.icLeft} />
    </TouchableOpacity>
  );
};

class CardScreen extends React.Component {
  state = {
    count: 1,
    size: [],
    product:{
      loading: false,
      error: null,
      item: {},
      variations: []
    },
    items: {},
    variations: [],
    loading: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    })
    console.log(this.props.navigation.getParam('param'))
    
    this.getProduct(this.props.navigation.getParam('param'))
    setTimeout(() => {
      console.log('iteeeeeem',
        this.state.product.item
      )
    }, 2000);
    
  }

  getProduct=(id)=>{
    const api = `http://truefood.chat-bots.kz/api/products/${id}`
    this.setState({
      loading: true
    })
    axios.get(api).then(response=>{
      console.log('response' ,response)
      console.log(response.data)
      this.setState({
        items: response.data ,
        variations: response.data.variations,
        loading: false
      })
      let newSize = [...this.state.variations[0].main_attributes];
      newSize.map((item) => {
      if (item.id === 1) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    this.setState({size: newSize});
    }).catch(err=>{
      this.setState({
        product:{
          error: err,
          loading: false}
      })
    })
  }
  

  _changeSize = (i) => {
    let newSize = [...this.state.size];
    newSize.map((item) => {
      if (item.id === i.id) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    this.setState({size: newSize});
  };

  _changeCount = (type) => {
    const {count} = this.state;
    if (type === 'add') {
      this.setState({count: count + 1});
    } else {
      if (count !== 1) {
        this.setState({count: count - 1});
      }
    }
  };
  _renderBody = (product) => {
    //const { product } = this.state
    return (
      <View key={'meduim'} style={styles.width}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>
          {product.description}
        </Text>
        <Text style={styles.sostav}>
          {product.slug}
        </Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>{product.variations && product.variations[0].price} ₸</Text>
          <View style={styles.money}>
            <Image source={icMoney} style={styles.icMoney} />
            <Text style={styles.count}>{product.variations && product.variations[0].cashback}</Text>
          </View>
        </View>
        <TagList />
      </View>
    );
  };
  render() {
    const {navigation} = this.props;
    const {product,items, loading} = this.state
    return (
      <View style={styles.container}>
        <Header openDrawer={() => navigation.openDrawer()} />
        <ButtonUser />
        {loading? <ActivityIndicator /> :<ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20, paddingTop: 10}}>
          <BackButton onBack={() => navigation.goBack()} />
          <Slider imgItems={items.slider_images} />
          {this._renderBody(items)}
          <View key={'bottom'} style={{padding: 10}}>
            <View key={'size'}>
              <Text style={{fontSize: 12, fontFamily: 'OpenSans-SemiBold'}}>
                Размер порции
              </Text>
              <View style={[styles.btmContainer]}>
                {this.state.size.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => this._changeSize(item)}
                    style={[
                      styles.inactiveBtn,
                      item.active && styles.activeBtn,
                      {flex: 1 / this.state.size.length - 0.01},
                    ]}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#08050B',
                        fontFamily: item.active
                          ? 'OpenSans-Bold'
                          : 'OpenSans-Regular',
                      }}>
                      {item.value} {item.dimention}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View key={'count'} style={{marginTop: 10}}>
              <Text style={{fontSize: 12, fontFamily: 'OpenSans-SemiBold'}}>
                Количество порций
              </Text>
              <View style={styles.btmContainer}>
                <TouchableOpacity
                  onPress={() => this._changeCount('remove')}
                  style={[styles.circle, styles.activeBtn]}>
                  <Image
                    source={icRemove}
                    style={{width: 25, height: 25, tintColor: '#B7B7B7'}}
                  />
                </TouchableOpacity>
                <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 16}}>
                  {this.state.count}
                </Text>
                <TouchableOpacity
                  onPress={() => this._changeCount('add')}
                  style={[styles.circle, styles.activeBtn]}>
                  <Image
                    source={icAdd}
                    style={{width: 25, height: 25, tintColor: '#FE1935'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Button title='В Корзину' styleBtn={{margin: 10}} onPress={()=>{
            this.props.dispatch({type: 'ADD_BASKET', payload: items})
            
          }} />
        </ScrollView>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnBack: {
    width: 45,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
    left: 30,
    position: 'absolute',
    zIndex: 1,
  },
  icLeft: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  price: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  name: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
  },
  description: {
    color: '#08050B',
    fontFamily: 'OpenSans-Regular',
    marginTop: 10,
  },
  sostav: {
    color: '#B7B6BB',
    fontFamily: 'OpenSans-Regular',
    marginTop: 10,
  },
  money: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  icMoney: {width: 20, height: 20, resizeMode: 'contain'},
  count: {fontFamily: 'OpenSans-SemiBold', marginLeft: 5},
  tag: {
    backgroundColor: 'rgba(254, 25, 53, 0.08)',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 50,
    marginRight: 10,
  },
  width: {
    padding: 10,
    marginTop: 10,
    borderBottomColor: '#EEEDF1',
    borderBottomWidth: 1,
  },
  btmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 3,
    borderColor: '#F4F4F4',
    borderRadius: 50,
    height: 50,
    maxHeight: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  inactiveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    height: 45,
  },
  activeBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  circle: {
    width: 45,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
const mapStateToProps = (state) => ({
  basket: state.appReducer.basket,
  langId: state.appReducer.langId

});

export default connect(mapStateToProps,mapDispatchToProps) (CardScreen);
