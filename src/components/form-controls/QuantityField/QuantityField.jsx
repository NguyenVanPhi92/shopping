import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
}

function QuantityField(props) {
    const { form, name, label, disabled } = props
    const { errors, setValue } = form
    const hasError = errors[name]

    return (
        <FormControl error={!!hasError} margin="normal" fullWidth variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Box>
                <Controller
                    id={name}
                    type="number"
                    label={label}
                    name={name}
                    value
                    control={form.control}
                    as={OutlinedInput}
                    labelWidth={70}
                    disable={disabled}
                />
            </Box>

            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    )
}

export default QuantityField
