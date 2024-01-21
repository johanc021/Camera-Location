import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapPreview from "./MapPreview.jsx";

const LocationSelector = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    {
      async () => {
        let { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== "granted") {
          setError("No se han otorgado los permisos para obtener la ubicación");
          return;
        }
        let location = await Location.getCurrentPositionAsync();
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      };
    }
  }, []);

  console.log(location);
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Mi ubicación actual</Text>
      {location.latitude ? (
        <>
          <Text style={styles.textLocation}>
            (Lat:{location.latitude}, Long: {location.longitude})
          </Text>
          <MapPreview location={location}></MapPreview>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({});
