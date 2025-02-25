import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiUrl } from '../lib/baseUrl';


export const userSignup = createAsyncThunk('user/userSignup', async ({ username, email, password }) => {
    try {
        const res = await apiUrl.post('/user/signup', { username, email, password })
        window.location.href = '/signin'
        return res.data;
    } catch (error) {
        console.log(error);

    }
})
export const userSignin = createAsyncThunk('user/userSignin', async ({ email, password }) => {
    try {
        const res = await apiUrl.post('/user/signin', { email, password })
        window.location.href = '/'
        return res.data

    } catch (error) {
        console.log(error);

    }
})
export const updateProfile = createAsyncThunk('user/updateProfile', async ({ username, email, phone, address }) => {
    try {
        const res = await apiUrl.put(`/user/updateProfile`, { username: username, email: email, phone: phone, address: address });
        return res.data
    } catch (error) {
        console.log(error);

    }
})

export const userSignout = createAsyncThunk('user/userSignout', async () => {
    try {
        const res = await apiUrl.post('/user/logout')
        alert(res.data.message)
        return res.data
    } catch (error) {
        console.log(error);

    }
})

export const userCheckAuth = createAsyncThunk('user/checkAuth', async () => {
    try {
        const res = await apiUrl.get('/user/authCheck')
        return res.data

    } catch (error) {
        console.log(error);

    }
})

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    try {
        const res = await apiUrl.get('/user/allUsers')
        return res.data

    } catch (error) {
        console.log(error);

    }
})





const initialState = {
    user: null,
    loading: false,
    allUsers: null,
    error: null,
    // cart: [],
    // order: null,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userSignin.pending, (state, action) => {
                state.loading = true
            })
            .addCase(userSignin.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(userSignin.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(userCheckAuth.pending, (state, action) => {
                state.loading = true
            })
            .addCase(userCheckAuth.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(userCheckAuth.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(updateProfile.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(userSignout.pending, (state, action) => {
                state.loading = true
            })
            .addCase(userSignout.fulfilled, (state, action) => {
                state.loading = false
                state.user = null
            })
            .addCase(userSignout.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(getAllUsers.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false
                state.allUsers = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false
            })



    }
})

export default userSlice.reducer