import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

const Button = (props, { navigation }) => {
  return (
    <View
      style={{
        backgroundColor: '#A9A9A9',
        marginHorizontal: '10%',
        color: 'black',
        borderRadius: 15,
      }}>
      <Text
        onPress={() => props.nav.navigate(props.text)}
        style={{
          fontSize: 18,
          color: '#ffffff',
          textAlign: 'center',
          marginVertical: 10,
          letterSpacing: 5,
          fontWeight: '500',
        }}>
        {props.text}
      </Text>
    </View>
  );
};
export default Button;
