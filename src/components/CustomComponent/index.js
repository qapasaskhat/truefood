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
import {Language} from '../../constants/lang'
import {connect} from 'react-redux'

const options = [
  {label: 'ENG', value: 0},
  {label: 'РУС', value: 1},
];

const socail = [
  {icon: icFb},
  {icon: icTwitter},
  {icon: icInstagram},
  {icon: icVk},
];


class CustomComponent extends Component {
  changeLang=(value)=>{
    this.props.dispatch({type: 'CHANGE_LANG', payload: value} )
  }
  render() {
    const { langId } = this.props
    this.list = [
      // {
      //   id: 0,
      //   name: Language[langId].menu.settings,
      //   icon: icSettings,
      //   routeName: 'SettingScreen'
      // },
      {
        id: 1,
        name: Language[langId].menu.historyOrder,
        icon: icList,
        routeName: 'HistoryOrder'
      },
      {
        id: 2,
        name: Language[langId].menu.about,
        icon: icFlag,
        routeName: 'AboutScreen'
      },
      {
        id: 3,
        name: Language[langId].menu.support,
        icon: icGroup,
        routeName: 'SupportScreen'
      },
    ];
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
          <Image source={icClose} style={styles.icClose} />
        </TouchableOpacity>
        <Image source={icLogo} style={styles.icLogo} />
        {this.list.map((item) => (
          <TouchableOpacity 
            style={styles.btn} 
            key={`${item.id}`}
            onPress={()=>{
              this.props.navigation.navigate(item.routeName)
            }}
            >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.textBtn}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
        onPress={()=>{
          //alert('gifts')
          this.props.navigation.navigate('DiscountScreen')
        }}
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
            initial={langId}
            onPress={(value) =>
              this.changeLang(value)
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

const mapStateToProps = (state) => ({
  langId: state.appReducer.langId
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps,mapDispatchToProps)(CustomComponent);
