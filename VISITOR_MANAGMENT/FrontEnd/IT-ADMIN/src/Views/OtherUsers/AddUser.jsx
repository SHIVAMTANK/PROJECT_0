import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { StickyFooterMobile } from '../../Components/StickyFooterMobile'
import { useForm } from 'react-hook-form'
import { InputField } from '../../Components/InputField'
import { Button } from '../../Components/Button'
import { postRequestWithToken } from '../../Services/Api'
import { useNavigate } from 'react-router-dom'
import UserData from './UsersData'
import { useEffect, useState } from 'react'

// {
//      "role": "User"
//     "name": "John Doe",
//      "mobile": "03001234567",
//      "email": "
//      "Role": "IT"
// }

const AddUser = () => {

    const navigate = useNavigate();

    const [showMobile, setShowMobile] = useState(true);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const roleValue = watch('Role');

    useEffect(() => {
        if (roleValue === 'registrar') {
            setShowMobile(false);
        } else {
            setShowMobile(true);
        }
    }, [roleValue]);

    const onSubmit = async (data) => {
        try {
            const dataTosend = {
                role: data.Role,
                name: data.Name,
                mobile: data.Mobile,
                email: data.Email,
            }

            console.log(dataTosend);

            const reponse = await postRequestWithToken('itAdmin/addUser', dataTosend);  
            // console.log(reponse);

            if(reponse.status === 200){
                alert('User Added Successfully');
                reset();
                // navigate('/security-admin')
            }
            else if(reponse.status === 401){
                alert('Session Expired');
                navigate('/login');
            }
            else if(reponse.status === 409){
                alert(`Duplicate key error: ${reponse.data.duplicateKey} already exists`);
            }
            else{
                alert('Error Occured');
            }

        } catch (error) {
            console.log(error);
            alert('Error Occured');
        }
    }

    // register('Role', { required: 'Role is required' });
    register('Name', { required: 'Name is required' });
    register('Mobile', { required: 'Mobile is required' });
    register('Email', { required: 'Email is required' });
    register('Role', { required: 'Role is required' });


    return (
        <div className='h-screen'>
            <Navbar />

            <div className='w-screen flex flex-col items-center justify-center my-5'>
                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                    id='loginForm' onSubmit={handleSubmit(onSubmit)}>

                    <h1 className='text-2xl font-bold'>Add User</h1>
                    <p className='text-gray-500'>Please fill the form to add user.</p>

                    <label className='mt-4 block text-sm font-medium text-gray-700'>Select Role</label>
                    <select className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue3 focus:border-transparent' 
                        {...register('Role')}
                        >
                        <option value="" >Select Role</option>
                        {
                            UserData?.map((Role, index) => {
                                return (
                                    <option key={index} value={Role.value}>{Role.Role}</option>
                                )
                            })
                        }
                    </select>
                    {errors.Roles && <p className='text-red-500 text-xs mt-1'>{errors.Roles.message}</p>}

                    <InputField
                        placeholder='Name'
                        label='Name'
                        type='text'
                        register={register}
                        error={errors.Name?.message}
                    />
                    
                    {/* show mobile field if registrar is not selected */}
                    {
                        showMobile &&
                        <InputField
                            placeholder='Mobile'
                            label='Mobile'
                            type='text'
                            register={register}
                            error={errors.Mobile?.message}
                        />
                    }

                    <InputField
                        placeholder='Email'
                        label='Email'
                        type='email'
                        register={register}
                        error={errors.Email?.message}
                    />
                    
                    <Button type='submit'> Add User </Button>
                </form>
            </div>
            <StickyFooterMobile />

        </div>
    )
}

export default AddUser
