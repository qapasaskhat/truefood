import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

class Button extends React.Component {
  render() {
    const {styleBtn, styleText} = this.props;
    return (
      <TouchableOpacity style={[styles.btnView, styleBtn && styleBtn]}>
        <Text style={[styles.btnText, styleText && styleText]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnView: {
    backgroundColor: '#FE1935',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  btnText: {
    textTransform: 'uppercase',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
});

export default Button;
