import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, LinearProgress, Typography } from '@material-ui/core'
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

function RegisterForm(props) {
    const classes = useStyles()

    const schema = yup.object().shape({
        fullName: yup
            .string()
            .required('Please enter your full name')
            .test('Should has at least tow words', 'Please enter at tow words.', value => {
                return value.split(' ').length >= 2
            }),

        email: yup.string().required('Please enter email').email('Please enter a valid email'),
        password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 character.'),
        retypePassword: yup
            .string()
            .required('Please enter retype password.')
            .oneOf([yup.ref('password')], 'Password dose not match'),
    })

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async values => {
        const { onSubmit } = props
        if (!onSubmit) return

        await onSubmit(values)
    }

    const { isSubmitting } = form.formState

    return (
        <div style={{ width: '400px' }} className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress} />}
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

                <Button
                    className={classes.submit}
                    disabled={isSubmitting}
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                >
                    Create an account
                </Button>
            </form>
        </div>
    )
}

export default RegisterForm
