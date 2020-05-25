/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.rehydrated = false;
  }
  componentDidMount() {
    this.props.navigation.navigate('TabStack');
  }

  render() {
    return (
      <View
        key={1}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
    );
  }
}

const mapStateToProps = state => ({
  rehydrated: state._persist.rehydrated,
});

const mapDispatchToProps = dispatch => ({
  getCategories: (...args) => dispatch(getCategories(...args)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
