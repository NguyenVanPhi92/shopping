import React from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs } from '@material-ui/core'

const ProductSort = ({ currentSort, onChange }) => {
    //handle
    const handleSortChange = (e, newValue) => {
        if (onChange) onChange(newValue)
    }

    return (
        <Tabs value={currentSort} indicatorColor="primary" textColor="primary" onChange={handleSortChange}>
            <Tab label="Gía thấp tới cao" value="salePrice:ASC"></Tab>
            <Tab label="Gía từ cao tới thấp" value="salePrice:DESC"></Tab>
        </Tabs>
    )
}

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
}

export default ProductSort
