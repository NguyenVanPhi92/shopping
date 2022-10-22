import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from 'api/userApi'
import StorageKeys from 'constants/storage-key'

//  tạo async action
export const register = createAsyncThunk('user/register', async payload => {
    // call API to register
    const data = await userApi.register(payload)
    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt)
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))
    return data.user
})

export const login = createAsyncThunk('user/login', async payload => {
    // call API to login
    const data = await userApi.login(payload)
    // save data to local storage
    localStorage.setItem('access_token', data.jwt)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data.user
})

// tạo reducer
const useSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        loginForm: false,
    },
    reducers: {
        logout(state) {
            //clear local storage
            localStorage.removeItem(StorageKeys.USER)
            localStorage.removeItem(StorageKeys.TOKEN)

            state.current = {}
        },

        openModelLogin(state) {
            state.loginForm = !state.loginForm
        },
    },

    // làm việc với asynchronous
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload
        },

        [login.fulfilled]: (state, action) => {
            state.current = action.payload
        },
    },
})

const { reducer, actions } = useSlice
export const { logout, openModelLogin } = actions
export default reducer
