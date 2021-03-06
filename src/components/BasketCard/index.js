import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';

import {icMoney, icClose, icRemove, icAdd} from '../../assets';
import Accordion from 'react-native-collapsible/Accordion';
import CalendarButton from '../../components/Button/CalendarButton';
import DownButton from '../../components/Button/DownButton';
import { Language } from '../../constants/lang'
import {connect} from 'react-redux'

class BasketScreen extends React.Component {
  state = {
    count: 1,
    size: [],
    activeSections: [],
  };
  componentDidMount=()=>{
    
    const { item } = this.props
    let newSize = [...item.variations]
      newSize.map((item) => {
      if (item.id === 1) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    this.setState({size: newSize});
    this.setState({
      count: parseInt(item.quantity)
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
    const { item } = this.props
    if (type === 'add') {
      this.props.dispatch({type: 'CHANGE_QUANTITY_ADD', payload: item.product.id})
      this.props.dispatch({type: 'TOTAL_PRICE'})
      //this.setState({count: count + 1});
    } else {
      if (item.quantity !== 1) {
        this.props.dispatch({type: 'CHANGE_QUANTITY', payload: item.product.id})
        this.props.dispatch({type: 'TOTAL_PRICE'})
       // this.setState({count: count - 1});
      }
    }
  };

  _renderHeader = (item) => {
    const {onPress} = this.props
    return (
      <View key={'header'} style={styles.container}>
        <Image
          style={styles.foodImg}
          source={{
            uri:
              item.product.thumbnail,
          }}
        />
        <View style={[styles.body]}>
          <TouchableOpacity onPress={onPress} style={[styles.close,{ backgroundColor: '#fff', zIndex:1001}]} >
            <Image
              source={icClose}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        <Text style={styles.title}>{item.product.name}</Text>
          <Text style={styles.description}>
            {item.product.description}
          </Text>
          <View style={styles.bottom}>
            <View style={styles.horizontal}>
              <Image source={icMoney} style={styles.icMoney} />
              <Text style={styles.coinTXT}>{item.variations && item.variations[0].cashback}</Text>
            </View>
            <Text style={styles.price}>{item.variations && item.variations[0].price} ₸</Text>
          </View>
        </View>
      </View>
    );
  };

  _renderSize = (item) => {
    const { langId } = this.props
    return (
      <View key={'size'}>
        <Text style={{fontSize: 12, fontFamily: 'OpenSans-SemiBold'}}>
          {Language[langId].cart.text1}
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
                {item.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  _renderCount = () => {
    const { langId,item } = this.props
    return (
      <View key={'count'} style={{marginTop: 10}}>
        <Text style={{fontSize: 12, fontFamily: 'OpenSans-SemiBold'}}>
          {Language[langId].cart.text}
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
            {item.quantity}
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
    );
  };

  _renderBottom = (item) => {
    return (
      <View
        key={'bottom'}
        style={{padding: 10, paddingLeft: 20, paddingRight: 20}}>
        {/* {this._renderSize(item)} */}
        {this._renderCount()}
      </View>
    );
  };

  _renderHeader1 = (content, index, isActive, section) => {
    console.log(content, index, isActive, section);
    return (
      <View
        style={{backgroundColor: '#EEEDF1', paddingTop: 10, paddingBottom: 10}}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'OpenSans-SemiBold',
            textAlign: 'center',
          }}>
          {isActive
            ? 'Скрыть дополнительные параметры'
            : 'Показать дополнительные параметры'}
        </Text>
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View
        style={{
          paddingBottom: 3,
          paddingTop: 3,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <View key={'zakaz'} style={{paddingTop: 10}}>
          <Text style={styles.h2}>Добавить к заказу</Text>
          <DownButton title={'Выбрано 2 товара'} money={50} />
        </View>
        <View key={'calendar'} style={{paddingTop: 10}}>
          <Text style={styles.h2}>Заберу заказ в:</Text>
          <CalendarButton title={'Сегодня, в 14:30'} />
        </View>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({activeSections});
  };
  render() {
    const { item, langId, deleleItem } = this.props
    return (
      <View key={'basketCard'} style={styles.shadow}>
        {this._renderHeader(item)}
        {this._renderBottom(item.variations && item.variations)}
        {/* <Accordion
          sections={SECTIONS}
          touchableComponent={TouchableOpacity}
          activeSections={this.state.activeSections}
          renderHeader={this._renderHeader1}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        /> */}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,

    borderWidth: 0.7,
    borderColor: '#E9E9E9',
  },
  h1: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    marginBottom: 20,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  horizontal: {flexDirection: 'row', alignItems: 'center'},

  foodImg: {
    width: '30%',
    height: 120,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  body: {
    width: '70%',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  description: {
    color: '#B7B6BB',
    fontFamily: 'OpenSans-Regular',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  btnView: {
    backgroundColor: '#FE1935',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
    paddingLeft: 13,
    paddingRight: 13,
  },
  btnText: {
    textTransform: 'uppercase',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  coinTXT: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    marginLeft: 5,
  },
  icMoney: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
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
  shadow: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 20,
  },
  add: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: '#FE1935',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 12,
  },
  h2: {
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
    margin: 10,
    marginTop: 0,
    marginBottom: 5,
    marginLeft: 0,
  },
});

const mapStateToProps = (state) => ({
  langId: state.appReducer.langId,
  basketItems: state.appReducer.basketItems,
  basket: state.appReducer.basket,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps,mapDispatchToProps)(BasketScreen);
