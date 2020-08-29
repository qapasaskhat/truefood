import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image , ScrollView, Platform, Alert} from 'react-native';
import Header from '../../components/Header';
import {shtih,visa,mastercard} from '../../assets'
import { TextInputMask } from 'react-native-masked-text'
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { connect } from 'react-redux'

const CardItem =({ 
  number,
  type,
  longPress
})=>(
  <TouchableOpacity 
  onLongPress={longPress}
  style={[styles.card,{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    height: 40
  }]}>
    <Image source={ type==='MasterCard'?mastercard:visa} style={{
      width:40,
      height: 20,
      resizeMode: 'contain'
    }} />
    <Text>{number}</Text>
  </TouchableOpacity>
)

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      numberCard: null,
      cvvCode: null,
      date: null,
      name: '',
      cards: [],
      card: {}
    };
  }
  componentDidMount=()=>{
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
    console.log(this.props.userCards)
  }
  scanCard() {
    CardIOModule
      .scanCard()
      .then(card => {
        console.log(card)
        this.setState({
          card: {
            id: Math.random(),
            number: card.cardNumber,
            cardType: card.cardType,
            month: card.expiryMonth,
            year: card.expiryYear,
            redacted: card.redactedCardNumber
          }
        })
        setTimeout(() => {
          console.log('card',this.state.card)
          this.props.dispatch({type: 'ADD_NEW_CARD', payload: this.state.card } )
        }, 500);
      })
      .catch(() => {
        // the user cancelled
      })
  }
  add=(numberCard,cvvCode,date,name)=>{
    this.setState({
      card: {
        id: Math.random(),
        number: numberCard,
        cardType: numberCard[0]===4?'Visa':'MasterCard',
        month: date,
        year: date,
        redacted: '•••• •••• •••• '+numberCard[14]+numberCard[15]+numberCard[16]+numberCard[17]
      },
      numberCard: null,
      cvvCode: null,
      date: null,
      name: '',
    })

    setTimeout(() => {
      console.log('card',this.state.card)
      this.props.dispatch({type: 'ADD_NEW_CARD', payload: this.state.card } )
    }, 500);
  }
  card = () => (
    <View key={'card'}>
      <View key={'number'} style={{paddingTop: 10}}>
        <Text style={styles.h2}>Номер карты:</Text>
        <View style={styles.view1}>
          <TextInputMask 
            type={'credit-card'}
            placeholder={'1234 1234 1234 1234'}
            keyboardType='numeric'
            style={{height: 50, borderRadius: 50, flex: 1}}
            options={{
              maskType: 'INTERNATIONAL',
              withDDD: true,
            }}
            value={this.state.numberCard}
            onChangeText={text => {
              this.setState({
                numberCard: text
              })
            }} />
          <TouchableOpacity onPress={this.scanCard.bind(this)}>
            <Image source={shtih} style={{width: 20, height: 20}} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View key={'date'} style={{paddingTop: 10, width: '46%'}}>
          <Text style={styles.h2}>ММ/ГГ:</Text>
          <View style={styles.view1}>
            <TextInputMask 
              style={{height: 50, borderRadius: 50, flex: 1}}
              placeholder={'12/34'}
              keyboardType='numeric'
              options={{
                maskType: 'INTERNATIONAL',
                withDDD: true,
                mask: '**/**'
              }}
              value={this.state.date}
              onChangeText={text => {
                this.setState({
                  date: text
                })
              }}
              type={'custom'}
            />
          </View>
        </View>
        <View key={'cvv'} style={{paddingTop: 10, width: '46%'}}>
          <Text style={styles.h2}>CVV-код:</Text>
          <View style={styles.view1}>
            <TextInput
              style={{height: 50, borderRadius: 50, flex: 1}}
              placeholder={'123'}
              value={this.state.cvvCode}
              onChangeText={(text)=>{
                this.setState({
                  cvvCode: text
                })
              }}
              maxLength={3}
              secureTextEntry
              keyboardType='numeric'
              placeholderTextColor={'#B7B6BB'}
            />
          </View>
        </View>
      </View>
      <View key={'name'} style={{paddingTop: 10}}>
        <Text style={styles.h2}>Имя держателя:</Text>
        <View style={styles.view1}>
          <TextInput
            style={{height: 50, borderRadius: 50, flex: 1, textTransform:'uppercase'}}
            placeholder={'ИМЯ ФАМИЛИЯ'}
            placeholderTextColor={'#B7B6BB'}
            value = {this.state.name}
            onChangeText={(text)=>{
              this.setState({
                name: text
              })
            }}
            maxLength={30}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={()=>this.add(this.state.numberCard,this.state.cvvCode,this.state.date,this.state.name)}
       style={{
        alignItems: 'center',
        backgroundColor: '#FE1935',
        marginHorizontal:5,
        paddingVertical: 10,
        borderRadius: 50,
        marginTop:5
      }}>
        <Text style={{
          color: '#fff',
          fontWeight: '600'
        }}>Add</Text>
      </TouchableOpacity>
    </View>
  );
  delete=(id)=>{
    Alert.alert(
      "Удалить",
      ''
      ,[
        { text: "Отмена",style: "cancel" ,onPress: () => console.log("OK Pressed") },
        { text: "OK",style: "cancel" ,onPress: () => this.props.dispatch({type: 'REMOVE_CARD', payload: id } ) }
      ],{cancelable: false})
  }
  render() {
    const {navigation, userCards} = this.props;
    const {visible} = this.state
    return (
      <ScrollView style={styles.container}>
        <Header type='back' title='Опалата'  goBack={()=>navigation.goBack()} />
        <TouchableOpacity 
          onPress={()=>{
            this.setState({
              visible: !this.state.visible
            })
          }}
          style={{
            backgroundColor: '#FE1935',
            alignItems: 'center',
            paddingVertical: 10
          }}>
          <Text style={{
            color: '#fff',
            fontWeight: '600'
          }}>Add new Credit Card</Text>
        </TouchableOpacity>
        <View key={'add new card'} style={styles.card}>
          {visible?this.card():null}
        </View>
        <View key={'my cards'}>
          { userCards.map(item=> <CardItem longPress={()=>{
            this.delete(item.id)
          }} number={item.redacted} type={item.cardType} />) }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  h2: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  view1: {
    backgroundColor: '#F8F8F8',
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card:{
    margin: 5,
    backgroundColor: '#fff',
    paddingBottom: 5,
    borderRadius: 6,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  }
})
const mapStateToProps = (state) => ({
  userCards: state.appReducer.userCards,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps,mapDispatchToProps) (Cards);
