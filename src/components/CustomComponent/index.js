import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  icClose,
  icLogo,
  icList,
  icFlag,
  icGroup,
  icSettings,
  icGift,
  icInstagram,
  icTwitter,
  icFb,
  icVk,
} from '../../assets';

import SwitchSelector from 'react-native-switch-selector';

const options = [
  {label: 'РУС', value: '1'},
  {label: 'ENG', value: '1.5'},
];

const socail = [
  {icon: icFb},
  {icon: icTwitter},
  {icon: icInstagram},
  {icon: icVk},
];

const list = [
  {
    name: 'Настройки',
    icon: icSettings,
    routeName: 'SettingScreen'
  },
  {
    name: 'История заказов',
    icon: icList,
    routeName: 'HistoryOrder'
  },
  {
    name: 'О нас / Контакты',
    icon: icFlag,
    routeName: 'AboutScreen'
  },
  {
    name: 'Обратная связь или помощь',
    icon: icGroup,
    routeName: ''
  },
];

class CustomComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
          <Image source={icClose} style={styles.icClose} />
        </TouchableOpacity>
        <Image source={icLogo} style={styles.icLogo} />
        {list.map((item) => (
          <TouchableOpacity 
            style={styles.btn} 
            onPress={()=>{
              this.props.navigation.navigate(item.routeName)
            }}
            >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.textBtn}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.btn,
            {backgroundColor: 'rgba(254, 25, 53, 0.08)', borderBottomWidth: 0},
          ]}>
          <Image source={icGift} style={styles.icon} />
          <Text style={styles.text}>Gift cards</Text>
        </TouchableOpacity>
        <View style={styles.switch}>
          <SwitchSelector
            textColor={'#B7B6BB'}
            borderColor={'#B7B6BB'}
            buttonColor={'#FE1935'}
            style={{borderColor: '#FE1935'}}
            textStyle={styles.textSwitch}
            selectedTextStyle={styles.textSwitch}
            height={33}
            options={options}
            initial={0}
            onPress={(value) =>
              console.log(`Call onPress with value: ${value}`)
            }
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {socail.map((item) => (
            <TouchableOpacity>
              <Image
                source={item.icon}
                style={{width: 20, height: 20, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  switch: {
    height: 33,
    width: '40%',
    margin: 10,
    marginBottom: 45,
    marginTop: 30,
  },
  icClose: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#FE1935',
    margin: 15,
    marginTop: 25,
  },
  icLogo: {
    width: '50%',
    height: 65,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 55,
    marginRight: 30,
    marginBottom: 65,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    padding: 15,
  },
  textBtn: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    marginLeft: 15,
  },
  text: {
    color: '#FE1935',
    fontFamily: 'OpenSans-SemiBold',
    marginLeft: 15,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textSwitch: {
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-SemiBold',
    fontWeight: '600',
  },
});

export default CustomComponent;
