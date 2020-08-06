import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Header from '../../components/Header'
import { about, icAdd } from '../../assets/index'
import Button from '../../components/Button'

const text = '\t\tДеньги не спишутся без Вашего ведома. За сутки до списания мы отправляем смс с напоминанием: можно изменить состав заказа, отменить его в личном кабинете и по телефону до оплаты.'
const text2 = '\t\tПотому что не надо каждую неделю заходить на сайт и думать об оплате коробки. Заказы можно изменять или пропускать сколько угодно недель. Саму подписку можно отменить, позвонив нам. А на каждый заказ по подписке мы предоставляем Вам скидку 10%.'
const items = [
  {
    id: 1,
    text: 'Скачайте приложение "TRUE FOOD"'
  },
  {
    id: 2,
    text: 'Выберите расписание доставок и меню'
  },
  {
    id: 3,
    text: 'Привяжите свою карту'
  },
  {
    id: 4,
    text: 'Получите свой вкусный заказ'
  },
]

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
    return (
      <View style={{
          flex: 1,
      }}>
          <Header 
            type='back' 
            goBack={()=>this.props.navigation.goBack()}
            title='О нас'
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
        }}> Почему TRUE FOOD? </Text>
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
        <Item about={text2} />
        <Item about={text} />
        <Text style={{
          fontSize: 24,
          fontFamily: 'OpenSans-Regular',
          fontWeight: '600',
          lineHeight: 100
        }}>Как заказать?</Text>
        {
          items.map((item)=>{
            return(
              <HowToOrder id={item.id} text={item.text} />
            )
          })
        }
        <View style={{
          marginTop: 20,
          marginBottom:50
        }}>
          <Button onPress={()=>{}} title='Задать вопрос'/>
        </View>
        </ScrollView>
      </View>
    );
  }
}

export default About;
