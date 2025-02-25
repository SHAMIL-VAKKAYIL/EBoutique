import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiUrl } from '../lib/baseUrl';


export const addProduct = createAsyncThunk('product/addProduct', async ({ productData }) => {
    try {
        const response = await apiUrl.post('product/addProduct', productData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
        window.location.reload()
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const updateProduct = createAsyncThunk('product/manageProduct', async ({ productData, productId }) => {
    try {
        const response = await apiUrl.put(`product/manageProduct/${productId}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
        window.location.reload()
        return response.data
    } catch (error) {
        console.log(error);

    }
})

export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
    try {
        const response = await apiUrl.get('product/getAllProduct')
        return response.data

    } catch (error) {
        console.log(error);

    }
})

export const getSinlgeProduct = createAsyncThunk('product/getSinlgeProduct', async (productId) => {
    try {
        const response = await apiUrl.get(`product/getSinlgeProduct/${productId}`)
        return response.data

    } catch (error) {
        console.log(error);

    }
})

export const vendorProduct = createAsyncThunk('product/vendorProduct', async () => {
    try {
        const response = await apiUrl.get('product/vendorProduct')
        return response.data
    } catch (error) {
        console.log(error);

    }
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (productId) => {
    try {
        console.log(productId);
        const response = await apiUrl.delete(`product/deleteProduct/${productId}`)
        return response.data

    } catch (error) {
        console.log(error);
    }
})

export const categoryFilter = createAsyncThunk('product/categoryFilter', async ({ filter }) => {
    try {
        const response = await apiUrl.get(`product/category/${filter}`)
        return response.data
    } catch (error) {
        console.log(error);

    }
})

export const patternFilter = createAsyncThunk('product/patternFilter', async ({ filter }) => {
    try {
        const response = await apiUrl.get(`product/pattern/${filter}`)
        return response.data
    } catch (error) {
        console.log(error);

    }
})

export const priceRage = createAsyncThunk('product/priceRage', async ({ min, max }) => {
    try {
        const res = await apiUrl.get(`product/priceRage/${min}/${max}`)
        return res.data
    } catch (error) {
        console.log(error);

    }
})

export const sizeFilter = createAsyncThunk('product/sizeFilter', async ({ filter }) => {
    try {
        const response = await apiUrl.get(`product/size/${filter}`)
        console.log(response.data);

        return response.data
    } catch (error) {
        console.log(error);

    }
})

export const materialFilter = createAsyncThunk('product/materialFilter', async ({ filter }) => {
    try {
        const response = await apiUrl.get(`product/material/${filter}`)
        return response.data
    } catch (error) {
        console.log(error);

    }
})

export const colorFilter = createAsyncThunk('product/colorFilter', async ({ filter }) => {
    try {
        const response = await apiUrl.get(`product/color/${filter}`)
        return response.data
    } catch (error) {
        console.log(error);

    }
})

export const reviewsend = createAsyncThunk('product/review', async ({ productId, comment, rating }) => {
    try {
        const response = await apiUrl.post(`product/newReview`, { productId, comment: comment, rating: rating })
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getReview = createAsyncThunk('product/getreview', async (productId) => {
    try {
        const response = await apiUrl.get(`product/getreview/${productId}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getAllreview = createAsyncThunk('product/getAllreview', async (productId) => {
    try {
        const response = await apiUrl.get(`product/getAllreview`)
        return response.data
    } catch (error) {
        console.log(error);
    }
})


export const ordering = createAsyncThunk('product/ordering', async ({ totalAmount, product, user }) => {
    console.log(product);
    console.log(totalAmount);


    try {
        const res = await apiUrl.post('product/createOrder', { totalAmount: totalAmount, product: product })
        const { id: orderId, amount: amountR } = res.data
        const options = {
            key: import.meta.env.VITE_key_id,
            amount: amountR,
            currency: 'INR',
            name: 'payment ',
            description: 'Boutique test',
            order_id: orderId,
            image: 'logo',
            handler: async function (res) {
                if (res.razorpay_payment_id) {
                    window.location.href = `/success?paymentId=${res.razorpay_payment_id}`;
                } else {
                    window.location.href = '/failed';
                }
            },
            perfill: { name: user.username, contact: user.phone },
            theme: { color: '#3399c' },
            notes: { address: user.address },
        }
        const rzpy = new window.Razorpay(options)

        rzpy.open()
    } catch (error) {
        console.log(error);
    }
})

export const getOrders = createAsyncThunk('/product/getOrders', async () => {
    try {
        const response = await apiUrl.get('/product/getOrders')
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getAllOrders = createAsyncThunk('/product/getAllOrders', async () => {
    try {
        const response = await apiUrl.get('/product/getAllorders')
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const createCustomiseProduct = createAsyncThunk('/product/createCustomiseProduct', async (formData) => {
    console.log("Customized Dress Data:", Object.fromEntries(formData.entries()));
    try {

        const response = await apiUrl.post('/product/customized', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log(error);

    }
})

export const getAllCustomiseProduct = createAsyncThunk('/product/getAllCustomiseProduct', async () => {
    try {
        const response = await apiUrl.get('/product/getAllCustomiseProduct')
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getCustomizedProductsForVendor = createAsyncThunk('/product/getCustomizedProductsForVendor', async () => {
    try {
        const response = await apiUrl.get('/product/vendorcustomized')
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getUserCustomOrder = createAsyncThunk('product/getUserCustomOrder', async () => {
    try {
        const response = await apiUrl.get('/product/getUserCustomOrder')
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const setVendor = createAsyncThunk('product/setVendor', async ({ vendor, orderId }) => {
    console.log(vendor, orderId);

    try {

        const response = await apiUrl.post('/product/setVendor', { vendor, orderId })
        return response.data
    } catch (error) {
        console.log(error);

    }

})

export const addToCart = createAsyncThunk('product/addToCart', async (productId) => {
    console.log(productId);

    try {
        const response = await apiUrl.post('/product/addToCart', { productId: productId })
        window.location.reload()
        return response.data

    } catch (error) {
        console.log(error);

    }
})

export const removeFromCart = createAsyncThunk('product/removeFromCart', async (productId) => {
    console.log(productId);
    try {
        const response = await apiUrl.put(`/product/delete/${productId}`)
        window.location.reload();
        return response.data

    } catch (error) {
        console.log(error);

    }
})
export const decreasequantity = createAsyncThunk('product/removeFromCart', async (productId) => {
    console.log(productId);
    try {
        const response = await apiUrl.put(`/product/decrease/${productId}`)
        window.location.reload();
        return response.data

    } catch (error) {
        console.log(error);

    }
})

export const setOrderStatus = createAsyncThunk('product/setOrderStatus', async ({ orderId, status }) => {
    try {
        const res = await apiUrl.put(`product/setStatus/${orderId}/${status}`)
        window.location.reload()
        return res.data
    } catch (error) {
        console.log(error);

    }
})

export const setcustomOrderStatus = createAsyncThunk('product/setOrderStatus', async ({ orderId, status }) => {
    try {
        const res = await apiUrl.put(`product/setcustomStatus/${orderId}/${status}`)
        window.location.reload()
        return res.data
    } catch (error) {
        console.log(error);

    }
})


export const getCart = createAsyncThunk('product/getCart', async () => {
    try {
        const response = await apiUrl.get('/product/getCart')
        return response.data
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    products: null,
    filterdProduct: null,
    singleProduct: null,
    customOrder: null,
    cart: null,
    review: [],
    orders: null,
    loading: false,
    customProd: null,
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(vendorProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(vendorProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(vendorProduct.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = state.products?.filter(product => product._id !== action.payload)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(getReview.pending, (state) => {
                state.loading = true
            })
            .addCase(getReview.fulfilled, (state, action) => {
                state.loading = false
                state.review = action.payload
            })
            .addCase(getReview.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(categoryFilter.pending, (state) => {
                state.loading = true
            })
            .addCase(categoryFilter.fulfilled, (state, action) => {
                state.loading = false
                state.filterdProduct = action.payload
            })
            .addCase(categoryFilter.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(patternFilter.pending, (state) => {
                state.loading = true
            })
            .addCase(patternFilter.fulfilled, (state, action) => {
                state.loading = false
                state.filterdProduct = action.payload
            })
            .addCase(patternFilter.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(priceRage.pending, (state, action) => {
                state.loading = true
            })
            .addCase(priceRage.fulfilled, (state, action) => {
                state.loading = false
                state.filterdProduct = action.payload
            })
            .addCase(priceRage.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(sizeFilter.pending, (state) => {
                state.loading = true
            })
            .addCase(sizeFilter.fulfilled, (state, action) => {
                state.loading = false
                state.filterdProduct = action.payload

            })
            .addCase(sizeFilter.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(materialFilter.pending, (state) => {
                state.loading = true
            })
            .addCase(materialFilter.fulfilled, (state, action) => {
                state.loading = false
                state.filterdProduct = action.payload
            })
            .addCase(materialFilter.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(colorFilter.pending, (state) => {
                state.loading = true
            })
            .addCase(colorFilter.fulfilled, (state, action) => {
                state.loading = false
                state.filterdProduct = action.payload
            })
            .addCase(colorFilter.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(getSinlgeProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(getSinlgeProduct.fulfilled, (state, action) => {
                state.loading = false
                state.singleProduct = action.payload
            })
            .addCase(getSinlgeProduct.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(reviewsend.pending, (state) => {
                state.loading = true
            })
            .addCase(reviewsend.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(reviewsend.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(getOrders.pending, (state) => {
                state.loading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(getAllOrders.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(getAllreview.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllreview.fulfilled, (state, action) => {
                state.loading = false
                state.review = action.payload
            })
            .addCase(getAllreview.rejected, (state) => {
                state.loading = false
            })

            .addCase(getCart.pending, (state) => {
                state.loading = true
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(getAllCustomiseProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCustomiseProduct.fulfilled, (state, action) => {
                state.loading = false
                state.customProd = action.payload
            })
            .addCase(getAllCustomiseProduct.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(getCustomizedProductsForVendor.pending, (state) => {
                state.loading = true
            })
            .addCase(getCustomizedProductsForVendor.fulfilled, (state, action) => {
                state.loading = false
                state.customProd = action.payload
            })
            .addCase(getCustomizedProductsForVendor.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(getUserCustomOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserCustomOrder.fulfilled, (state, action) => {
                state.loading = false
                state.customOrder = action.payload
            })
            .addCase(getUserCustomOrder.rejected, (state, action) => {
                state.loading = false
            })

    }
})

export default productSlice.reducer;