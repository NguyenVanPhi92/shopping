const { configureStore } = require('@reduxjs/toolkit')

const rootReducer = {
    counter: '',
}

const store = configureStore({
    reducer: rootReducer,
})

export default store
