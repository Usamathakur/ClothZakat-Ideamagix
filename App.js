import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ProductScreen from './src/screens/ProductScreen';
import ShoppingCart from './src/screens/ShoppingCart';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Navigation/>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
