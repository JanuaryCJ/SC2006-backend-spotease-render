import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Colors } from './../../constants/Colors';

const TABS = [
  { name: 'home', label: 'Home', icon: (color) => <AntDesign name="home" size={24} color={color} /> },
  { name: 'activity', label: 'Activity', icon: (color) => <Octicons name="checklist" size={24} color={color} /> },
  { name: 'history', label: 'History', icon: (color) => <MaterialIcons name="location-history" size={24} color={color} /> },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.tabButtonColour,
        tabBarInactiveTintColor: '#888',
      }}
    >
      {TABS.map(({ name, label, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text style={[styles.tabLabel, focused && styles.tabLabelActive, { color }]}>{label}</Text>
            ),
            tabBarIcon: ({ color }) => icon(color),
          }}
        />
      ))}
    </Tabs>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.backgroundColour,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  tabLabelActive: {
    fontSize:10.5,
    fontFamily: 'Poppins-Bold',
  },
});
