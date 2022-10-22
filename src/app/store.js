import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'components/features/Auth/userSlice'
import cartReducer from 'components/features/Cart/cartSlice'

const rootReducer = {
    user: userReducer,
    cart: cartReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store
