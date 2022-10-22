import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import DOMPurify from 'dompurify'

ProductDescription.propTypes = {
    product: PropTypes.object,
}

function ProductDescription({ product = {} }) {
    return (
        <Paper elevation={0} style={{ padding: '15px' }}>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
        </Paper>
    )
}

export default ProductDescription
