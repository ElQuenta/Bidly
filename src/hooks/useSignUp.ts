import { useFormik } from 'formik'
import { useNavigate } from 'react-router';
import { object, string, ref, mixed } from 'yup'
import { useShowNoti } from '../context/notificationContext';
import { useState } from 'react';
import { signUp } from '../services/authService';

const signUpSchema = object({
  nickname: string()
    .min(3, 'El nickname debe tener al menos 3 caracteres')
    .max(20, 'El nickname no debe superar los 20 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras, números y guión bajo')
    .required('El nickname es obligatorio'),
  name: string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no debe superar los 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras')
    .required('El nombre es obligatorio'),
  lastname: string()
    .min(3, 'El apellido debe tener al menos 3 caracteres')
    .max(50, 'El apellido no debe superar los 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras')
    .required('El apellido es obligatorio'),
  email: string()
    .email('Debe ser un correo válido')
    .required('El correo es obligatorio'),
  password: string()
    .min(6, 'La contraseña debe tener al menos 12 caracteres')
    .required('La contraseña es obligatoria'),
  repeatPassword: string()
    .oneOf([ref('password')], 'Las contraseñas no coinciden')
    .required('Debe repetir la contraseña'),
  role: string()
    .oneOf(['user', 'admin'], 'El rol debe ser "user" o "admin"')
    .required('El rol es obligatorio'),
  avatar: mixed()
    .nullable()
    .test('fileSize', 'La imagen debe ser menor a 2 MB', value =>
      !value || (value as File).size <= 2 * 1024 * 1024
    )
    .test('fileType', 'Formato no soportado', value =>
      !value ||
      ['image/jpeg', 'image/png', 'image/gif'].includes((value as File).type)
    ),
  avatarPreview: string().nullable(),
})


const useSignUp = () => {
  const navigate = useNavigate();
  const { sendSuccess, sendError } = useShowNoti()
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);

  interface SignUpFormValues {
    nickname: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    repeatPassword: string;
    role: string;
    avatar: File | null;
    avatarPreview?: string|null
  }

  const handleSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true)
    try {
      let avatarBase64 = ''
      if (values.avatar) {
        avatarBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(values.avatar!)
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = err => reject(err)
        })
      }

      await signUp({ ...values, avatar: avatarBase64 })
      sendSuccess('Cuenta creada exitosamente')
      formik.resetForm()
      navigate('/signIn')
    } catch (err) {
      if (err instanceof Error) sendError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      nickname: '',
      name: '',
      lastname: '',
      email: '',
      password: '',
      repeatPassword: '',
      role: 'user',
      avatar: null,
      avatarPreview: ''
    },
    validationSchema: signUpSchema,
    onSubmit: handleSubmit
  })

  return { navigate, handleClickShowPassword, handleClickShowRepeatPassword, formik, showPassword, isLoading, showRepatPassword }
}

export default useSignUp