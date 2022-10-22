import ProductFeature from 'components/features/Product'
import CartFeature from 'components/features/Cart'
import Header from 'components/Header'
import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'

function App() {
    return (
        <>
            <Header />

            <Switch>
                <Redirect from="/" to="/products" exact />

                <Route path="/products" component={ProductFeature} />
                <Route path="/cart" component={CartFeature} />
            </Switch>
        </>
    )
}

export default App
