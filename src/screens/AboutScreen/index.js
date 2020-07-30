import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header'

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{
          flex: 1
      }}>
          <Header  />
        <Text> About </Text>
      </View>
    );
  }
}

export default About;
