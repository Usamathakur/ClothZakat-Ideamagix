import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ProductScreen from './screens/ProductScreen'
import ProductDetailScreen from './screens/ProductDetailScreen'
import ShoppingCart from './screens/ShoppingCart'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable, Text } from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { selectNumberOfItems } from './store/cartSlice'
import Checkout from './screens/Checkout'
const Stack = createNativeStackNavigator();
const navigation = () => {
  const numberOfItems = useSelector(selectNumberOfItems);
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Products' component={ProductScreen}
            options={({navigation})=>({headerRight:()=>(
                <Pressable onPress={()=>navigation.navigate('Cart')} style={{flexDirection:'row'}}>
                    <FontAwesome5 name='shopping-cart'
                size={18} color='green'/>
                <Text style={{marginLeft:5, fontWeight:'500'}}>{numberOfItems}</Text>
                </Pressable>
            ),})}/>
            <Stack.Screen name='Product Details' component={ProductDetailScreen}
            options={{presentation:'modal'}}/>
            <Stack.Screen name='Cart' component={ShoppingCart}/>
            <Stack.Screen name='Checkout' component={Checkout}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default navigation