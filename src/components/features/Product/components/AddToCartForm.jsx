import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import QuantityField from 'components/form-controls/QuantityField/QuantityField'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
}

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(4),
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        textAlign: 'center',
    },
    submit: {
        marginTop: '15px',
        marginBottom: '15px',
    },

    progress: {
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0,
    },
}))

function AddToCartForm({ onSubmit = null }) {
    const classes = useStyles()

    const schema = yup.object().shape({
        quantity: yup
            .number()
            .min(1, 'Please enter least 1')
            .required('Minimum  value is 1')
            .typeError('Please enter a number'),
    })

    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = values => {
        if (!onSubmit) return

        onSubmit(values)
    }

    return (
        <form className="AddToCartForm" onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField form={form} name="quantity" label="Quantity" />

            <Button
                style={{ width: '200px' }}
                className={classes.submit}
                variant="contained"
                type="submit"
                color="primary"
            >
                Buy
            </Button>
        </form>
    )
}

export default AddToCartForm
