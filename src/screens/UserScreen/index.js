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
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationActions, StackActions } from 'react-navigation'
import {connect} from 'react-redux'
import {Language} from '../../constants/lang'

import {icFrame, icRight} from '../../assets';
const {width, height} = Dimensions.get('window');
const ratio_1 = width / 1500;

class UserScreen extends React.Component {


  renderBody = () => {
    const {langId} = this.props

    const menu = [
      {
        title: Language[langId].menu.historyOrder,
        renderCenter: () => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Incoming')}
            style={styles.push}>
            <Text style={{color: 'white', fontFamily: 'OpenSans-Bold'}}>
              +1
            </Text>
          </TouchableOpacity>
        ),
        onPress: () => {
          this.props.navigation.navigate('HistoryOrder');
        },
      },
      
    ];

    return (
      <View style={styles.view}>
        {menu.map((item) => (
          <TouchableOpacity onPress={() => item.onPress()} style={styles.btn}>
            <Text style={styles.title}>{item.title}</Text>
            {item.renderCenter && item.renderCenter()}
            <Image source={icRight} style={styles.img} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.btn, {borderBottomWidth: 0}]} onPress={()=>{
          this.logout()
        }}>
          <Text style={[styles.title, {color: '#FE1935'}]}>{Language[langId].user.singout}</Text>
          <Image source={icRight} style={styles.img} />
        </TouchableOpacity>
      </View>
    );
  };

  logout=async()=>{
    await AsyncStorage.removeItem('user');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'AppLoading'})]
    })
    this.props.navigation.dispatch(resetAction)
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          type={'profile'}
          onPressUser={() => {
            console.log('fewewf');
            this.props.navigation.navigate('EditProifle');
          }}
        />
        <Background source={icFrame} style={styles.bgContainer}>
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
    fontSize: 15,
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
});
const mapStateToProps = (state) => ({
  langId: state.appReducer.langId
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps,mapDispatchToProps) (UserScreen);
