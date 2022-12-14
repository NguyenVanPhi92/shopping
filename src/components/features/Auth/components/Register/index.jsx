import { unwrapResult } from '@reduxjs/toolkit'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { register } from '../../userSlice'
import RegisterForm from '../RegisterForm'

const Register = ({ closeDialog }) => {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = async values => {
        try {
            values.username = values.email
            console.log('Register: ', values)
            const action = register(values) // gọi action
            const resultAction = await dispatch(action) // dispatch action
            const user = unwrapResult(resultAction) // nhận về kq resole or reject
            console.log({ user })
            enqueueSnackbar('Register successfully!!!', { variant: 'success' })

            if (closeDialog) {
                closeDialog()
            }
        } catch (error) {
            console.log('Fail to register: ', error.message)
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    )
}

Register.propTypes = {}

export default Register
