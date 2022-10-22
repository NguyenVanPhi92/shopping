import { Box, Button, CircularProgress, IconButton } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { formatPrice } from 'utils'
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/common'
import { openModelLogin } from '../Auth/userSlice'
import { clearCart } from './cartSlice'
import { cartItemsCountSelector, cartTotalSelector } from './selectors'
import { green } from '@material-ui/core/colors'

CartFeature.propTypes = {}

const useStyles = makeStyles(theme => ({
    root: {
        width: '800px',
        margin: '50px auto',
    },

    table: {
        minWidth: 650,
    },

    totalPrice: {
        fontSize: '24px',
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    },
}))

function CartFeature(props) {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const cartTotal = useSelector(cartTotalSelector)
    const cartItemsCount = useSelector(cartItemsCountSelector)
    const cartItems = useSelector(state => state.cart.cartItems)
    const loggedInUser = useSelector(state => state.user.current)
    const isLoggedIn = !!loggedInUser.id
    const listProduct = cartItems.map(cart => cart.product)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const timer = useRef()
    const { enqueueSnackbar } = useSnackbar()

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    })

    useEffect(() => {
        return () => {
            clearTimeout(timer.current)
        }
    }, [])

    const handleCheckOutCart = () => {
        if (isLoggedIn) {
            if (cartItems.length === 0) return enqueueSnackbar('Please select product!!!', { variant: 'warning' })

            if (!loading) {
                console.log(loading)
                setSuccess(false)
                setLoading(true)
                timer.current = window.setTimeout(() => {
                    setSuccess(true)
                    setLoading(false)
                    dispatch(clearCart())
                    enqueueSnackbar('Thank you for your purchase!!!', { variant: 'success' })
                    return history.push('/products')
                }, 2000)
            }
        } else {
            return dispatch(openModelLogin())
        }
    }

    return (
        <>
            <TableContainer className={classes.root} component={Paper} style={{ boxShadow: 'none' }}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Product</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">
                                Quantity
                            </TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">
                                Promotion
                            </TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">
                                Price
                            </TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">
                                Total
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listProduct.map((product, index) => (
                            <TableRow key={product.name}>
                                <TableCell component="th" scope="row">
                                    <img
                                        width="70px"
                                        height="50px"
                                        src={
                                            product.thumbnail
                                                ? `${STATIC_HOST}${product.thumbnail?.url}`
                                                : THUMBNAIL_PLACEHOLDER[
                                                      Math.floor(Math.random() * THUMBNAIL_PLACEHOLDER.length)
                                                  ]
                                        }
                                        alt=""
                                    />
                                </TableCell>
                                <TableCell align="right">{cartItems[index].quantity}</TableCell>
                                <TableCell align="right">{product.promotionPercent}</TableCell>
                                <TableCell align="right">{formatPrice(product.salePrice)}</TableCell>
                                <TableCell align="right">
                                    {formatPrice(cartItems[index].quantity * product.salePrice)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left" style={{ fontSize: '20px' }}>
                                Sum Price
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '20px' }}>
                                {cartItemsCount}
                            </TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="right" className={classes.totalPrice}>
                                {formatPrice(cartTotal)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Box style={{ width: '300px', margin: '20px auto' }} onClick={handleCheckOutCart}>
                <Button color="primary" variant="contained" className={buttonClassname} disabled={loading} fullWidth>
                    Check out
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>
            </Box>
        </>
    )
}

export default CartFeature
