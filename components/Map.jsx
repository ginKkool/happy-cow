import { View, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { useState } from "react";

export default function Map({ data }) {
  return (
    <View style={styles.containerMap}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: data.location.lat,
            longitude: data.location.lng,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerMap: {
    height: 300,
    marginTop: 20,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
