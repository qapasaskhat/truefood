import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {TopCard} from '../../../components/Card';
import {icRight} from '../../../assets';
const Button = () => {
  return (
    <TouchableOpacity style={styles.view}>
      <Text style={styles.txt}>Смотреть все популярные блюда</Text>
      <Image source={icRight} resizeMode={'contain'} style={styles.icon} />
    </TouchableOpacity>
  );
};

class TopList extends React.Component {
  render() {
    return (
      <View key={'top'} style={{backgroundColor: 'white'}}>
        <Text style={styles.title}>Топ блюда недели</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{backgroundColor: 'white'}}
          imageStyle={{width: '100%'}}>
          <View style={{width: 10, height: 10}} />
          {[{}, {}, {}].map((item, index) => (
            <TopCard />
          ))}
        </ScrollView>
        <Button />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    margin: 10,
    marginTop: 20,
    marginBottom: 15,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  btnView: {
    backgroundColor: '#FE1935',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  btnText: {
    textTransform: 'uppercase',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  containerBtn: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    marginLeft: 10,
    backgroundColor: 'white',
  },
  foodText: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  txt: {fontFamily: 'OpenSans-Bold', fontSize: 13},
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
    borderTopColor: '#EAEAEA',
    borderBottomColor: '#EAEAEA',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  icon: {width: 18, height: 18, tintColor: 'black'},
});

export default TopList;
