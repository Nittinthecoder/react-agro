import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductById, fetchProductsByFilters, fetchCategories, createProduct, updateProduct } from '../product/ProductAPI';

const initialState = {
  products: [],
  categories: [],
  status: 'idle',
  totalItems: 0,
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

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'products/fetchProductsByFilters',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);



export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct = null
    }
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
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCategoriesAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(createProductAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export const selectProductById = (state) => state.product.selectedProduct;
export const selectCategories = (state) => state.product.categories;

export default productSlice.reducer;