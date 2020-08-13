import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import Background from '../../components/Background';
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationActions, StackActions } from 'react-navigation'
import {connect} from 'react-redux'
import {Language} from '../../constants/lang'
import axios from 'axios'
import {icProfile} from '../../assets/index'
import {icFrame, icRight} from '../../assets';
const {width, height} = Dimensions.get('window');
const ratio_1 = width / 1500;
import { withNavigation } from 'react-navigation';

class UserScreen extends React.Component {
  state={
    user: {},
    name: 'dima',
    phone: '1111',
    email: '1111@mail.com',
    loading: false,
    token: ''
  }
  componentDidMount=async()=>{
    let usr = await AsyncStorage.getItem('user')
    let user = JSON.parse(usr)
    console.log(user.access_token)
    this.setState({
      token: user.access_token
    })
    this.getUser(user.access_token)
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.openDrawer(),
    });
    this.props.navigation.addListener ('willFocus', () =>
      {
        this.getUser(this.state.token)
      }
    );
  }

  getUser=(token)=>{
    var config = {
      method: 'get',
      url: 'http://truefood.chat-bots.kz/api/user',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    this.setState({
      loading: true
    })
    axios(config)
    .then( (response) => {
      //console.log(response.data)
      if(response.status === 200){
        this.setState({
          user: response.data,
          loading: false
        })
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  
  renderBody = () => {
    const {langId} = this.props

    const menu = [
      {
        title: Language[langId].menu.historyOrder,
        // renderCenter: () => (
        //   <TouchableOpacity
        //     onPress={() => this.props.navigation.navigate('Incoming')}
        //     style={styles.push}>
        //     <Text style={{color: 'white', fontFamily: 'OpenSans-Bold'}}>
        //       +1
        //     </Text>
        //   </TouchableOpacity>
        // ),
        onPress: () => {
          this.props.navigation.navigate('HistoryOrder');
        },
      },
      
    ];

    return (
      <View style={styles.view}>
        {menu.map((item) => (
          <TouchableOpacity onPress={() => item.onPress()} style={styles.btn}>
            <Text style={styles.title}>{item.title}</Text>
            {item.renderCenter && item.renderCenter()}
            <Image source={icRight} style={styles.img} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.btn, {borderBottomWidth: 0}]} onPress={()=>{
          this.logout()
        }}>
          <Text style={[styles.title, {color: '#FE1935'}]}>{Language[langId].user.singout}</Text>
          <Image source={icRight} style={styles.img} />
        </TouchableOpacity>
      </View>
    );
  };

  logout=async()=>{

    await AsyncStorage.removeItem('user');
    
    console.log(this.props.navigation)
    setTimeout(() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "AuthStack",
            }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
    }, 500);
  }
  render() {
    const { name,email,phone,user ,loading} = this.state
    return (
      <View style={styles.container}>
        <Header
          type={'profile'}
          cash={user.bill}
          onPressUser={() => {
            console.log('fewewf');
            this.props.navigation.navigate('EditProifle');
          }}
        />
        <Background source={icFrame} style={styles.bgContainer}>
          {loading?<ActivityIndicator />: <View style={[styles.view,{flexDirection: 'row'}]}>
            <View style={{
              backgroundColor: '#eee',
              height: 140,
              width: 140,
              borderRadius: 10,
              justifyContent:'center',
              alignItems: 'center',
              
            }}>
              <Image source={icProfile} style={{height: 140, resizeMode: 'contain'}}/>
            </View>
            <View>
              <Text style={[styles.title,{
                marginLeft: 24,
                marginHorizontal: 5,
                marginVertical:5
              }]}>Имя: {'\n'}  {user.name}</Text>
              <Text style={[styles.title,{
                marginLeft: 24,
                marginHorizontal: 5,
                marginVertical:5
              }]}>Email: {'\n'}  {user.email}</Text>
              <Text style={[styles.title,{
                marginLeft: 24,
                marginHorizontal: 5,
                marginVertical:5
              }]}>Телефон: {'\n'}  {user.phone}</Text>
            </View>
          </View>}
          {this.renderBody()}
        </Background>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgContainer: {
    width: width,
    height: 2960 * ratio_1,
    backgroundColor: '#fff',
  },
  view: {
    flex: 1,
    padding: 12.5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    margin: 15,
    marginTop: 25,
    borderRadius: 10,
  },
  btn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderColor: '#EEEDF1',
    paddingTop: 10,
    paddingBottom: 10,
    height: 50,
    alignItems: 'center',
    maxHeight: 50,
  },
  title: {
    fontSize: 15,
    fontFamily: 'OpenSans-SemiBold',
    color: '#08050B',
  },
  img: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#B7B6BB',
  },
  push: {
    backgroundColor: '#FE1935',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
const mapStateToProps = (state) => ({
  langId: state.appReducer.langId
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps,mapDispatchToProps) (UserScreen);

// export default withNavigation(connect(
//   mapStateToProps, 
//   mapDispatchToProps
// )(UserScreen))