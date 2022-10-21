import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useState } from 'react'

const useStyle = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
    rage: {
        display: 'flex',
        flexGrow: 'row nowrap',
        alignItems: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),

        '& > span': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    },
}))

const FilterByPrice = ({ onChange }) => {
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    })
    const classes = useStyle()

    //handle
    const handelChange = e => {
        const { name, value } = e.target
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const handleSubmit = () => {
        if (!onChange) return
        onChange(values)
        setValues({
            salePrice_gte: 0,
            salePrice_lte: 0,
        })
    }
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Chọn Khoảng Gía</Typography>

            <Box className={classes.rage}>
                <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handelChange} />
                <span>-</span>
                <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handelChange} />
            </Box>

            <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Áp dụng
            </Button>
        </Box>
    )
}

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
}

export default FilterByPrice
