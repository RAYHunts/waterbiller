import { Ionicons } from '@expo/vector-icons';
import {
  Camera,
  CameraRef,
  MapView,
  MarkerView,
  ShapeSource,
  SymbolLayer,
  UserLocation,
} from '@maplibre/maplibre-react-native';
import { layers, namedFlavor } from '@protomaps/basemaps';
import * as Location from 'expo-location';
import { openBrowserAsync } from 'expo-web-browser';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FEATURE_COLLECTION: GeoJSON.FeatureCollection<GeoJSON.Point, { name: string }> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'marker1',
      geometry: {
        type: 'Point',
        coordinates: [113.293444, -7.871689],
      },
      properties: {
        name: 'Gununggeni',
      },
    },
    {
      type: 'Feature',
      id: 'marker2',
      geometry: {
        type: 'Point',
        coordinates: [113.291386, -7.862117],
      },
      properties: {
        name: 'Sinar Jaya',
      },
    },
    {
      type: 'Feature',
      id: 'marker3',
      geometry: {
        type: 'Point',
        coordinates: [113.298612, -7.859747],
      },
      properties: {
        name: 'Pasar',
      },
    },
  ],
};

function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const cameraRef = useRef<CameraRef>(null);
  const [selectedFeature, setSelectedFeature] =
    useState<GeoJSON.Feature<GeoJSON.Point, { name: string }>>();

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  const goToUserLocation = async () => {
    if (location && cameraRef?.current) {
      cameraRef?.current.zoomTo(25);
      cameraRef?.current.flyTo([location.coords.longitude, location.coords.latitude], 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        logoEnabled={false}
        attributionPosition={{ bottom: 8, right: 8 }}
        mapStyle={{
          version: 8,
          glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
          sprite: 'https://protomaps.github.io/basemaps-assets/sprites/v4/light',
          sources: {
            protomaps: {
              type: 'vector',
              url: 'pmtiles://https://odznrimbyjtwvvuhwgty.supabase.co/storage/v1/object/public/public_maps//probolinggo.pmtiles',
              attribution:
                '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
            },
          },
          layers: layers('protomaps', namedFlavor('light'), { lang: 'id' }),
        }}
        onPress={() => setSelectedFeature(undefined)}>
        {location && <UserLocation />}

        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: [113.293444, -7.871689],
            zoomLevel: 25,
          }}
        />

        <ShapeSource
          id="shape-source"
          shape={FEATURE_COLLECTION}
          onPress={(event) => {
            const feature = event?.features[0] as
              | GeoJSON.Feature<GeoJSON.Point, { name: string }>
              | undefined;

            setSelectedFeature(feature);
          }}>
          <SymbolLayer
            id="symbol-layer"
            style={{
              iconAllowOverlap: true,
              iconAnchor: 'center',
              iconImage: require('~/assets/images/marker_map_icon.png'),
              iconSize: 0.05,
            }}
          />
        </ShapeSource>
        {selectedFeature && (
          <MarkerView
            key={selectedFeature.id}
            id={selectedFeature.id as string}
            coordinate={selectedFeature.geometry.coordinates}
            anchor={{ x: 0.5, y: 2 }}>
            <View style={styles.annotationContainer}>
              <TouchableOpacity
                onPress={() =>
                  openBrowserAsync(
                    `https://www.google.com/maps/search/?api=1&query=${selectedFeature.geometry.coordinates[1]},${selectedFeature.geometry.coordinates[0]}`,
                  )
                }>
                <Text style={styles.callout}>Open Map</Text>
              </TouchableOpacity>
            </View>
          </MarkerView>
        )}
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
    color: 'red',
  },

  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  userMarker: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: 'white',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
  },
  annotationContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: ANNOTATION_SIZE / 2,
    borderWidth: StyleSheet.hairlineWidth,
    height: ANNOTATION_SIZE,
    justifyContent: 'center',
    overflow: 'hidden',
    width: ANNOTATION_SIZE,
  },
  annotationText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Map;
