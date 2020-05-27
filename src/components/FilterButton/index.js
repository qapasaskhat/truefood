import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import {icFilter} from '../../assets';

class FilterButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View />
        <Image source={icFilter} style={styles.icFilter} />
        <Text style={styles.filterText}>Применить фильтр</Text>
        <View />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 55,
    borderWidth: 1,
    borderColor: '#FE1935',

    height: 55,
  },
  filterText: {
    color: '#08050B',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
  },
  icFilter: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    position: 'absolute',
    left: 20,
  },
});

export default FilterButton;
