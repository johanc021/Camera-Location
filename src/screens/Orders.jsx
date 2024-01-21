import { FlatList, StyleSheet } from "react-native";
import OrderItem from "../components/OrderItem.jsx";
import ordersData from "../data/orders_data.json";
import { colors } from "../global/colors.js";

const Orders = () => {
  const renderOrderItem = ({ item }) => {
    const total = item.items.reduce(
      (accumulator, currentItem) =>
        (accumulator += currentItem.price * currentItem.quantity),
      0
    );

    return <OrderItem order={item} total={total} />;
  };

  return (
    <FlatList
      data={ordersData}
      renderItem={renderOrderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Orders;
