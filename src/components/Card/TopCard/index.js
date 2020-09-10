import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform
} from 'react-native';
import { Language } from '../../../constants/lang'

const {width, height} = Dimensions.get('window');
import {icAdd} from '../../../assets';
class TopCard extends React.Component {
  render() {
    const {item,name,navigation,langId,text} = this.props
    return (
      <TouchableOpacity
        onPress={() => {
          //alert(item.id)
          navigation.navigate('CardScreen',{param: item.id})
        }}
        key={item}
        style={styles.containerBtn}
        key={'smallCard'}>
        <Image
          style={{width: width / 2, height: 120, borderRadius: 5}}
          source={{
            uri:
              item.thumbnail,
          }}
        />
        <View style={{padding: 5, paddingTop: 8}}>
        <Text style={styles.foodText}>{item.name}</Text>
          <View style={styles.bottom}>
            <Text style={styles.price}>{item.variations && item.variations[0].price} ₸</Text>
            <TouchableOpacity style={styles.btnView} onPress={()=>{
              //console.log(item)
              this.props.dispatch({type: 'ADD_BASKET', payload: {item, quantity: 1}})
              this.props.dispatch({type: 'BASKET'} )
              Alert.alert(
                Language[langId].basket.success,'',
                [{
                    text: Language[langId].basket.go_to_basket,
                    onPress: () => this.props.navigation.navigate('Store'),
                    style: 'cancel'
                  },
                  Platform.OS ==='ios'?
                    {
                      text: "Ок",
                      onPress: () => console.log('ok'),
                      style: 'cancel'
                    } :{},
                  { cancelable: false }
                ]
              )
            }}>
              <Text style={styles.btnText}>{text}</Text>
              {/* <Image
                source={icAdd}
                style={{width: 20, height: 20, resizeMode: 'contain'}}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
    fontSize: 15,
  },
  btnView: {
    backgroundColor: '#FE1935',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
    paddingLeft: 13,
    paddingRight: 13,
  },
  btnText: {
    textTransform: 'uppercase',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  containerBtn: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
    marginRight: 15,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  foodText: {
    color: '#08050B',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
  },
});

export default TopCard;
