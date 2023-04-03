import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../../requestMethods";

const initialState = {
    products: [],
    isFetching: false,
    error: false,
    deleted: false,
};

  
export const getProducts = createAsyncThunk("products", async () => {
  try{
    const response = await publicRequest.get("/products");
    const data = response.data;
  return data;
  }catch (error) {
    console.log(error);
    throw error;
  }
});

export const deleteProducts = createAsyncThunk("productsDelete", async (id) => {
  try{
    const response = await userRequest.delete(`/products/${id}`);
    const data = response.data;
  return data;
  }catch (error) {
    console.log(error);
    throw error;
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct',async ({ _id, updatedProduct }) => {
    try {
      const response = await userRequest.put(`/products/${_id}`, updatedProduct);
      const data = response.data;
      console.log("updateProduct response", data);
      return data;
    } catch (error) {
      console.log("updateProduct error", error);
      throw error;
    }
  }
);


//create products
export const createProducts = createAsyncThunk("productsCreate", async (product) => {
  try{
    const response = await userRequest.post(`/products`, product);
    const data = response.data;
  return data;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
});



const productSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isFetching = false;
        state.error = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(deleteProducts.pending, (state) => {
        state.isFetching = true;
        state.error = false;
        state.deleted = false;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.deleted = true;
        state.isFetching = false;
        state.products = state.products.filter(
          (item) => item._id !== action.payload
        );
      })      
      .addCase(deleteProducts.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isFetching = false;
        state.products = state.products.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(createProducts.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isFetching = false;
        state.products = [...state.products, action.payload];
      })
      .addCase(createProducts.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      });
  },
});


export default productSlice;
