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
import {img1, img2, img3} from '../../assets';
const {width} = Dimensions.get('window');

class Categories extends React.Component {
  render() {
    const {category} = this.props
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        style={styles.scroll}>
        {category && category.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => this.props.navigation.navigate('CategoryScreen',{id: {id: item.id,name: item.name}})}
            style={styles.btn}>
            <View />
            <Image source={img3} style={styles.img} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const categories = [
  {
    name: 'Напитики',
    url: img3,
  },
  {
    name: 'Салаты',
    url: img2,
  },
  {
    name: 'Бургеры',

    url: img1,
  },
  {
    name: 'Сэндвич',
    url: img1,
  },
  {
    name: 'KFC',
    url: img3
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    backgroundColor: '#f6f5f6',
    maxHeight: width / 4 + 30,
    height: width / 4 + 30,
    padding: 5,
    paddingBottom: 10,
  },
  btn: {
    backgroundColor: 'white',
    marginLeft: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    borderColor: '#E9E9E9',
    borderRadius: 5,
    width: width / 4,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  border: {
    borderTopWidth: 0.6,
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#C6CCD1',
  },
  name: {
    fontFamily: 'OpenSans-Regular',
  },
  img: {
    width: width / 4 - 10,
    height: 72,
    resizeMode: 'contain',
  },
});

export default Categories;
