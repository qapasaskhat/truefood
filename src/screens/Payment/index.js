import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview'

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        payment_url: '',
        success: false
    };
  }
  componentDidMount=()=>{
      this.setState({
        payment_url: this.props.navigation.getParam('payment_url')
      })
      this.props.navigation.addListener ('didFocus', () =>
      { console.log('didfocus')
        this.props.navigation.goBack()
      });
  }
  _onChange=(text)=>{
      console.log(text)
      if(text.title === 'True Food' )//('http://truefood.kz/success/order?')
      {
          console.log('history')
          this.props.navigation.navigate('HistoryOrder')
      }
  }

  render() {
      const {payment_url, success} = this.state
    return (
        success?<View>
            <Text>success</Text>
        </View>:
      <WebView 
        source={{uri: payment_url}}
        onNavigationStateChange={(text)=>{this._onChange(text)}}
        />
    );
  }
}

export default Payment;
