import React from 'react';
import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';

const Tag = ({item}) => {
  return (
    <TouchableOpacity style={styles.tag}>
      <Text style={{color: '#FE1935', fontFamily: 'OpenSans-Regular'}}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

class TagList extends React.Component {
  render() {
    return (
      <ScrollView
        horizontal={true}
        style={{marginTop: 15, marginBottom: 10}}
        showsHorizontalScrollIndicator={false}>
        {['горячие блюда', 'новинка'].map(item => (
          <Tag item={item} />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: 'rgba(254, 25, 53, 0.08)',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 50,
    marginRight: 10,
  },
  width: {
    padding: 10,
    marginTop: 10,
    borderBottomColor: '#EEEDF1',
    borderBottomWidth: 1,
  },
});

export default TagList;
