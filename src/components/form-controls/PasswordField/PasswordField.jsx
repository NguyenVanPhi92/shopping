import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
}

function PasswordField(props) {
    const { form, name, label, disabled } = props
    const { errors, formState } = form
    const hasError = formState.touched[name] && errors[name]
    const [showPassword, setShowPassword] = useState(false)

    //handle
    const toggleShowPassword = () => {
        setShowPassword(x => !x)
    }
    return (
        <FormControl margin="normal" fullWidth variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Controller
                id={name}
                type={showPassword ? 'text' : 'password'}
                label={label}
                name={name}
                control={form.control}
                as={OutlinedInput}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword} edge="end">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={70}
                disable={disabled}
                error={!!hasError}
                helperText={errors[name]?.message}
            />
        </FormControl>
    )
}

export default PasswordField
