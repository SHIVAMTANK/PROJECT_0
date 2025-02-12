import { useForm } from 'react-hook-form'
import { InputField } from './../Components/InputField'
import { Button } from '../Components/Button'
import LoginImg from './../Assets/LoginImg.png'
import { StickyFooterMobile } from '../Components/StickyFooterMobile'
import { Navbar } from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { postRequest } from '../Services/Api'
import Cookies from 'js-cookie'

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    // This will contain all form data once submit button is clicked.
    const onSubmit1 = (data) => {
        const sendDataToLogin = async () => {
            try {
                const dataToSend = {
                    email: data.Email,
                    password: data.Password
                }

                // console.log(dataToSend)

                const response = await postRequest('security/login', dataToSend)
                // console.log(response)

                if (response.status === 200) {
                    alert('Login Successful')
                    // set cookie with token, secure and httpOnly, expires in 1 day
                    // console.log(response.data.token)
                    Cookies.set('token', response.data.token, { expires: 1, secure: true, sameSite: 'strict' })
                    navigate('/dashboard')
                }
                else if (response.status === 406 || response.status === 402) {
                    alert('Your account is disabled till your next shift');
                }
                else if (response.status === 404 || response.status === 401) {
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

    // register('Mobile', {
    //     required: { value: true, message: 'Mobile number is required' },
    //     pattern: { value: /^[0-9]*$/, message: 'Mobile number must be a 10 digit number' },
    //     minLength: { value: 10, message: 'Mobile number must be a 10 digit number' },
    //     maxLength: { value: 10, message: 'Mobile number must be a 10 digit number' },
    // })

    register('Email', {
        required: { value: true, message: 'Email is required' },
    })

    register('Password', {
        required: { value: true, message: 'Password is required' },
    })

    return (
        <>
            <Navbar signout={false} />

            {/* flex div with login and image  */}
            <div className='flex justify-evenly w-screen items-center h-screen'>

                {/* login form div */}
                <div className='flex justify-center items-center h-screen'>

                    {/* form with box shadow */}
                    <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                        id='loginForm' onSubmit={handleSubmit(onSubmit1)}>
                        <h1 className='text-2xl font-bold'>Security Login</h1>
                        <p className='text-gray-500'>Please fill your detail to access your account.</p>

                        {/* email input field */}
                        <InputField
                            placeholder='Enter Email'
                            label='Email'
                            type='email'
                            register={register}
                            error={errors.Email?.message}
                        />

                        {/* password input field */}
                        <InputField
                            placeholder='Enter Password'
                            label='Password'
                            type='password'
                            register={register}
                            error={errors.Password?.message}
                        />

                        {/* full width submit button */}
                        <Button type='submit'>Login</Button>
                        <p className='text-gray-500'>Forgot Password? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/reset-password')}>reset-password</span></p>
                    </form>
                </div>

                {/* image div, only displayed in large screens */}
                <div className='hidden lg:block'>
                    {/* image */}
                    <img src={LoginImg} alt='login' className='w-[600px]' />
                </div>
            </div>

            <StickyFooterMobile />
        </>
    )
}

export default LoginForm