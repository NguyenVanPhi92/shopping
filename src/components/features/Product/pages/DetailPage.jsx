import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core'
import { addToCart } from 'components/features/Cart/cartSlice'
import useProductDetail from 'hooks/useProductDetail'
import { useDispatch } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import AddToCartForm from '../components/AddToCartForm'
import ProductAdditional from '../components/Menu/ProductAdditional'
import ProductDescription from '../components/Menu/ProductDescription'
import ProductMenu from '../components/Menu/ProductMenu'
import ProductReviews from '../components/Menu/ProductReviews'
import ProductInfo from '../components/ProductInfo'
import ProductThumbnail from '../components/ProductThumbnail'

DetailPage.propTypes = {}

const useStyles = makeStyles(theme => ({
    root: {
        paddingBottom: theme.spacing(3),
    },
    left: {
        width: '400px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
    right: {
        flex: '1 1 0',
        padding: theme.spacing(1.5),
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '20px',
    },
    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
    },
}))

function DetailPage(props) {
    const classes = useStyles()
    const {
        params: { productId },
        url,
    } = useRouteMatch()
    const { product, loading } = useProductDetail(productId)
    const dispatch = useDispatch()

    if (loading) {
        return (
            <Box>
                <LinearProgress className={classes.loading} color="secondary" />
            </Box>
        )
    }

    const handleAddToCartSubmit = formValues => {
        console.log({ formValues })
        const action = addToCart({
            id: product.id,
            product,
            quantity: formValues.quantity,
        })
        console.log({ action })
        dispatch(action)
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartSubmit} />
                        </Grid>
                    </Grid>
                </Paper>

                <ProductMenu />

                <Switch>
                    <Route path={url} exact>
                        <ProductDescription product={product} />
                    </Route>
                    <Route path={`${url}/additional`} component={ProductAdditional} />
                    <Route path={`${url}/reviews`} component={ProductReviews} />
                </Switch>
            </Container>
        </Box>
    )
}

export default DetailPage
