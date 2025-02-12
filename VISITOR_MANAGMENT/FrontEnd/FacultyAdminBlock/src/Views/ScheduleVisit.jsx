import React from 'react'
import { Navbar } from '../Components/Navbar'
import { StickyFooterMobile } from '../Components/StickyFooterMobile'
import { useForm } from 'react-hook-form'
import { InputField } from '../Components/InputField'
import { Button } from '../Components/Button'
import { postRequestWithToken } from '../Services/Api'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// {
//      "role": "User"
//     "name": "John Doe",
//      "mobile": "03001234567",
//      "email": "
//      "Role": "IT"
// }

const ScheduleVisit = () => {

    const navigate = useNavigate();

    const [showMobile, setShowMobile] = useState(true);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const dataTosend = {
                name: data.Name,
                mobile: data.Mobile,
                email: data.Email,
                purpose: data.Purpose,
                arrival_date: data.ArrivalDate
            }

            // console.log(dataTosend);

            const reponse = await postRequestWithToken('faculty_adminBlock/addVisitor', dataTosend);
            // console.log(reponse);

            if (reponse.status === 200) {
                alert('Visit Added Successfully');
                reset();
                // navigate('/dashboard')
            }
            else if (reponse.status === 401) {
                alert('Session Expired');
                navigate('/login');
            }
            else {
                alert('Error Occured');
            }

        } catch (error) {
            console.log(error);
            alert('Error Occured');
        }
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;

    // register('Role', { required: 'Role is required' });
    register('Name', { required: 'Name is required' });
    register('Mobile', { required: 'Mobile is required' });
    register('Email', { required: 'Email is required' });
    register('Purpose', { required: 'Purpose is required' });
    register('ArrivalDate', { required: 'Arrival Date is required' });


    return (
        <div className='h-screen'>
            <Navbar />

            <div className='w-screen flex flex-col items-center justify-center my-5'>
                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                    id='loginForm' onSubmit={handleSubmit(onSubmit)}>

                    <h1 className='text-2xl font-bold'>Add Visit</h1>
                    <p className='text-gray-500'>Please fill the form to add user.</p>

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

                    <InputField
                        placeholder='Purpose'
                        label='Purpose'
                        type='text'
                        register={register}
                        error={errors.Purpose?.message}
                    />

                    <InputField
                        placeholder='Arrival Date'
                        label='ArrivalDate'
                        type='date'
                        min={todayString}
                        register={register}
                        error={errors.ArrivalDate?.message}
                    />

                    <Button type='submit'> Add Visit </Button>
                </form>
            </div>
            <StickyFooterMobile />

        </div>
    )
}

export default ScheduleVisit
