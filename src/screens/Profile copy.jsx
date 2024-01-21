import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import user_data from "../data/user_data.json";
import { useState } from "react";
import { colors } from "../global/colors.js";
import { useSelector } from "react-redux";
import LocationSelector from "../components/LocationSelector.jsx";

const Profile = ({ navigation }) => {
  const image = useSelector((state) => state.authReducer.profilePicture);
  return (
    <View style={styles.container}>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("Seleccionar imagen");
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#dcdcdc" : "#e8e8e8",
            },
            styles.imageContainer,
          ]}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.profilePicture}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/img/user.png")}
              style={styles.profilePicture}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </View>
      <View style={styles.userDataContainer}>
        <Text style={styles.userTitle}>{user_data.name}</Text>
        <Text style={styles.userData}>{user_data.role}</Text>
        <Text style={styles.userData}>Nivel: {user_data.level}</Text>
        <Text style={styles.userData}>Dirección: {user_data.address}</Text>
        <Text style={styles.userData}>{user_data.city}</Text>
      </View>
      <LocationSelector />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 20,
    gap: 20,
    alignItems: "flex-start",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  userDataContainer: {
    marginTop: 10,
  },
  userTitle: {
    fontFamily: colors.fonts.secondary,
    fontSize: 16,
  },
  imageContainer: {
    borderRadius: 100,
  },
  userData: {
    fontFamily: colors.fonts.primary,
    fontSize: 12,
  },
  addressContainer: {
    alignItems: "center",
    gap: 5,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  addressTitle: {
    fontFamily: colors.fonts.secondary,
    fontSize: 14,
    color: "#fff",
  },
  addressDescription: {
    fontFamily: colors.fonts.primary,
    color: "#fff",
  },
});
