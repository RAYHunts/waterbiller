import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Pressable, Button } from "react-native";
import {
  addCustomHeader,
  MapView,
  MapViewRef,
  Camera,
  CameraRef,
  MarkerView,
  Annotation,
  UserLocation,
  PointAnnotation,
  Callout,
  VectorSource,
  FillLayer,
  CircleLayer,
  SymbolLayer,
  PointAnnotationRef,
} from "@maplibre/maplibre-react-native";

// import MapView  from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Protocol } from "pmtiles";
import { MapTiles } from "@/constants/MapStyle";
import { openBrowserAsync } from "expo-web-browser";
import { Image } from "expo-image";

function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [userLocation, setUserLocation] = useState<number[] | null>(null);
  const cameraRef = useRef<CameraRef>(null);
  const pointAnnotationRefs = useRef<Record<string, PointAnnotationRef>>({});
  // const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // const [markerCoordinate, setMarkerCoordinate] = useState([-7.871689, 113.293444]);

  const gununggeni = [113.293444, -7.871689];
  // const sinarJaya = [113.291386, -7.862117];
  // const pasar = [113.298612, -7.859747];

  const markers = [
    { id: "1", coordinate: [113.293444, -7.871689], title: "Gunung Geni" },
    { id: "2", coordinate: [113.291386, -7.862117], title: "Sinar Jaya" },
    { id: "3", coordinate: [113.298612, -7.859747], title: "Pasar" },
  ];

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
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
          // <PointAnnotation key={marker.id} id={marker.id} coordinate={marker.coordinate} onSelected={() => console.log("Selected")}>
          //   <FontAwesome6 name="location-dot" size={24} color="blue" />
          //   <Callout id={marker.id} title={marker.title}>
          //     <View>
          //       <Pressable onPress={() => openBrowserAsync("http://www.google.com/maps/place/" + marker.coordinate[1] + "," + marker.coordinate[0])}>
          //         <Text>Open in Google Maps</Text>
          //       </Pressable>
          //     </View>
          //   </Callout>
          // </PointAnnotation>
          <PointAnnotation
            id={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            key={marker.id}
            draggable
            onSelected={(feature) => console.log("onSelected:", feature.id, feature.geometry.coordinates)}
            onDrag={(feature) => console.log("onDrag:", feature.id, feature.geometry.coordinates)}
            onDragStart={(feature) => console.log("onDragStart:", feature.id, feature.geometry.coordinates)}
            onDragEnd={(feature) => console.log("onDragEnd:", feature.id, feature.geometry.coordinates)}
            ref={(ref) => (pointAnnotationRefs.current[marker.id as keyof typeof pointAnnotationRefs.current] = ref!)}
          >
            <View style={styles.annotationContainer}>
              <Image source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} style={{ width: ANNOTATION_SIZE, height: ANNOTATION_SIZE }} onLoad={() => pointAnnotationRefs.current[marker.id]?.refresh()} />
            </View>
            <Callout title="This is a sample loading a remote image" />
          </PointAnnotation>
          // <CustomAnnotation key={marker.id} coordinate={marker.coordinate} onPress={() => console.log("Selected")} selected={false} data={{ id: marker.id, title: marker.title, description: "Description" }} />
        ))}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={goToUserLocation}>
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const ANNOTATION_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  annotationContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.45)",
    borderRadius: ANNOTATION_SIZE / 2,
    borderWidth: StyleSheet.hairlineWidth,
    height: ANNOTATION_SIZE,
    justifyContent: "center",
    overflow: "hidden",
    width: ANNOTATION_SIZE,
  },
});

export default Map;
