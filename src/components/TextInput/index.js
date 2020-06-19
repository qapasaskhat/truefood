import React from 'react';
import {TextInput} from 'react-native';

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      style={[style, props.style && props.style]}
      maxLength={40}
    />
  );
};

const style = {
  backgroundColor: '#F7F9FB',
  alignItems: 'center',
  borderRadius: 50,
  padding: 10,
  paddingTop: 15,
  paddingBottom: 15,
  flexDirection: 'row',
  justifyContent: 'space-between',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
};

export default UselessTextInput;
