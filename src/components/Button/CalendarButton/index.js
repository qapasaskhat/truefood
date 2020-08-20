import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

import {time} from '../../../assets';

class Button extends React.Component {
  render() {
    const {styleBtn, styleText, onPress} = this.props;
    return (
      <TouchableOpacity onPress={()=>onPress()} style={[styles.btnView, styleBtn && styleBtn]}>
        <Text style={[styles.btnText, styleText && styleText]}>
          {this.props.title}
        </Text>
        <Image
          style={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
            marginRight: 5,
          }}
          source={time}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnView: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btnText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#08050B',
  },
});

export default Button;
