import React from 'react';
import { View,TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, buttonStyle, textStyle,containerstyle }) => {
  return (
    <View style={[styles.containerstyle,containerstyle]}>
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerstyle:{
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00E6E6',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CustomButton;
