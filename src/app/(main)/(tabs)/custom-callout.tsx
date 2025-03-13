import { FontAwesome6 } from "@expo/vector-icons";
import { MapView, MarkerView, PointAnnotation, ShapeSource, SymbolLayer } from "@maplibre/maplibre-react-native";
import { useState } from "react";
import { NativeSyntheticEvent, Text, View } from "react-native";

export default function CustomCallout() {
  //   const [selectedFeature, setSelectedFeature] = useState<GeoJSON.Feature<GeoJSON.Point, { name: string }>>();
  const [showCallout, setShowCallout] = useState(false);
  const toggleCallout = () => {
    setShowCallout(!showCallout);
  };

  const calloutProps = {
    location: [113.293444, -7.871689],
    title: "Gunung Geni",
  };

  return (
    <MapView style={{ flex: 1 }}>
      <PointAnnotation id="point-annotation" coordinate={[113.293444, -7.871689]} onSelected={toggleCallout} onDeselected={toggleCallout}>
        <FontAwesome6 name="location-dot" size={30} color="red" />
      </PointAnnotation>
      {showCallout && (
        <MarkerView id="select-feature-marker" coordinate={calloutProps.location} anchor={{ x: 0.5, y: 1.1 }}>
          <View style={{ backgroundColor: "white", padding: 8, borderRadius: 8, width: 100 }}>
            <Text>{calloutProps.title}</Text>
          </View>
        </MarkerView>
      )}
    </MapView>
  );
}
