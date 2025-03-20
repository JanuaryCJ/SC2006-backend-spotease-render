import { View, Text, Image, TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'

export default function FeatureSlide3() {
  return (
    <View style={styles.seamlessNavigation}>
      <Image source={require('../../assets/images/seamless-navigation.png')} style={styles.image}/>
      <Text style={styles.title}>
        Seamless Navigation
      </Text>
      <Text style={styles.description}>
        Get turn-by-turn directions to your selected carpark for a hassle-free parking experience!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  seamlessNavigation: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  image: {
    width: "105%",
    height: 380,
    resizeMode: "contain",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00E6E6",
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    color: "#A0A0A0",
    textAlign: "center",
    marginVertical: 20,
  },
});