import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const Input = ({item}) => (
  <View style={{marginTop: 10}}>
    <Text style={styles.h2}>{item.title}</Text>
    <TextInput
      onChangeText={(text) => item.onChangeText(text)}
      value={item.value}
      placeholder={item.placeholder}
      placeholderTextColor={'#08050B'}
      style={styles.niput}
    />
  </View>
);
class EditProifle extends React.Component {
  state = {
    first_name: '',
    last_name: '',
  };
  render() {
    this.list = [
      {
        title: 'Введите имя',
        placeholder: 'Малик',
        value: this.state.first_name,
        onChangeText: (text) => {
          this.setState({first_name: text});
        },
      },
      {
        title: 'Введите фамилию',
        placeholder: 'Каримов',
        value: this.state.last_name,
        onChangeText: (text) => {
          this.setState({last_name: text});
        },
      },
      {
        title: 'Введите отчество',
        placeholder: '',
      },
      {
        title: 'Введите e-mail',
        placeholder: '',
      },
    ];
    return (
      <View style={styles.container}>
        <Header type={'close'} title={'Редактировать профиль'} />
        <View style={{padding: 12.5, backgroundColor: 'white'}}>
          {this.list.map((item) => (
            <Input item={item} />
          ))}
          <Button title={'сохранить данные'} styleBtn={{marginTop: 30}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h2: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  niput: {
    backgroundColor: '#F7F9FB',
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
  },
});

export default EditProifle;
