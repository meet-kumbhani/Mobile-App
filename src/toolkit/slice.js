import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { cartURL, favouriteURL, mainURL, userInfoURL } from "../config/url";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const saveUserInfo = createAsyncThunk(
    'data/saveUserInfo',
    async (userData) => {
        try {
            const response = await axios.post(userInfoURL, userData);
            return response.data;
        } catch (error) {
            console.log("err");
            throw error;
        }
    }
);

export const fetchUserInfo = createAsyncThunk(
    'data/fetchUserInfo',
    async () => {
        try {
            const response = await axios.get(userInfoURL);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const fetchAllData = createAsyncThunk(
    'data/fetchAllData',
    async () => {
        try {
            const response = await axios.get(mainURL);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const cartData = createAsyncThunk('product/cartData', async () => {
    return (await axios.get(cartURL).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err);
    }),
        await axios.delete(`${cartURL}/${0}`).then((response) => {
            return axios.get(cartURL).then((response) => {
                return response.data
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        })
    )
});

export const addToCart = createAsyncThunk('data/addToCart', async (info) => {
    try {
        const response = await axios.post(cartURL, info);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const removeFromCart = createAsyncThunk('data/removeFromCart', async (itemId) => {
    try {
        await axios.delete(`${cartURL}/${itemId}`);
        return itemId;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const favouriteData = createAsyncThunk('product/favouriteData', async () => {
    return (await axios.get(favouriteURL).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err);
    }),
        await axios.delete(`${favouriteURL}/${0}`).then((response) => {
            return axios.get(favouriteURL).then((response) => {
                return response.data
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        })
    )
});

export const addToFavourites = createAsyncThunk('data/addToFavourites', async (info) => {
    try {
        const response = await axios.post(favouriteURL, info);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const removeFromFavourite = createAsyncThunk('data/removeFromFavourite', async (itemId) => {
    try {
        await axios.delete(`${favouriteURL}/${itemId}`);
        return itemId;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const updateCartItemQuantity = createAsyncThunk(
    'data/updateCartItemQuantity',
    async ({ itemId, quantity }) => {
        try {
            await axios.patch(`${cartURL}/${itemId}`, { quantity });
            return { itemId, quantity };
        } catch (error) {
            throw error;
        }
    }
);

const userSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCartData: (state, action) => {
            state.cartData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveUserInfo.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(saveUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllData.fulfilled, (state, action) => {
                state.loading = false;
                state.allData = action.payload;
            })
            .addCase(fetchAllData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(cartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cartData.fulfilled, (state, action) => {
                state.loading = false;
                state.cartData = action.payload;
            })
            .addCase(cartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.addToCart = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartData = state.cartData.filter(item => item.id !== action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(favouriteData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(favouriteData.fulfilled, (state, action) => {
                state.loading = false;
                state.favouriteData = action.payload;
            })
            .addCase(favouriteData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addToFavourites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToFavourites.fulfilled, (state, action) => {
                state.loading = false;
                state.addToFavourites = action.payload;
            })
            .addCase(addToFavourites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeFromFavourite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromFavourite.fulfilled, (state, action) => {
                state.loading = false;
                state.favouriteData = state.favouriteData.filter(item => item.id !== action.payload);
            })
            .addCase(removeFromFavourite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                const { itemId, quantity } = action.payload;
                const existingItem = state.cartData.find(item => item.id === itemId);
                if (existingItem) {
                    existingItem.quantity = quantity;
                }
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setCartData } = userSlice.actions;
export default userSlice.reducer;