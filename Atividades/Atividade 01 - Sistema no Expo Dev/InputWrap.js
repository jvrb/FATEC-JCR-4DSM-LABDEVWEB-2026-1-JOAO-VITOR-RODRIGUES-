import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";


export function InputWrap({label, value, placeholder, onchangetext, keyboard = 'default'}){

  return (
    <View style={style.inputWrap}>
      <Text style={{color: '#fff'}}>{label}</Text>
      <TextInput 
        placeholder={placeholder} 
        style={style.input}
        value={value}
        onChangeText={onchangetext} 
        keyboardType={keyboard}/>
    </View>
  )
};

const style = StyleSheet.create({
  inputWrap:{
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  },
  input: {
    borderColor: '#27CF80',
    borderWidth: 2,
    padding: 3,
    borderRadius: 6,
    color: '#fff'
  },
})