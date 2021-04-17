import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({buttonText, buttonFunction, style}) => {
  return (
    <TouchableOpacity style={style} onPress={() => buttonFunction()}>
      <Text>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;
