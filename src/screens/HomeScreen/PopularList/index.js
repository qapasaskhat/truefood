import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import {PopularCard} from '../../../components/Card';
import {layer1, icRight} from '../../../assets';

const Button = () => {
  return (
    <TouchableOpacity style={styles.view}>
      <Text style={styles.txt}>Смотреть все популярные блюда</Text>
      <Image source={icRight} resizeMode={'contain'} style={styles.icon} />
    </TouchableOpacity>
  );
};

class PopularList extends React.Component {
  render() {
    const {navigation, dispatch} = this.props;
    return (
      <View>
        <ImageBackground
          resizeMode={'repeat'}
          style={styles.imaContainer}
          imageStyle={styles.imgStyle}
          source={layer1}>
          <View style={{padding: 10}}>
            <Text style={styles.title}>Популярные блюда</Text>
            {[1, 2, 3].map((item, index) => (
              <PopularCard
                dispatch={dispatch}
                key={item}
                navigation={navigation}
                coinVisible={false}
              />
            ))}
            <Button />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {fontFamily: 'OpenSans-SemiBold', fontSize: 13},
  imaContainer: {padding: 0, backgroundColor: '#f3f5f7'},
  imgStyle: {width: '100%'},
  title: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {width: 18, height: 18, tintColor: 'black'},
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginLeft: -10,
    marginRight: -10,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
  },
});

export default PopularList;
