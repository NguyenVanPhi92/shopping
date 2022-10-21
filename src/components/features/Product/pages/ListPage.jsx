import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core'
import productApi from 'api/productApi'
import ProductSkeletonList from '../components/ProductSkeletonList'
import ProductList from '../components/ProductList'
import queryString from 'query-string'
import { Pagination } from '@material-ui/lab'
import ProductSort from '../components/ProductSort'
import ProductFilters from '../components/ProductFilters'
import FilterViewer from '../components/Filters/FilterViewer'
import { useHistory, useLocation } from 'react-router-dom'

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
    const history = useHistory()
    const location = useLocation()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)

        return {
            ...params,
            _page: +params._page || 1,
            _limit: +params._limit || 9,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        }
    }, [location.search])

    const classes = useStyles()
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        limit: 9,
        total: 10,
        page: 1,
    })

    // get list page product sau khi filters
    useEffect(() => {
        ;(async () => {
            try {
                const { data, pagination } = await productApi.getAll(queryParams)
                setProductList(data)
                setPagination(pagination)
                console.log({ data, pagination })
            } catch (error) {
                console.log('Failed to fetch product list')
            }

            setLoading(false)
        })()
    }, [queryParams])

    //handle
    // pagination
    const handlePageChange = (e, page) => {
        const filters = {
            ...queryParams,
            _page: page,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        })
    }

    // sort price
    const handleSortChange = newSortValue => {
        const filters = {
            ...queryParams,
            _sort: newSortValue,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        })
    }

    //filter product
    const handleFiltersChange = newFilters => {
        const filters = {
            ...queryParams,
            ...newFilters,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        })
    }

    const setNewFilter = newFilters => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters),
        })
    }
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                            <FilterViewer filters={queryParams} onChange={setNewFilter} />

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
