import { View, Text, Image, TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'

export default function FeatureSlide1() {
  return (
    <View style={styles.recommendParking}>
      <Image source={require('../../assets/images/recommended-parking.png')} style={styles.image}/>
      <Text style={styles.title}>Recommended Parking</Text>
      <Text style={styles.description}>
        Find the best parking spots near your destination with personalized recommendations for a hassle-free experience!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  recommendParking: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  image: {
    width: "100%",
    height: 380,
    resizeMode: "contain",
  },

  title: {
    paddingTop:20,
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