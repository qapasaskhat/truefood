import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';
import FilterButton from '../../components/FilterButton';
import {layer1, icTop, icFilter} from '../../assets';
import {PopularCard} from '../../components/Card';
const {width, height} = Dimensions.get('window');

const Tag = ({item}) => (
  <TouchableOpacity style={styles.tag}>
    <Text style={{color: '#FE1935', fontFamily: 'OpenSans-Regular'}}>
      {item}
    </Text>
    <Image source={icTop} style={styles.icTop} />
  </TouchableOpacity>
);

class CategoryScreen extends React.Component {
  state = {
    page: 1,
  };
  render() {
    const {navigation} = this.props;
    const {page} = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <ButtonUser />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          bounces={false}
          contentContainerStyle={{paddingBottom: 0}}>
          <ImageBackground
            style={styles.imaContainer}
            imageStyle={styles.imgStyle}
            source={layer1}>
            <View style={{flex: 1, padding: 12.5}}>
              <Text style={styles.title}>Горячие блюда</Text>
              <View style={styles.view}>
                {['по популярности', 'по цене'].map((item) => (
                  <Tag item={item} />
                ))}
              </View>
              <FilterButton />
              <View style={{marginTop: 10}}>
                {[{}, {}, {}, {}, {}].map((item) => (
                  <PopularCard navigation={navigation} />
                ))}
              </View>
              <View style={styles.pagination}>
                {[1, 2, 3, 4].map((item) => (
                  <TouchableOpacity onPress={() => this.setState({page: item})}>
                    <Text
                      style={{
                        color: page === item ? '#FE1935' : '#08050B',
                        fontFamily: 'OpenSans-SemiBold',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imaContainer: {
    padding: 0,
    backgroundColor: '#f3f5f7',
    height: '105%',
    width: '100%',
  },
  pagination: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imgStyle: {
    resizeMode: 'repeat',
    overflow: 'visible',
    backfaceVisibility: 'visible',
    flex: 1,
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
  },
  tag: {
    backgroundColor: '#FFEFF1',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 50,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icTop: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  view: {flexDirection: 'row', marginTop: 20, marginBottom: 15},
});

export default CategoryScreen;
