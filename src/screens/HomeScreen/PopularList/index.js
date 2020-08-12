import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  FlatList
} from 'react-native';

import {PopularCard} from '../../../components/Card';
import {layer1, icRight} from '../../../assets';
import axios from 'axios'
import {Language} from '../../../constants/lang'

const Button = ({text,onPress}) => {
  return (
    <TouchableOpacity style={styles.view} onPress={onPress}>
      <Text style={styles.txt}>{text}</Text>
      <Image source={icRight} resizeMode={'contain'} style={styles.icon} />
    </TouchableOpacity>
  );
};

class PopularList extends React.Component {
  state={

  }
  render() {
    const {navigation, dispatch, items, loading, langId, onPress } = this.props;
    return (
      <View>
        <ImageBackground
          resizeMode={'repeat'}
          style={styles.imaContainer}
          imageStyle={styles.imgStyle}
          source={layer1}>
          {
            loading?<ActivityIndicator />:
            <View style={{padding: 10}}>
            <Text style={styles.title}>{Language[langId].home.popular}</Text>
            <FlatList 
            data={items}
            renderItem={({item})=>(
              <PopularCard
                dispatch={dispatch}
                item={item}
                imgUrl={item.thumbnail}
                name={item.name}
                id={item.id}
                price={item.variations[0].price}
                key={item}
                desc = {item.slug}
                navigation={navigation}
                coinVisible={false}
                text={Language[langId].home.basket}
                onPress={()=>{
                  //this.addBasket(item)
                }}
              />
            )}
            />
            <Button onPress={onPress} text={Language[langId].home.showPopular} />
          </View>}
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
