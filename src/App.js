import ProductFeature from 'components/features/Product'
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
            </Switch>
        </>
    )
}

export default App
