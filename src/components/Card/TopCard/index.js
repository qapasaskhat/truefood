import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {icAdd} from '../../../assets';
class TopCard extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.containerBtn} key={'smallCard'}>
        <Image
          style={{width: width / 2, height: 120, borderRadius: 5}}
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0Ii6AjpDUAE_dWSrsXHh5GJTWmialB8kMJ5P7qwP2M9ByqW4Y&usqp=CAU',
          }}
        />
        <View style={{padding: 5, paddingTop: 8}}>
          <Text style={styles.foodText}>Салат Цезарь{'\n'}с курицей</Text>
          <View style={styles.bottom}>
            <Text style={styles.price}>395 ₸</Text>
            <TouchableOpacity style={styles.btnView}>
              <Image
                source={icAdd}
                style={{width: 20, height: 20, resizeMode: 'contain'}}
              />
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
