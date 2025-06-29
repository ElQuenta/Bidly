import { object, string } from 'yup'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useShowNoti } from '../context/notificationContext'
import { useAuthStore } from '../store/authStore'
import { signIn as signInService } from "../services/authService"


const signInSchema = object({
  user: string()
    .required('El campo es obligatorio')
    .test(
      'is-email-or-nickname',
      'Debe ser un email válido o un nombre de usuario',
      value => {
        if (!value) return false
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const nicknameRegex = /^[a-zA-Z0-9_]{3,20}$/
        return emailRegex.test(value) || nicknameRegex.test(value)
      }
    ),
  password: string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
})

const useSignIn = () => {
  const navigate = useNavigate();
  const signIn = useAuthStore((state)=> state.signIn)
  const { sendSuccess, sendError } = useShowNoti()
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (values: { user: string, password: string }) => {
    try {
      setIsLoading(true)
      const response = await signInService(values.user, values.password);
      signIn(response.user, response.token);
      sendSuccess(`Welcome back ${response.user.nickname}`)
      navigate("/")
      formik.resetForm()
    } catch (err) {
      if (err instanceof Error) {
        sendError(err.message);
      }
    } finally{
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      user: '',
      password: ''
    },
    validationSchema: signInSchema,
    onSubmit: handleSubmit
  })

  return { isLoading, showPassword, formik, handleClickShowPassword, navigate }
}

export default useSignIn