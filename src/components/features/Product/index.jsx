import { Box } from '@material-ui/core'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import ListPage from './pages/ListPage'

function ProductFeature(props) {
    const match = useRouteMatch()

    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component={ListPage} />
                <Route path={`${match.url}/:productId`} exact component={DetailPage} />
            </Switch>
        </Box>
    )
}

export default ProductFeature
