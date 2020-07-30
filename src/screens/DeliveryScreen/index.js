import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';

import Background from '../../components/Background';
import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';
import SwitchSelector from 'react-native-switch-selector';
import CalendarButton from '../../components/Button/CalendarButton';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import RadioButton from '../../components/RadioButton';
const options = [
  {label: 'Доставка', value: true},
  {label: 'Забрать из True Food', value: false},
];

class DeliveryScreen extends React.Component {
  state = {
    type: false,
    number: '87479081898',
    address: [
      {name: ' Manhattan', active: true},
      {name: ' Dubai', active: false},
      {name: ' Boston', active: false},
      {name: ' Geneva', active: false},
      {name: ' Tokyo', active: false},
    ],
  };

  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
  }

  _renderWith = () => {
    return (
      <View style={styles.view}>
        <View key={'calendar'}>
          <Text style={styles.h2}>Заберу заказ в:</Text>
          <CalendarButton title={'Сегодня, в 14:30'} />
        </View>
        <View key={'phone'} style={{marginTop: 10}}>
          <Text style={styles.h2}>Ваш номер телефона</Text>
          <TextInput
            value={this.state.number}
            onChangeText={(text) => {
              this.setState({number: text});
            }}
          />
        </View>
        <View key={'description'} style={{marginTop: 10}}>
          <Text style={styles.h2}>Пожелания ко всему заказу</Text>
          <TextInput
            placeholder={'Напишите свои пожелания к заказу'}
            placeholderTextColor={''}
            style={{height: 150, borderRadius: 20}}
            multiline={true}
          />
        </View>
      </View>
    );
  };

  _renderWithout = () => {
    return (
      <View style={styles.view}>
        <View key={'radioView'} style={styles.radioView}>
          {this.state.address.map((item) => (
            <RadioButton item={item} />
          ))}
        </View>
        <View key={'calendar'} style={{paddingTop: 10}}>
          <Text style={styles.h2}>Заберу заказ в:</Text>
          <CalendarButton title={'Сегодня, в 14:30'} />
        </View>
        <View key={'cabinet'} style={{marginTop: 10}}>
          <Text style={styles.h2}>Введите номер кабинета</Text>
          <TextInput placeholder={'20'} />
        </View>
        <View key={'phone'} style={{marginTop: 10}}>
          <Text style={styles.h2}>Ваш номер телефона</Text>
          <TextInput
            value={this.state.number}
            onChangeText={(text) => {
              this.setState({number: text});
            }}
          />
        </View>
        <View key={'description'} style={{marginTop: 10}}>
          <Text style={styles.h2}>Пожелания ко всему заказу</Text>
          <TextInput
            placeholder={'Напишите свои пожеланияк заказу'}
            placeholderTextColor={''}
            style={{height: 150, borderRadius: 20}}
            multiline={true}
          />
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <ButtonUser />
        <Background>
          <View style={{flex: 1, padding: 12.5}}>
            <Text style={styles.h1}>Корзина</Text>
            <SwitchSelector
              borderColor={'#FE1935'}
              buttonColor={'#FE1935'}
              style={{borderColor: '#FE1935'}}
              textStyle={styles.text}
              selectedTextStyle={styles.text}
              height={55}
              options={options}
              initial={this.state.type ? 0 : 1}
              onPress={(value) => this.setState({type: value})}
            />
            {this.state.type ? this._renderWith() : this._renderWithout()}
          </View>
          <Button
            onPress={() => this.props.navigation.navigate('PayScreen')}
            title={'Перейти к оплате'}
            styleBtn={{margin: 10}}
          />
        </Background>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default DeliveryScreen;
