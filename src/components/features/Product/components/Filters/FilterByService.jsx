import { Box, Button, Checkbox, FormControlLabel, makeStyles, TextField, Typography } from '@material-ui/core'
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

    list: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        '& > li': {
            margin: 0,
        },
    },
}))

const FilterByService = ({ filters = {}, onChange }) => {
    const classes = useStyle()

    //handle
    const handelChange = e => {
        if (!onChange) return

        const { name, checked } = e.target
        onChange({ [name]: checked })
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Dịch vụ</Typography>

            <ul className={classes.list}>
                {[
                    { value: 'isPromotion', label: 'Có khuyến mãi' },
                    { value: 'isFreeShip', label: 'Vận chuyển miễn phí' },
                ].map(service => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(filters[service.value])}
                                    name={service.value}
                                    onChange={handelChange}
                                    color="primary"
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    )
}

FilterByService.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
}

export default FilterByService
