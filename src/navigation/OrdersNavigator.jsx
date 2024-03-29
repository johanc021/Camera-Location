import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header.jsx";
import Orders from "../screens/Orders.jsx";

const Stack = createNativeStackNavigator();

const OrdersNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Ordenes"
      screenOptions={({ navigation, route }) => ({
        header: () => <Header title={route.name} navigation={navigation} />,
      })}
    >
      <Stack.Screen name="Ordenes" component={Orders} />
    </Stack.Navigator>
  );
};

export default OrdersNavigator;
