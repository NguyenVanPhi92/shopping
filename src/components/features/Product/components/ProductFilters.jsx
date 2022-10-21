import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import FilterByCategory from './Filters/FilterByCategory'
import FilterByPrice from './Filters/FilterByPrice'
import FilterByService from './Filters/FilterByService'

const ProductFilters = ({ filters, onChange }) => {
    //handle
    //filter category
    const handleCategoryChange = newCategoryId => {
        if (!onChange) return

        const newFilters = {
            ...filters,
            'category.id': newCategoryId,
        }

        onChange(newFilters)
    }

    // filter price
    const handleChange = value => {
        if (onChange) {
            onChange(value)
        }
    }
    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handleChange} />
            <FilterByService filters={filters} onChange={handleChange} />
        </Box>
    )
}

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
}

export default ProductFilters
