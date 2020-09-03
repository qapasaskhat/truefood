import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import Background from '../../components/Background';
import axios from 'axios'
import moment from 'moment'
import {icFrame2, icRight, icMoney} from '../../assets';
import AsyncStorage from '@react-native-community/async-storage';
import { Language } from '../../constants/lang';
import { connect } from 'react-redux';

const {width, height} = Dimensions.get('window');
const ratio_1 = width / 1500;

class UserScreen extends React.Component {

  state={ 
    orders :{
      loading: false,
      items: [],
      error: null
    },
    orderItems: [],
    load: false,
    token: ''
  }
  componentDidMount=async()=>{
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    console.log(user.access_token)
    this.setState({
      token: user.access_token
    })
    this.getOrders(user.access_token)
    this.props.navigation.addListener ('willFocus', () =>
      {
        this.getOrders(this.state.token)
      }
    );
  }
  getOrders=(access_token)=>{
    const api = 'http://truefood.kz/api/user/orders'
    var config = {
      method: 'get',
      url: 'http://truefood.kz/api/user/orders',
      headers: { 
        'Authorization': `Bearer ${access_token}`
      }
    };
    this.setState({
      load: true
    })
    
    axios(config)
    .then( (response) =>{
      console.log(JSON.stringify(response.data));
      this.setState({
        orderItems: response.data,
        load: false
      })
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  renderBody = () => {
    const { orderItems,load } = this.state
    return (
      <View style={styles.view}>
        {load ? <ActivityIndicator /> : orderItems.length===0? 
        <Text style={{textAlign: 'center',marginVertical:6}}>{Language[this.props.langId].user.isEmpty}</Text> 
        : orderItems.map((item) => (
          <TouchableOpacity
            onPress={() => {
              //console.log(item)
              this.props.navigation.navigate('OrderScreen',{param: item.order_id })
            }
            }
            style={styles.btn}>
            <Text style={styles.title}>{item.status.name} {moment(item.created_at).format('ll')}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={[styles.horizontal, {marginRight: 30}]}>
                <Image source={icMoney} style={styles.icMoney} />
                <Text style={styles.countText}>{item.total_cashback}</Text>
              </View>
              <Text style={styles.price}>{item.total_price} ₸</Text>
            </View>
            <Image source={icRight} style={styles.img} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  render() {
    const { orderItems,load } = this.state
    return (
      <View style={styles.container}>
        <Header
          title={Language[this.props.langId].menu.historyOrder}
          type={'close'}
          onPressUser={() => {
            console.log('fewewf');
            this.props.navigation.navigate('EditProifle');
          }}
          close={()=>{
            this.props.navigation.goBack()
          }}
        />
        <Background source={icFrame2} style={styles.bgContainer}>
          { this.renderBody()}
        </Background>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgContainer: {
    width: width,
    height: 2960 * ratio_1,
    backgroundColor: '#fff',
  },
  view: {
    flex: 1,
    padding: 12.5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    margin: 15,
    marginTop: 25,
    borderRadius: 10,
  },
  btn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderColor: '#EEEDF1',
    paddingTop: 10,
    paddingBottom: 10,
    height: 50,
    alignItems: 'center',
    maxHeight: 50,
  },
  title: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: '#08050B',
  },
  img: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#B7B6BB',
  },
  push: {
    backgroundColor: '#FE1935',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    paddingTop: 5,
    paddingBottom: 5,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
  },
  icMoney: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  price: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
});
const mapStateToProps = (state) => ({
  langId: state.appReducer.langId
});
export default connect(mapStateToProps)(UserScreen);
