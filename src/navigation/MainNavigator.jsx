import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator.jsx";
import AuthNavigator from "./AuthNavigator.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../services/shopServices.js";
import { setProfilePicture } from "../features/authSlice.js";
import { useEffect } from "react";

const MainNavigator = () => {
  const user = useSelector((state) => state.authReducer.user);
  const localId = useSelector((state) => state.authReducer.localId);
  const { data, isLoading, error } = useGetProfilePictureQuery(localId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      console.error("Error fetching profile picture:", error);
    } else {
      dispatch(setProfilePicture(data?.image));
    }
  }, [data, error, dispatch]);

  return (
    <NavigationContainer>
      {user && !isLoading ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
