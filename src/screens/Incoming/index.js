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

import {icFrame2, icRight, icMoney} from '../../assets';
const {width, height} = Dimensions.get('window');
const ratio_1 = width / 1500;

class Incoming extends React.Component {
  constructor(props){
    super(props)
    this.state={}
  }
  renderBody = () => {
    const menu = [
      {
        title: 'Новая акция от TRUE...',
        open: true,
        date: '12.10.2020',
      },
      {
        title: 'Ваше обращение за...',
        open: true,
        date: '12.10.2020',
      },
      {
        title: 'Здравствуйте! Мы хо...',
        open: false,
        date: '12.10.2020',
      },
      {
        title: 'Ответ получен',
        open: false,
        date: '12.10.2020',
      },
    ];
    return (
      <View style={styles.view}>
        {menu.map((item) => (
          <TouchableOpacity style={styles.btn}>
            <Text
              style={[
                styles.title,
                {
                  fontFamily: item.open
                    ? 'OpenSans-SemiBold'
                    : 'OpenSans-Regular',
                  width: '50%',
                  maxWidth: '50%',
                },
              ]}>
              {item.title}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.countText}>{item.date}</Text>
              {item.open && <View style={styles.point} />}
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
          title={'Входящие'}
          type={'close'}
          onPressUser={() => {
            console.log('fewewf');
            this.props.navigation.navigate('EditProifle');
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

    color: '#08050B',
  },
  img: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#B7B6BB',
  },
  point: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: '#FE1935',
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
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: '#B7B6BB',
    marginRight: 30,
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

export default Incoming;
