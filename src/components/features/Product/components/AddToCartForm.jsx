import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import QuantityField from 'components/form-controls/QuantityField/QuantityField'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

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
    progress: {
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0,
    },
}))

function AddToCartForm({ onSubmit = null }) {
    const classes = useStyles()
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [success, setSuccess] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const timer = useRef()

    const schema = yup.object().shape({
        quantity: yup
            .number()
            .min(1, 'Please enter least 1')
            .required('Minimum  value is 1')
            .typeError('Please enter a number'),
    })

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    })

    useEffect(() => {
        return () => {
            clearTimeout(timer.current)
        }
    }, [])

    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    })

    const handleButtonClick = values => {
        if (!onSubmit) return

        if (!loadingBtn) {
            setSuccess(false)
            setLoadingBtn(true)
            timer.current = window.setTimeout(() => {
                setSuccess(true)
                setLoadingBtn(false)
                enqueueSnackbar('add product to cart success', { variant: 'success' })
                onSubmit(values)
            }, 600)
        }
    }

    return (
        <form className="AddToCartForm" onSubmit={form.handleSubmit(handleButtonClick)}>
            <QuantityField form={form} name="quantity" label="Quantity" />

            <Button
                style={{ width: '200px', marginTop: '15px', marginRight: '15px' }}
                className={buttonClassname}
                disabled={loadingBtn}
                variant="contained"
                type="submit"
                color="primary"
            >
                Buy
                {loadingBtn && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
        </form>
    )
}

export default AddToCartForm
