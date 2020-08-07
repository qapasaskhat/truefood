import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import Background from '../../components/Background';
import axios from 'axios'
import moment from 'moment'
import {icFrame2, icRight, icMoney} from '../../assets';
const {width, height} = Dimensions.get('window');
const ratio_1 = width / 1500;

class UserScreen extends React.Component {

  state={ 
    orders :{
      loading: false,
      items: [],
      error: null
    },
    orderItems: []
  }
  componentDidMount=()=>{
    this.getOrders()
  }
  getOrders=()=>{
    const api = 'http://truefood.chat-bots.kz/api/user/orders'
    var config = {
      method: 'get',
      url: 'http://truefood.chat-bots.kz/api/user/orders',
      headers: { 
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiODkzNDdkZjkwNDM3ZDJkMGNiNWI1MzNjYzVhOTUzNWM0ZmE1YWE1NjFlOTI5ZGQxMjRhOTI1N2QyOWIyOTM3NjQxY2I5ODJhMWRlNTk0MmUiLCJpYXQiOjE1OTY3MTQwMjMsIm5iZiI6MTU5NjcxNDAyMywiZXhwIjoxNjI4MjUwMDIzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.lOd8AeSVMwFeH6AP-4OJQBSyh9mLrjzDkUFa03r_kQULZ9TFd6x_FNDjAvP82dX_6acDyt2Gxo51W3EqgBFqgWsWl5oePRWCVhXiNysrH9VczGyHMl77gKNmE86OjC3aefMafREH5a8d6rMsZZTDvNOXdBS3ZDL-myUQqLdYK7rSayITdPu6rb2bGEyQ_q0_y_uSQAFXkf5z4CDw-2MOtBTJspcktEWI7-38MIHBVJ-CahHavS7uDsWCsnn3Qv3tH96cH3ru3CSJhiUZ_9iFcijlcHGwx6XB3Gcq0hAkDJSOpjZTd8wNPCDTSxQH4uOEF3bzwQ-CM9aQbxwqxDd6_UvCVvYCkUdWIfIeU0OS0yX0GZK-6U-O9RMFHJc90GCDdbFdCnv0IIn39Ic0RMEc4PTIcu3n3QaJIlKqmIJT2WWrBvldrFjjWWJbn4r7dzfBYmEKg5zOZilEGQIoFCyjygTOGowTFFeqqq85u0zRgmOd2wOcvqc5rMA3eOfF7qBewsX8mXk85ZblmjdMpSwlWrBLLObDjz2juCoNOVE7DI7IhkV0k0Hto9xcfSPktIA53pDCf3vRjmB7A5l4aY1XLFuW1h82FH7rqg9s5qExNCgfjmyw0gBjuOiAtBz2YH5-IQ65F1KdWb5xhxwuAXSJV9cX7oxh5h6Ci4m11FPxHiw'
      }
    };
    
    axios(config)
    .then( (response) =>{
      console.log(JSON.stringify(response.data));
      this.setState({
        orderItems: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  renderBody = () => {
    const { orderItems } = this.state
    const menu = [
      {
        title: 'Заказ от 26.05.2020',
      },
      {
        title: 'Заказ от 26.05.2020',
      },
      {
        title: 'Заказ от 26.05.2020',
      },
    ];
    return (
      <View style={styles.view}>
        {orderItems.map((item) => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('OrderScreen')}
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
    return (
      <View style={styles.container}>
        <Header
          title={'История заказов'}
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
          {this.renderBody()}
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

export default UserScreen;