import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiUrl } from '../lib/baseUrl';


export const vendorSignup = createAsyncThunk('vendor/vendorSignup', async ({ vendor }) => {
    try {
        const res = await apiUrl.post('/vendor/newVendor', { vendor })
        return res.data;
    }
    catch (e) {
        console.log(e);

    }
})


export const vendorSignin = createAsyncThunk('vendor/vendorSignin', async ({ email, password }) => {
    console.log(email, password);

    try {
        const res = await apiUrl.post('/vendor/signin', { email: email, password: password })
        window.location.href = '/vendor'
        return res.data;

    } catch (error) {
        console.log(error);
    }
})

export const vendorCheckAuth = createAsyncThunk('vendor/vendorCheckAuth', async () => {
    try {
        const response = await apiUrl.get('/vendor/authCheck')
        return response.data
    } catch (error) {
        console.log(error);
    }
})
export const vendorSignout = createAsyncThunk('vendor/vendorSignout', async () => {
    try {
        const response = await apiUrl.post('/vendor/logout')
        return response.data
    } catch (error) {
        console.log(error);
    }
})
export const getAllVendors = createAsyncThunk('vendor/getAllVendors', async () => {
    try {
        const response = await apiUrl.get('/vendor/getAllVendor')
        return response.data

    } catch (error) {
        console.log(error);

    }
})




const initialState = {
    vendor: null,
    allVendors: null,
    error: null,
    loading: false
}

const vendorSlice = createSlice({
    name: 'vendor',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(vendorSignin.pending, (state) => {
                state.loading = true
            })
            .addCase(vendorSignin.fulfilled, (state, action) => {
                state.loading = false
                state.vendor = action.payload
            })
            .addCase(vendorSignin.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(vendorCheckAuth.pending, (state) => {
                state.loading = true
            })
            .addCase(vendorCheckAuth.fulfilled, (state, action) => {
                state.loading = false
                state.vendor = action.payload
            })
            .addCase(vendorCheckAuth.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(vendorSignout.pending, (state) => {
                state.loading = true
            })
            .addCase(vendorSignout.fulfilled, (state) => {
                state.loading = false
                state.vendor = null
            })
            .addCase(vendorSignout.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(getAllVendors.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllVendors.fulfilled, (state, action) => {
                state.loading = false
                state.allVendors = action.payload
            })
            .addCase(getAllVendors.rejected, (state, action) => {
                state.loading = false
            })
    }

})

export default vendorSlice.reducer