import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LockOpenOutlined } from '@material-ui/icons'
import InputField from 'components/form-controls/InputField/InputField'
import PasswordField from 'components/form-controls/PasswordField/PasswordField'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
}

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(4),
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        textAlign: 'center',
    },
    submit: {},
}))

function RegisterForm(props) {
    const classes = useStyles()

    const schema = yup.object().shape({})

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = values => {
        const { onSubmit } = props
        if (!onSubmit) return

        onSubmit(values)
    }

    return (
        <div style={{ width: '400px' }} className={classes.root}>
            <Avatar className={classes.avatar}>
                <LockOpenOutlined />
            </Avatar>

            <Typography component="h3" variant="h5" className={classes.title}>
                Create An Account
            </Typography>
            <form className="RegisterForm" onSubmit={form.handleSubmit(handleSubmit)}>
                <div>
                    <InputField form={form} name="fullName" label="Full Name" />
                </div>
                <div>
                    <InputField form={form} name="email" label="Email" />
                </div>
                <div>
                    <PasswordField form={form} name="password" label="Password" />
                </div>
                <div>
                    <PasswordField form={form} name="retypePassword" label="Retype Password" />
                </div>

                <Button variant="contained" type="submit" color="primary" fullWidth>
                    Create an account
                </Button>
            </form>
        </div>
    )
}

export default RegisterForm
