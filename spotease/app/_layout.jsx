import { Stack } from "expo-router";
import {useFonts} from "expo-font";

export default function RootLayout(){
  useFonts({
    'Poppins-ExtraBold':require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    'Poppins-Regullar':require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Bold':require('../assets/fonts/Poppins/Poppins-Bold.ttf')
  })
  return (
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name = '(tabs)'/>
      </Stack>

  )
}