import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductById } from '../product/ProductAPI';

const initialState = {
  products: [],
  status: 'idle',
  selectedProduct:null
};
// fetch all products from api
export const fetchAllProductsAsync = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
// fetch selected products from api
export const fetchProductByIdAsync = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);


export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      });
  },
});

// export const { increment } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;