import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import CartListItem from '../components/CardListItem';
import { useSelector } from 'react-redux';

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate the subtotal of the items in the cart
  const calculateSubtotal = () => {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.product.price * cartItem.quantity;
    }, 0);
  };

  // Calculate the total amount including delivery fee
  const calculateTotal = (subtotal, deliveryFee, freeDeliveryThreshold) => {
    if (subtotal >= freeDeliveryThreshold) {
      return subtotal; // Free delivery
    } else {
      return subtotal + deliveryFee;
    }
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 10;
  const freeDeliveryThreshold = 100;
  const totalAmount = calculateTotal(subtotal, deliveryFee, freeDeliveryThreshold);

  return (
    <View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={() => (
          <View style={styles.totalsContainer}>
            <View style={styles.row}>
              <Text style={styles.text}>Subtotal</Text>
              <Text style={styles.text}>{subtotal.toFixed(2)} US$</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Delivery</Text>
              <Text style={styles.text}>{deliveryFee.toFixed(2)} US$</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.textBold}>Total</Text>
              <Text style={styles.textBold}>{totalAmount.toFixed(2)} US$</Text>
            </View>
          </View>
        )}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  textBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    bottom: 5,
    backgroundColor: 'green',
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ShoppingCart;
