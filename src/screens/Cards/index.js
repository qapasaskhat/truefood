import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{
          flex: 1
      }}>
        <Header type='back' title='Опалата'  goBack={()=>navigation.goBack()} />
      </View>
    );
  }
}

export default Cards;
