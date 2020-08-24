import React from 'react';
import {StyleSheet, ScrollView, ImageBackground} from 'react-native';
import {layer1} from '../../assets';

class Background extends React.Component {
  render() {
    const {source, style,type} = this.props;

    return (
      type==='red'? <ImageBackground
        style={styles.imaContainer}
        imageStyle={[styles.imgStyle, style && style,{tintColor: '#FFDEDE', backgroundColor:'#FFF4F4'}]}
        source={source ? source : layer1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, width: '100%', height: '100%'}}
          bounces={false}
          contentContainerStyle={{}}>
          {this.props.children}
        </ScrollView>
      </ImageBackground>:
      <ImageBackground
      style={styles.imaContainer}
      imageStyle={[styles.imgStyle, style && style]}
      source={source ? source : layer1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, width: '100%', height: '100%'}}
        bounces={false}
        contentContainerStyle={{}}>
        {this.props.children}
      </ScrollView>
    </ImageBackground>
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
    height: '125%',
    width: '100%',
    flex: 1,
  },

  imgStyle: {
    //resizeMode: 'repeat',
    overflow: 'visible',
    backfaceVisibility: 'visible',
    flex: 1,
    //tintColor: '#FFDEDE',
    // width: '100%',
    // height: '100%',
    //backgroundColor: '#FFF4F4',
  },
});

export default Background;
