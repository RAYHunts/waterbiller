import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import { MapView, Annotation, Camera, PointAnnotation, Callout, PointAnnotationRef } from "@maplibre/maplibre-react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { openBrowserAsync } from "expo-web-browser";

type CustomAnnotationProps = {
  coordinate: number[];
  onPress: () => void;
  selected: boolean;
  data: { id: string; title: string; description: string };
};
// Custom Annotation Component
const CustomAnnotation = ({ coordinate, onPress, selected, data }: CustomAnnotationProps) => {
  const [showCallout, setShowCallout] = useState(false);
  const [calloutAnchor, setCalloutAnchor] = useState<number[]>([0.5, 0]);
  return (
    <>
      <PointAnnotation
        id={data.id}
        coordinate={coordinate}
        onSelected={() => {
          setCalloutAnchor([0.5, 0]);
          setShowCallout(true);
        }}
        onDeselected={() => {
          setShowCallout(false);
        }}
        selected={selected}
      >
        <View style={[styles.markerContainer, selected && styles.selectedMarker]}>
          <Image source={require("~/assets/images/marker_map_icon.png")} style={styles.markerImage} />
        </View>
      </PointAnnotation>
    </>
  );
};

export default CustomAnnotation;

const styles = StyleSheet.create({
  page: { flex: 1 },
  map: { flex: 1 },

  // Custom Marker Styles
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  selectedMarker: {
    transform: [{ scale: 1.2 }],
    borderColor: "#007AFF",
  },

  // Custom Callout Styles
  calloutContainer: {
    position: "relative",
    bottom: 20,
    alignItems: "center",
  },
  calloutBubble: {
    width: 220,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  calloutButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  closeText: {
    fontSize: 20,
    color: "#666",
  },
  calloutArrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    transform: [{ rotate: "180deg" }],
    marginTop: -4,
  },
});
