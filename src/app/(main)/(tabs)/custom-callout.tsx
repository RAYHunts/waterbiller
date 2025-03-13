import { MapView, MarkerView, ShapeSource, SymbolLayer } from "@maplibre/maplibre-react-native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FEATURE_COLLECTION: GeoJSON.FeatureCollection<GeoJSON.Point, { name: string }> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "marker1",
      geometry: {
        type: "Point",
        coordinates: [-73.99155, 40.73581],
      },
      properties: {
        name: "Marker 1",
      },
    },
    {
      type: "Feature",
      id: "marker2",
      geometry: {
        type: "Point",
        coordinates: [-73.98155, 40.74581],
      },
      properties: {
        name: "Marker 2",
      },
    },
    {
      type: "Feature",
      id: "marker3",
      geometry: {
        type: "Point",
        coordinates: [-73.97155, 40.75581],
      },
      properties: {
        name: "Marker 3",
      },
    },
  ],
};

const styles = StyleSheet.create({
  touchableContainer: {
    borderColor: "black",
    borderWidth: 1.0,
    width: 60,
  },
  touchable: {
    backgroundColor: "blue",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableText: {
    color: "white",
    fontWeight: "bold",
  },
});

interface AnnotationContentProps {
  title: string;
}

function AnnotationContent({ title }: AnnotationContentProps) {
  return (
    <View style={styles.touchableContainer}>
      <Text>{title}</Text>
      <TouchableOpacity style={styles.touchable}>
        <Text style={styles.touchableText}>Btn</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CustomCallout() {
  const [selectedFeature, setSelectedFeature] = useState<GeoJSON.Feature<GeoJSON.Point, { name: string }>>();

  return (
    <MapView style={{ flex: 1 }}>
      <ShapeSource
        id="shape-source"
        shape={FEATURE_COLLECTION}
        onPress={(event) => {
          const feature = event?.features[0] as GeoJSON.Feature<GeoJSON.Point, { name: string }> | undefined;

          setSelectedFeature(feature);
        }}
      >
        <SymbolLayer
          id="symbol-layer"
          style={{
            iconAllowOverlap: true,
            iconAnchor: "center",
            iconImage: require("~/assets/images/marker_map_icon.png"),
            iconSize: 0.05,
          }}
        />
      </ShapeSource>
      {selectedFeature && (
        <MarkerView key={selectedFeature.id} id={selectedFeature.id as string} coordinate={selectedFeature.geometry.coordinates} anchor={{ x: 0.5, y: 2 }}>
          <AnnotationContent title={selectedFeature.properties.name} />
        </MarkerView>
      )}
    </MapView>
  );
}
