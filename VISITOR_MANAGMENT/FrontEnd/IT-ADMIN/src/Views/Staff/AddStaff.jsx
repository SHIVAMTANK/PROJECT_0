import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { StickyFooterMobile } from '../../Components/StickyFooterMobile'
import { useForm } from 'react-hook-form'
import { InputField } from '../../Components/InputField'
import { Button } from '../../Components/Button'
import departmentData from './DepartmentData'
import { postRequestWithToken } from '../../Services/Api'
import { useNavigate } from 'react-router-dom'

// {
//      "role": "staff"
//     "name": "John Doe",
//      "mobile": "03001234567",
//      "email": "
//      "department": "IT"
// }

const AddStaff = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const dataTosend = {
                role: 'staff',
                name: data.Name,
                mobile: data.Mobile,
                email: data.Email,
                department: data.Department,
            }

            // console.log(dataTosend);

            const reponse = await postRequestWithToken('itAdmin/addUser', dataTosend);  
            // console.log(reponse);

            if(reponse.status === 200){
                alert('Staff Added Successfully');
                reset();
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
    register('Department', { required: 'Department is required' });


    return (
        <div className='h-screen'>
            <Navbar />

            <div className='w-screen flex flex-col items-center justify-center my-5'>
                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                    id='loginForm' onSubmit={handleSubmit(onSubmit)}>

                    <h1 className='text-2xl font-bold'>Add Staff</h1>
                    <p className='text-gray-500'>Please fill the form to add staff.</p>

                    <InputField
                        placeholder='Name'
                        label='Name'
                        type='text'
                        register={register}
                        error={errors.Name?.message}
                    />

                    <InputField
                        placeholder='Mobile'
                        label='Mobile'
                        type='text'
                        register={register}
                        error={errors.Mobile?.message}
                    />

                    <InputField
                        placeholder='Email'
                        label='Email'
                        type='email'
                        register={register}
                        error={errors.Email?.message}
                    />

                    <label className='mt-4 block text-sm font-medium text-gray-700'>Select Department</label>
                    <select className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue3 focus:border-transparent' 
                        {...register('Department')}
                        >
                        <option value="" >Select Department</option>
                        {
                            departmentData.map((department, index) => {
                                return (
                                    <option key={index} value={department.value}>{department.name}</option>
                                )
                            })
                        }
                    </select>
                    {errors.Department && <p className='text-red-500 text-xs mt-1'>{errors.Department.message}</p>}
                    

                    <Button type='submit'> Add Staff </Button>
                </form>
            </div>
            <StickyFooterMobile />

        </div>
    )
}

export default AddStaff
