import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';

import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';
import SwitchSelector from 'react-native-switch-selector';

const {width, height} = Dimensions.get('window');

import {icApple, icGoogle, shtih} from '../../assets';
import {TextInput} from 'react-native-gesture-handler';
import Button from '../../components/Button';

const PayButton = ({source}) => (
  <TouchableOpacity style={styles.payButton}>
    <Image
      source={source}
      style={{width: 64, height: 24, resizeMode: 'contain'}}
    />
  </TouchableOpacity>
);
class DeliveryScreen extends React.Component {
  state = {
    type: true,
    options: [
      {label: 'НАЛИЧНЫМИ', value: true},
      {label: 'КАРТОЙ', value: false},
    ]
  };

  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
  }

  card = () => (
    <View key={'card'}>
      <View key={'number'} style={{paddingTop: 10}}>
        <Text style={styles.h2}>Номер карты:</Text>
        <View style={styles.view1}>
          <TextInput
            style={{height: 50, borderRadius: 50, flex: 1}}
            placeholder={'1234 1234 1234 1234'}
            maxLength={16}
            placeholderTextColor={'#B7B6BB'}
          />
          <TouchableOpacity>
            <Image source={shtih} style={{width: 20, height: 20}} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View key={'date'} style={{paddingTop: 10, width: '46%'}}>
          <Text style={styles.h2}>ММ/ГГ:</Text>
          <View style={styles.view1}>
            <TextInput
              style={{height: 50, borderRadius: 50, flex: 1}}
              placeholder={'12/34'}
              maxLength={4}
              placeholderTextColor={'#B7B6BB'}
            />
          </View>
        </View>
        <View key={'cvv'} style={{paddingTop: 10, width: '46%'}}>
          <Text style={styles.h2}>CVV-код:</Text>
          <View style={styles.view1}>
            <TextInput
              style={{height: 50, borderRadius: 50, flex: 1}}
              placeholder={'123'}
              maxLength={3}
              keyboardType='numeric'
              placeholderTextColor={'#B7B6BB'}
            />
          </View>
        </View>
      </View>
      <View key={'name'} style={{paddingTop: 10}}>
        <Text style={styles.h2}>Имя держателя:</Text>
        <View style={styles.view1}>
          <TextInput
            style={{height: 50, borderRadius: 50, flex: 1}}
            placeholder={'ИМЯ ФАМИЛИЯ'}
            placeholderTextColor={'#B7B6BB'}
          />
        </View>
      </View>
    </View>
  );
  noCard = ()=>(
    <View>
      <Text>НАЛИЧНЫМИ</Text>
    </View>
  )
  render() {
    return (
      <View style={{flex: 1}}>
        <Header openDrawer={() => this.props.navigation.openDrawer()}/>
        <ButtonUser />
        <View style={{flex: 1, padding: 12.5}}>
          <Text style={styles.h1}>Оплата</Text>
          <SwitchSelector
            hasPadding
            borderColor={'#FE1935'}
            buttonColor={'#FE1935'}
            style={{borderColor: '#FE1935'}}
            textStyle={styles.text}
            selectedTextStyle={styles.text}
            height={55}
            options={this.state.options}
            initial={1}
            onPress={(value) => this.setState({type: !this.state.type})}
          />
          <View>
            {this.state.type && <View style={styles.horizontal}>
              <PayButton source={icGoogle} />
              <PayButton source={icApple} />
            </View>}
            <View style={styles.line} />
            {this.state.type ? this.card() : this.noCard()} 
            <View style={{marginTop: 15}}>
              <Text style={{fontFamily: 'OpenSans-SemiBold'}}>
                Сумма заказа
              </Text>
              <Text style={styles.price}>395 ₸</Text>
            </View>
          </View>
          <Button onPress={()=>{}} title={'оПЛАТИТЬ ЗАКАЗ'} styleBtn={{marginTop: 20}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  price: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    marginTop: 5,
  },
  line: {
    backgroundColor: '#EEEDF1',
    height: 1,
    width: width,
    marginTop: 20,
    marginLeft: -12.5,
  },
  view: {
    backgroundColor: 'white',
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  h1: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    marginBottom: 20,
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-SemiBold',
    fontWeight: '600',
  },
  h2: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  radioView: {
    borderBottomColor: '#EEEDF1',
    borderBottomWidth: 1,
    marginLeft: -15,
    marginRight: -15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
  payButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: 'white',
    width: '45%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  view1: {
    backgroundColor: '#F8F8F8',
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DeliveryScreen;
