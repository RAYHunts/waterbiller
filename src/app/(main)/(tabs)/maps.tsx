import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Pressable, Button } from "react-native";
import { addCustomHeader, MapView, MapViewRef, Camera, CameraRef, MarkerView, Annotation, UserLocation, PointAnnotation, Callout, VectorSource, FillLayer, CircleLayer, SymbolLayer } from "@maplibre/maplibre-react-native";

// import MapView  from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Protocol } from "pmtiles";
import { MapTiles } from "@/constants/MapStyle";
import { openBrowserAsync } from "expo-web-browser";
import CustomAnnotation from "@/components/atoms/CustomAnnotation";

function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [userLocation, setUserLocation] = useState<number[] | null>(null);
  const cameraRef = useRef<CameraRef>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [markerCoordinate, setMarkerCoordinate] = useState([-7.871689, 113.293444]);
  let protocol = new Protocol();

  const gununggeni = [113.293444, -7.871689];
  const sinarJaya = [113.291386, -7.862117];
  const pasar = [113.298612, -7.859747];

  const markers = [
    { id: "1", coordinate: [113.293444, -7.871689], title: "Gunung Geni" },
    { id: "2", coordinate: [113.291386, -7.862117], title: "Sinar Jaya" },
    { id: "3", coordinate: [113.298612, -7.859747], title: "Pasar" },
  ];

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation([location.coords.longitude, location.coords.latitude]);
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  const goToUserLocation = () => {
    console.log(location);
    if (location && cameraRef?.current) {
      cameraRef?.current.flyTo([location.coords.longitude, location.coords.latitude], 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} logoEnabled={false} attributionPosition={{ bottom: 8, right: 8 }} mapStyle={MapTiles}>
        <Camera ref={cameraRef} defaultSettings={{ centerCoordinate: gununggeni, zoomLevel: 25 }} animationMode="flyTo" followUserLocation />
        {userLocation && <UserLocation />}

        {markers.map((marker) => (
          <PointAnnotation key={marker.id} id={marker.id} coordinate={marker.coordinate} onSelected={() => console.log("Selected")}>
            <FontAwesome6 name="location-dot" size={24} color="blue" />
            <Callout id={marker.id} title={marker.title}>
              <View>
                <Pressable onPress={() => openBrowserAsync("http://www.google.com/maps/place/" + marker.coordinate[1] + "," + marker.coordinate[0])}>
                  <Text>Open in Google Maps</Text>
                </Pressable>
              </View>
            </Callout>
          </PointAnnotation>
          // <CustomAnnotation key={marker.id} coordinate={marker.coordinate} onPress={() => console.log("Selected")} selected={false} data={{ id: marker.id, title: marker.title, description: "Description" }} />
        ))}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={() => console.log("Button")}>
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  map: {
    flex: 1,
  },
  callout: {
    color: "red",
  },

  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
  },
  userMarker: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "blue",
    borderWidth: 2,
    borderColor: "white",
  },
  button: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Map;
