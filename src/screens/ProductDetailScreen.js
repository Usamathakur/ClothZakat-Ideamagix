import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, useWindowDimensions, ScrollView, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { cartSlice } from '../store/cartSlice';
import axios from 'axios';

const ProductDetailScreen = ({ route }) => {
  const selectedProductId = route.params.productId;
  const [product, setProduct] = useState(null);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const addToCart = () => {
    if (product) {
      dispatch(cartSlice.actions.addCartItem({ product: product }));
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${selectedProductId}`);
        console.log('API Response:', response.data); // Log the API response to check the data structure
        const data = response.data;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
  
    if (selectedProductId) {
      fetchProductDetails();
    }
  }, [selectedProductId]);
  

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        <View style={{ padding: 20 }}>
        <Image source={{ uri: product.image }} style={{ width, aspectRatio: 1 }} />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>Price: ${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <Pressable onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>
    </View>
  );
};


const styles=StyleSheet.create({
    title:{
        fontSize:34,
        fontWeight:'500',
        marginVertical:10
    },
    address:{
        fontWeight:'400',
        fontSize:16
    },
    description:{
        marginVertical:10,
        fontSize:18,
        lineHeight:30,
        fontWeight:'300'
    },
    contact:{
        fontWeight:'bold',
        fontSize:16,
        color:'green'
    },
    button:{
        position:'absolute',
        backgroundColor:'black',
        bottom:0,
        width:'90%',
        alignSelf:'center',
        padding:20,
        borderRadius:100,
        alignItems:'center',
        paddingVertical:20
    },
    buttonText:{
        color:'white',
        fontWeight:'500',
        fontSize:16,
    }
})

export default ProductDetailScreen