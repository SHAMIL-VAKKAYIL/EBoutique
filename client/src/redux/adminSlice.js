import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiUrl } from '../lib/baseUrl';


// export const adminSignup = createAsyncThunk('admin/adminSignin', async () => {
//     try {
//         const res = await apiUrl.post('/admin/singup')
//         return res.data;

//     } catch (error) {
//         console.log(error);
//     }
// })

export const adminSignin = createAsyncThunk('admin/adminSignin', async ({ email, password }) => {
    console.log(email, password);

    try {
        const res = await apiUrl.post('/admin/signin', { email: email, password: password })
        window.location.href = '/admin'
        return res.data;

    } catch (error) {
        console.log(error);
    }
})

export const adminCheckAuth = createAsyncThunk('admin/adminCheckAuth', async () => {
    try {
        const response = await apiUrl.get('/admin/authCheck')
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const adminSignout = createAsyncThunk('admin/adminSignout', async () => {
    try {
        await apiUrl.post('/admin/logout')
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    admin: null,
    error: null,
    loading: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(adminSignin.pending, (state) => {
                state.loading = true
            })
            .addCase(adminSignin.fulfilled, (state, action) => {
                state.loading = false
                state.admin = action.payload
            })
            .addCase(adminSignin.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(adminCheckAuth.pending, (state) => {
                state.loading = true
            })
            .addCase(adminCheckAuth.fulfilled, (state, action) => {
                state.loading = false
                state.admin = action.payload
            })
            .addCase(adminCheckAuth.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(adminSignout.pending, (state) => {
                state.loading = true
            })
            .addCase(adminSignout.fulfilled, (state) => {
                state.loading = false
                state.admin = null
            })
            .addCase(adminSignout.rejected, (state, action) => {
                state.loading = false
            })
    }

})

export default adminSlice.reducer