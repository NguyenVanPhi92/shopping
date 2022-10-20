import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, LinearProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LockOpenOutlined } from '@material-ui/icons'
import InputField from 'components/form-controls/InputField/InputField'
import PasswordField from 'components/form-controls/PasswordField/PasswordField'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

LoginForm.propTypes = {
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

function LoginForm(props) {
    const classes = useStyles()

    const schema = yup.object().shape({
        identifier: yup.string().required('Please enter email').email('Please enter a valid email'),
        password: yup.string().required('Please enter your password'),
    })

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
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
                SignIn
            </Typography>
            <form className="LoginForm" onSubmit={form.handleSubmit(handleSubmit)}>
                <div>
                    <InputField form={form} name="identifier" label="Email" />
                </div>
                <div>
                    <PasswordField form={form} name="password" label="Password" />
                </div>

                <Button
                    disabled={isSubmitting}
                    className={classes.submit}
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                >
                    Login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm
