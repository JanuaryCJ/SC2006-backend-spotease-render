/*
import { View, Text } from 'react-native'
import React from 'react'

export default function home() {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

*/

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

const OneMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          html, body, #mapdiv { height: 100%; margin: 0; padding: 0; }
        </style>
        <link rel="stylesheet" href="https://www.onemap.gov.sg/web-assets/libs/leaflet/leaflet.css" />
        <script src="https://www.onemap.gov.sg/web-assets/libs/leaflet/onemap-leaflet.js"></script>
      </head>
      <body>
        <div id="mapdiv"></div>
        <script>
          let sw = L.latLng(1.144, 103.535);
          let ne = L.latLng(1.494, 104.502);
          let bounds = L.latLngBounds(sw, ne);

          let map = L.map('mapdiv', {
            center: L.latLng(1.2868108, 103.8545349),
            zoom: 16
          });

          map.setMaxBounds(bounds);

          let basemap = L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 19,
            minZoom: 11,
            attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
          });

          basemap.addTo(map);

          window.addEventListener('message', function(event) {
            let location = JSON.parse(event.data);
            if (location && location.latitude && location.longitude) {
              let userMarker = L.marker([location.latitude, location.longitude]).addTo(map);
              userMarker.bindPopup("You are here!").openPopup();
              map.setView([location.latitude, location.longitude], 16);
            }
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WebView
        source={{ html: htmlContent }}
        originWhitelist={["*"]}
        injectedJavaScript={location ? `window.postMessage(${JSON.stringify(location)});` : ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OneMap;

