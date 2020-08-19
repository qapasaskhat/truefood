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
  }
  _onChange=(url)=>{
      console.log(url)
      if(url.startsWith('http://truefood.kz/success/order?')){
          this.props.navigation.goBack()
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
        onNavigationStateChange={(text)=>{this._onChange(text.url)}}
        />
    );
  }
}

export default Payment;
