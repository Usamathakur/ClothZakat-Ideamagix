import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Pressable, ActivityIndicator, Text, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { productSlice } from '../store/productSlice';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const ProductScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user authentication status
  const [userToken, setUserToken] = useState(null); // Hold user token after successful login

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(productSlice.actions.setLoading(true));
        const response = await axios.get('https://fakestoreapi.com/products');
        const data = response.data;
        dispatch(productSlice.actions.setProducts(data));
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        dispatch(productSlice.actions.setLoading(false));
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    // Check if the user is authenticated (userToken is not null) before fetching products
    if (userToken) {
      fetchProducts();
    }
  }, [dispatch, userToken]);

  useEffect(() => {
    // Fetch products based on the selected category
    const fetchProductsByCategory = async () => {
      try {
        if (selectedCategory) {
          dispatch(productSlice.actions.setLoading(true));
          const response = await axios.get(`https://fakestoreapi.com/products/category/${selectedCategory}`);
          const data = response.data;
          dispatch(productSlice.actions.setProducts(data));
        } else {
          // If no category selected, fetch all products
          const response = await axios.get('https://fakestoreapi.com/products');
          const data = response.data;
          dispatch(productSlice.actions.setProducts(data));
        }
      } catch (error) {
        console.error('Error fetching products by category:', error);
      } finally {
        dispatch(productSlice.actions.setLoading(false));
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory, dispatch]);

  const handleProductPress = (productId) => {
    dispatch(productSlice.actions.setSelectedProduct(productId));
    navigation.navigate('Product Details', { productId: productId });
  };

  // Login function to authenticate the user
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: 'mor_2314',
        password: '83r5^_',
      });
      setUserToken(response.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  // Guest login function to simulate a guest login
  const handleGuestLogin = () => {
    setUserToken(null);
    setIsLoggedIn(true);
  };

  // Logout function to log out the user
  const handleLogout = () => {
    setUserToken(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    // Render login view if the user is not authenticated
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20,color:'gray',paddingBottom:20}}>Please login to view products</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => {}}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => {}}
          secureTextEntry
          style={styles.input}
        />
        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        <Pressable onPress={handleGuestLogin} style={styles.guestLoginButton}>
          <Text style={styles.guestLoginButtonText}>Guest Login</Text>
        </Pressable>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={{ height: 50, width: 150 }}
        >
          <Picker.Item label="All Categories" value="" />
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </View>

      {/* Product list */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleProductPress(item.id)}
            style={styles.itemContainer}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
          </Pressable>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  itemContainer: {
    width: '50%',
    padding: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 150,
    paddingTop:10,
    borderRadius:20
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight:'800'
  },
  logoutButton: {
    backgroundColor: 'lightgray',
    padding: 1,
    borderRadius: 5,
    marginTop: 10,
    alignItems:'flex-end'
  },
  logoutButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight:'800'
  },
  guestLoginButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  guestLoginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ProductScreen;
