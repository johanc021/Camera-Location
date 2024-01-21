import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
/* import cart_data from "../data/cart_data.json"; */
import CartItem from "../components/CartItem";
import { colors } from "../global/colors";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/shopServices.js";

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cartReducer.items);
  const total = useSelector((state) => state.cartReducer.total);
  const [triggerPost, result] = usePostOrderMutation();

  const confirmCart = () => {
    triggerPost({ total, cartItems, user: "Loggeduser" });
  };

  const renderCartItem = ({ item }) => <CartItem item={item} />;

  return (
    <View style={styles.cartContainer}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.cartConfirm}>
        <Text style={styles.totalPrice}>Total: COP {total}</Text>
        <TouchableOpacity style={styles.confirmButton} onPress={confirmCart}>
          <Text style={styles.textConfirm}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
  },
  cartConfirm: {
    marginBottom: 130,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  totalPrice: {
    fontSize: 16,
    fontFamily: colors.fonts.secondary,
  },
  confirmButton: {
    backgroundColor: colors.buyButton,
    padding: 10,
    borderRadius: 10,
  },
  textConfirm: {
    fontFamily: colors.fonts.secondary,
    fontSize: 16,
    color: "#fff",
  },
});
