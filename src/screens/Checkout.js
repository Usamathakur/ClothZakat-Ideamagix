import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import React from 'react';

const Checkout = ({ route }) => {
  // Extracting the data passed from the ShoppingCart screen
  const { cartItems, subtotal, deliveryFee, totalAmount } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.subTitle}>Order Summary:</Text>
      {cartItems.map((cartItem, index) => (
        <View key={index} style={styles.cartItem}>
          <Text>{cartItem.product.title}</Text>
          <Text>Quantity: {cartItem.quantity}</Text>
          <Text>Price: {cartItem.product.price.toFixed(2)} US$</Text>
        </View>
      ))}
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

      {/* TouchableOpacity for the Checkout action */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Perform actions for the checkout, e.g., payment processing
          // You can also navigate to a confirmation screen if needed
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cartItem: {
    borderWidth: 2,
    borderColor: 'gray',
    padding: 20,
    marginVertical: 5,
  },
  totalsContainer: {
    marginVertical: 20,
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
    backgroundColor: 'green',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Checkout;
