import { Box, Typography } from '@material-ui/core'
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/common'
import PropTypes from 'prop-types'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { formatPrice } from 'utils'

Product.propTypes = {
    product: PropTypes.object,
}

function Product({ product }) {
    const history = useHistory()
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER[Math.floor(Math.random() * THUMBNAIL_PLACEHOLDER.length)]

    const handleClick = () => {
        history.push(`/products/${product.id}`)
    }
    return (
        <Box padding={1} minHeight="215px" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <Box padding={1}>
                <img src={thumbnailUrl} alt={product.name} width="100%" />
            </Box>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                <Box component="span" fontSize="16px" fontWeight="bold" marginRight={1}>
                    {formatPrice(product.salePrice)}
                </Box>
                {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ''}
            </Typography>
        </Box>
    )
}

export default Product
