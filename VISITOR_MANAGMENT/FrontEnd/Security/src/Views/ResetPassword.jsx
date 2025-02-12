import { useForm } from 'react-hook-form'
import { InputField } from './../Components/InputField'
import { Button } from '../Components/Button'
import LoginImg from './../Assets/LoginImg.png'
import { StickyFooterMobile } from '../Components/StickyFooterMobile'
import { Navbar } from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { postRequest } from '../Services/Api'
import Cookies from 'js-cookie'

const ResetPasssword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    // This will contain all form data once submit button is clicked.
    const onSubmit1 = (data) => {
        console.log(data);
        const sendDataToLogin = async () => {
            try {
                const dataToSend = {
                    email: data.Email,
                    type: 'staff'
                }

                // console.log(dataToSend)

                const response = await postRequest('reset/initResetPassword', dataToSend)
                // console.log(response)

                if (response.status == 200) {
                    alert('Reset Link has been sent Successfully')
                    // window.location.reload()
                    navigate('/login')
                }
                else if (response.status == 404) {
                    alert('Email not found')
                }
                else {
                    alert('Internal Server Error')
                }
            } catch (error) {
                alert('Invalid Credentials')
            }
        }
        sendDataToLogin()
    }

    // Registering the fields with react-hook-form
    register('Email', {
        required: { value: true, message: 'Email is required' },
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
                        <h1 className='text-2xl font-bold'>Reset Password</h1>
                        <p className='text-gray-500'>Please fill your Email to reset your password.</p>

                        {/* Mobile and password input fields */}
                        <InputField
                            placeholder='Enter Email'
                            label='Email'
                            type='email'
                            register={register}
                            error={errors.Email?.message}
                        />

                        {/* login button */}
                        <Button type='submit'>Submit</Button>
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

export default ResetPasssword;