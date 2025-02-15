import { useForm } from 'react-hook-form'
import { InputField } from './../Components/InputField'
import { Button } from '../Components/Button'
import LoginImg from './../Assets/LoginImg.png'
import { StickyFooterMobile } from '../Components/StickyFooterMobile'
import { Navbar } from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { postRequest } from '../Services/Api'
import Cookies from 'js-cookie'
import { useUser } from '../Services/AuthContext'

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    // This will contain all form data once submit button is clicked.
    const onSubmit1 = (data) => {
        console.log(data)
        const sendDataToLogin = async () => {
            try {
                const dataToSend = {
                    email: data.Email,
                    password: data.Password
                }

                const response = await postRequest('registrar/login', dataToSend)

                if (response.status === 200) {
                    alert('Login Successful')
                    await Cookies.set('token', response.data.token, { expires: 1, secure: true, sameSite: 'strict' })
                    navigate('/dashboard')
                }
                else if (response.status === 400) {
                    alert('Invalid Credentials')
                }
                else {
                    alert('Something went wrong')
                }
            } catch (error) {
                alert('Invalid Credentials')
            }
        }
        sendDataToLogin()
    }

    return (
        <>
            <Navbar signout={false} />

            {/* flex div with login and image */}
            <div className='flex justify-evenly w-screen items-center h-screen'>

                {/* login form div */}
                <div className='flex justify-center items-center h-screen'>

                    {/* form with box shadow */}
                    <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5'
                        autoComplete='off' id='loginForm' onSubmit={handleSubmit(onSubmit1)}>

                        <h1 className='text-2xl font-bold'>Registrar Login</h1>
                        <p className='text-gray-500'>Please fill your details to access your account.</p>

                        {/* Email input field */}
                        <InputField
                            placeholder='Enter Email'
                            label='Email'
                            register={register}
                            error={errors.Email?.message}
                        />
                        
                        {/* Password input field */}
                        <InputField
                            placeholder='Enter Password'
                            label='Password'
                            type='password'
                            register={register}
                            error={errors.Password?.message}
                        />

                        {/* Login button */}
                        <Button type='submit' className="block w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                            Login
                        </Button>

                        <p className='text-gray-500'>
                            Forgot Password? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/reset-password')}>Reset Password</span>
                        </p>
                    </form>
                </div>

                {/* Image div, only displayed in large screens */}
                <div className='hidden lg:block'>
                    <img src={LoginImg} alt='login' className='w-[600px]' />
                </div>
            </div>

            <StickyFooterMobile />
        </>
    )
}

export default LoginForm;
