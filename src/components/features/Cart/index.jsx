import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { cartItemsCountSelector, cartTotalSelector, productTotalSelector } from './selectors'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Box, Button } from '@material-ui/core'
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/common'
import { formatPrice } from 'utils'
import { useHistory } from 'react-router-dom'

CartFeature.propTypes = {}

const useStyles = makeStyles({
    root: {
        width: '800px',
        margin: '50px auto',
    },

    table: {
        minWidth: 650,
    },

    totalPrice: {
        fontSize: '24px',
    },
})

function CartFeature(props) {
    const cartTotal = useSelector(cartTotalSelector)
    const cartItemsCount = useSelector(cartItemsCountSelector)
    const cartItems = useSelector(state => state.cart.cartItems)
    const loggedInUser = useSelector(state => state.user.current)
    const isLoggedIn = !!loggedInUser.id
    const listProduct = cartItems.map((cart, index) => cart.product)
    const classes = useStyles()
    const history = useHistory()

    const handleCheckOutCart = () => {
        // if(!isLoggedIn) return history.push("")
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
                <Button color="primary" fullWidth variant="contained">
                    Check out
                </Button>
            </Box>
        </>
    )
}

export default CartFeature
