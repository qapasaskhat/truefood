import React from 'react';
import {StyleSheet, Image, View, Dimensions,Text, ActivityIndicator} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';
const {width, height} = Dimensions.get('window');

class Slider extends React.Component {
  state = {
    activeSlide: 0,
    slider_images: [],
  };

  componentDidMount=()=>{
    const { imgItems } = this.props
    console.log(imgItems)
    this.setState({
      slider_images: imgItems
    })
  }

  _renderItem = (item) => {
    return (
      <View style={{height: width - 20, width: '100%', maxHeight: width - 20}}>
        <Image
          style={styles.img}
          source={{
            uri:   
              `http://truefood.kz/storage/${item}`//+item,
          }}
        />
      </View>
    );
  };
get pagination() {
    const {activeSlide,slider_images} = this.state;
    return (
      <View>
        <ActivityIndicator style={{position: 'absolute',alignSelf:'center',top: 100}}/>
        {slider_images && slider_images.length ?
          <Pagination
          dotsLength={slider_images && slider_images.length && slider_images.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.conStyle}
          dotStyle={styles.dot}
          inactiveDotStyle={styles.inActive}
          inactiveDotOpacity={1}
          inactiveDotScale={0.8}
        />: <Text style={{color:'#d1d1d1'}}>Ошибка загрузки фото</Text>}
      </View>
    );
  }

  render() {
    const { imgItems } = this.props
    
    return (
      <View
        style={{
          alignSelf: 'center',
          height: width,
          padding: 0,
          maxHeight: width,
        }}>
        <Carousel
          autoplay={true}
          removeClippedSubviews={false}
          ref={c => {
            this._carousel = c;
          }}
          style={{padding: 0}}
          contentContainerStyle={{
            height: width - 20,
            maxHeight: width - 20,
            padding: 0,
          }}
          onSnapToItem={index => this.setState({activeSlide: index})}
          data={imgItems}
          renderItem={({item})=>this._renderItem(item) }
          sliderWidth={width - 20}
          itemWidth={width - 20}
          itemHeight={width - 20}
          sliderHeight={width - 20}
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: width - 20,
    width: '100%',
    maxHeight: width - 20,
    borderRadius: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginHorizontal: 8,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#FE1935',
  },
  inActive: {
    backgroundColor: '#E2E5E8',
    borderWidth: 0,
  },
  conStyle: {
    paddingVertical: 0,
    height: 10,
  },
});

export default Slider;
