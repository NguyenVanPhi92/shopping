import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core'
import productApi from 'api/productApi'
import ProductSkeletonList from '../components/ProductSkeletonList'
import ProductList from '../components/ProductList'
import { Pagination } from '@material-ui/lab'
import ProductSort from '../components/ProductSort'
import ProductFilters from '../components/ProductFilters'

ListPage.propTypes = {}

const useStyles = makeStyles(theme => ({
    root: {},
    left: {
        width: '250px',
    },
    right: {
        flex: '1 1 0',
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '20px',
    },
}))

function ListPage(props) {
    const classes = useStyles()
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        limit: 9,
        total: 10,
        page: 1,
    })
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 9,
        _sort: 'salePrice:ASC',
    })

    useEffect(() => {
        ;(async () => {
            try {
                const { data, pagination } = await productApi.getAll(filters)
                setProductList(data)
                setPagination(pagination)
                console.log({ data, pagination })
            } catch (error) {
                console.log('Failed to fetch product list')
            }

            setLoading(false)
        })()
    }, [filters])

    //handle
    // pagination
    const handlePageChange = (e, page) => {
        setFilters(prevFilter => ({
            ...prevFilter,
            _page: page,
        }))
    }

    // sort price
    const handleSortChange = newSortValue => {
        setFilters(prevFilter => ({
            ...prevFilter,
            _sort: newSortValue,
        }))
    }

    //filter product
    const handleFiltersChange = newFilters => {
        setFilters(prevFilter => ({
            ...prevFilter,
            ...newFilters,
        }))
    }
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters filters={filters} onChange={handleFiltersChange} />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={filters._sort} onChange={handleSortChange} />

                            {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

                            <Box className={classes.pagination}>
                                <Pagination
                                    color="primary"
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default ListPage
