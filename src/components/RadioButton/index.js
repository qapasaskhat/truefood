import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

const Button = ({item,radioBtn}) => {
  return (
    <TouchableOpacity
      style={[
        styles.bg,
        item.active ? {borderColor: '#FE1935'} : {borderColor: '#DCDCDC'},
      ]}
      onPress={radioBtn}
      >
      <View style={[item.active && styles.activeInner]}></View>
    </TouchableOpacity>
  );
};

const RadioButton = ({item, radioBtn}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <Button item={item} radioBtn={radioBtn}/>
      <Text
        style={{
          marginLeft: 5,
          color: '#08050B',
          fontFamily: 'OpenSans-Regular',
        }}>
        {item.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    height: 35,
    width: 35,
    borderRadius: 50,
    borderWidth: 1,
    padding: 3.5,
  },
  activeInner: {
    backgroundColor: '#FE1935',
    flex: 1,
    borderRadius: 50,
  },
});

export default RadioButton;
