import { unwrapResult } from '@reduxjs/toolkit'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { login } from '../../userSlice'
import LoginForm from '../LoginForm'

const Login = ({ closeDialog }) => {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = async values => {
        try {
            const action = login(values) // gọi action
            const resultAction = await dispatch(action) // dispatch action
            const user = unwrapResult(resultAction) // nhận về kq resole or reject
            console.log({ user })
            enqueueSnackbar('Login successfully!!!', { variant: 'success' })

            if (closeDialog) {
                closeDialog()
            }
        } catch (error) {
            console.log('Fail to login: ', error.message)
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    }
    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    )
}

Login.propTypes = {}

export default Login
