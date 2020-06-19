import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Header from '../../components/Header';
import ButtonUser from '../../components/ButtonUser';
import Categories from '../../components/Categories';
import PopularList from './PopularList';
import TopList from './TopList';
import {connect} from 'react-redux';

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
  }
  render() {
    const {navigation, dispatch} = this.props;
    return (
      <View style={styles.container}>
        <Header openDrawer={() => navigation.openDrawer()} />
        <ButtonUser />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}>
          <Categories navigation={navigation} dispatch={dispatch} />
          <PopularList navigation={navigation} dispatch={dispatch} />
          <TopList />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    margin: 10,
    marginTop: 20,
    marginBottom: 15,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  btnView: {
    backgroundColor: '#FE1935',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  btnText: {
    textTransform: 'uppercase',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
});

const mapStateToProps = (state) => ({
  basket: state.appReducer.basket,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
