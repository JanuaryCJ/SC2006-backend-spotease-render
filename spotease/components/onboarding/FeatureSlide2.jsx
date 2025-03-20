import { View, Text, Image, TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'

export default function FeatureSlide2() {
  return (
    <View style={styles.weatherParking}>
      <Image source={require('../../assets/images/Weather-Parking.png')}style={styles.image}/>
      <Text style={styles.title}>
        Weather-Proof Parking
      </Text>
      <Text style={styles.description}>
        Get recommendations for sheltered carparks to keep you and your vehicle protected, rain or shine!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  weatherParking: {
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