import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  categories: [], // Initialize categories as an empty array
  loading: false,
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      const productId = action.payload;
      state.selectedProduct = state.products.find((p) => p.id == productId);
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
      },
  },
});

export const fetchProductsAsync = () => async (dispatch) => {
  try {
    dispatch(productSlice.actions.setLoading(true));
    const response = await axios.get("https://fakestoreapi.com/products");
    const data = response.data;
    dispatch(productSlice.actions.setProducts(data));
  } catch (error) {
    console.error("Error fetching product data:", error);
  } finally {
    dispatch(productSlice.actions.setLoading(false));
  }
};

export default productSlice.reducer;
