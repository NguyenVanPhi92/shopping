import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import FilterByCategory from './Filters/FilterByCategory'

const ProductFilters = ({ filters, onChange }) => {
    //handle
    const handleFilterChange = () => {}
    return (
        <Box>
            <FilterByCategory onChange={handleFilterChange} />
        </Box>
    )
}

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
}

export default ProductFilters
