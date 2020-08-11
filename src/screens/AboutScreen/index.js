import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Header from '../../components/Header'
import { about, icAdd } from '../../assets/index'
import Button from '../../components/Button'
import { Language } from '../../constants/lang'
import { connect } from 'react-redux'

const text = '\t\tДеньги не спишутся без Вашего ведома. За сутки до списания мы отправляем смс с напоминанием: можно изменить состав заказа, отменить его в личном кабинете и по телефону до оплаты.'
const text2 = '\t\tПотому что не надо каждую неделю заходить на сайт и думать об оплате коробки. Заказы можно изменять или пропускать сколько угодно недель. Саму подписку можно отменить, позвонив нам. А на каждый заказ по подписке мы предоставляем Вам скидку 10%.'

const Item = ({about})=>(
  <View style={{flexDirection: "row", marginTop:12}}>
    <Image source={icAdd} style={{
      width: 20,
      height:20,
      resizeMode: 'contain',
      tintColor: '#FE1935',
      marginTop: 6,
      position:'absolute'
    }} />
    <Text style={{
      fontSize: 16,
      lineHeight: 30,
      color: '#08050B',
      fontFamily: 'OpenSans-Regular',
      fontWeight: '100'
    }}>
      {about}
    </Text>
  </View>
)

const HowToOrder = ({
  id, text
})=>(
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  }}>
    <View style={{
      width: 34,
      height: 34,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#FE1935',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12
    }}>
      <Text style={{
        fontSize: 14,
        lineHeight: 24,
        color: '#08050B'
      }}>{id}</Text>
    </View>
    <Text style={{
      fontSize: 16,
      lineHeight: 30,
      color: '#08050B',
      fontFamily: 'OpenSans-Regular',
    }}>{text}</Text>
  </View>
)

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { langId } = this.props
    return (
      <View style={{
          flex: 1,
      }}>
          <Header 
            type='back' 
            goBack={()=>this.props.navigation.goBack()}
            title={Language[langId].about.aboutUs}
            />
          <ScrollView style={{
            paddingTop: 32,
            paddingHorizontal: 16
          }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '600',
          lineHeight: 24,
          color: '#08050B',
          fontFamily: 'OpenSans-Regular',
        }}> {Language[langId].about.title} </Text>
        <View style={{
          width: '100%',
          height: 200,
          marginTop: 12
        }}>
          <Image source={about} style={{
            width: '100%',
            height: 200,
            borderRadius: 10,
            resizeMode: 'center'
          }}/>
        </View>
        <Item about={Language[langId].about.text} />
        <Item about={Language[langId].about.text1} />
        <Text style={{
          fontSize: 24,
          fontFamily: 'OpenSans-Regular',
          fontWeight: '600',
          lineHeight: 100
        }}>{Language[langId].about.steps}</Text>
        {
          [
            {
              id: 1,
              text: Language[langId].about.step1
            },
            {
              id: 2,
              text: Language[langId].about.step2
            },
            {
              id: 3,
              text: Language[langId].about.step3
            },
            {
              id: 4,
              text: Language[langId].about.step4
            },
          ].map((item)=>{
            return(
              <HowToOrder id={item.id} text={item.text} />
            )
          })
        }
        <View style={{
          marginTop: 20,
          marginBottom:50
        }}>
          <Button onPress={()=>{}} title={Language[langId].about.answer}/>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  langId: state.appReducer.langId
});

export default connect(mapStateToProps) (About);
