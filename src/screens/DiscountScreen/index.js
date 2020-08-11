import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Header from '../../components/Header';
import Background from '../../components/Background'
import {img001,img002,img003} from '../../assets'
import { TextInput } from 'react-native-gesture-handler';
import Button from '../../components/Button'
import { Language } from '../../constants/lang'
import { connect } from 'react-redux'

const Btn = ({
    status,
    onPress,
    active,
    btntxtDis,
    btntxtAc
})=>(
    <TouchableOpacity style={{
        backgroundColor: status?"#fff": '#FE1935',
        borderRadius: 60,
        paddingVertical: 5,
        borderWidth: status? 1:0,
        borderColor: '#FE1935'
    }}
    onPress={onPress}
    >
        <Text style={{
            fontFamily: 'OpenSans-Regular',
            textTransform: 'uppercase',
            textAlign: 'center',
            fontSize: 12,
            color: status?'#000':'#fff'
        }}>{status?btntxtAc:btntxtDis}</Text>
    </TouchableOpacity>
)
const Card = ({
    price,
    img,
    status,
    onPress,
    active,
    btntxtDis,
    btntxtAc
})=>(
    <View style={{
        marginTop: 30
    }}>
        <Image source={img} style={{
            width: 78,
            height: 65,
            resizeMode: 'contain'
        }}/>
        <Text style={{
            fontFamily: 'OpenSans-Regular',
            textAlign: 'center',
            marginTop: 21,
            marginBottom: 7
        }}>{price} ₸</Text>
        <Btn btntxtAc={btntxtAc} btntxtDis={btntxtDis} active={active} status={status} onPress={onPress}/>
    </View>
)

class Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        headerTitle: 'Подарочная карта',
        discount :[
            {
                id: 1,
                img: img001,
                text: '2000',
                status: false,
            },
            {
                id: 2,
                img: img002,
                text: '5000',
                status: false
            },
            {
                id: 3,
                img: img003,
                text: '10000',
                status: false
            },
        ],
        discountPrice: '2000'
    };
  }

  change=(id)=>{
      this.setState({
        discount :[
            {
                id: 1,
                img: img001,
                text: '2000',
                status: false
            },
            {
                id: 2,
                img: img002,
                text: '5000',
                status: false
            },
            {
                id: 3,
                img: img003,
                text: '10000',
                status: false
            },
        ]
      })
      this.setState(state=>{
        const discount = state.discount.map(i=>
          i.id === id?
          {...i, status: true}:i);
          return {discount}
      })
      setTimeout(() => {
        this.state.discount.map(item=>{
            if(item.status){
                this.setState({
                    discountPrice: item.text
                })
            }
        })
      }, 300);
  }

  render() {
      const { discount, discountPrice } = this.state
      const { langId } = this.props
    return (
      <View style={{
          flex: 1,
      }}>
          <Header type='back' title={Language[langId].giftCards.header} goBack={()=>{
              this.props.navigation.goBack()
          }}/>
          <Background type='red'>
              <View style={{
                  marginHorizontal: 12,
                  marginTop: 20,
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  paddingHorizontal: 20,
                  paddingTop: 16
              }}>
                  <Text style={{
                      fontSize: 24,
                      lineHeight: 30,
                      color: '#08050B',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      fontFamily: 'OpenSans-Regular',
                  }}>{Language[langId].giftCards.title}</Text>
                  <View style={{
                      flexDirection: 'row', 
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      borderBottomColor: '#FFD9D9',
                      paddingBottom: 20,
                      marginBottom: 10
                      }}>
                      {
                          discount.map((item)=>{
                              return (
                                  <Card 
                                    price={item.text}
                                    btntxtAc = {Language[langId].giftCards.selected}
                                    btntxtDis = {Language[langId].giftCards.choose}
                                    img={item.img}
                                    status={item.status}
                                    onPress={()=>{this.change(item.id)}}
                                     />
                              )
                          })
                      }
                  </View>
                  <Text style={{
                      fontSize: 14,
                      color: '#08050B',
                      lineHeight: 24,
                      fontWeight: '600',
                      fontStyle: 'normal',
                      fontFamily: 'OpenSans-Regular'
                  }}>{Language[langId].giftCards.text}</Text>
                  <TextInput 
                    placeholder='5 500 ₸'
                    value={discountPrice}
                    onChangeText={(discountPrice)=>this.setState({discountPrice})}
                    placeholderTextColor='#B1AEAE'
                    style={{
                        //opacity: 0.5,
                        backgroundColor: '#FFF4F4',
                        borderRadius: 60,
                        paddingVertical: 18,
                        paddingHorizontal: 12,
                        marginTop: 8,
                        marginBottom: 16,
                        fontFamily: 'OpenSans-Regular',
                        fontSize: 16,
                    }}
                     />
              </View>
          </Background>
          <View style={{
                  position: 'absolute',
                  width: '90%',
                  alignSelf: 'center',
                  bottom: 20
              }}>
                  <Button title={Language[langId].giftCards.btn} onPress={()=>{
                      this.props.navigation.navigate('GetGiftCard',{discountPrice: discountPrice})
                  }} />
              </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
    langId: state.appReducer.langId
  });

export default connect(mapStateToProps) (Discount);