import ProductFeature from 'components/features/Product'
import Header from 'components/Header'
import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'

function App() {
    return (
        <>
            <Header />

            <Switch>
                <Redirect from="/home" to="/" exact />

                <Route path="/" component={ProductFeature} />
            </Switch>
        </>
    )
}

export default App
