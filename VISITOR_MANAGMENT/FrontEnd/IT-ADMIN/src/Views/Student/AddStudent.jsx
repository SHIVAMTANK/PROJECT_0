import React from 'react'
import { InputField } from '../../Components/InputField';
import { Button } from '../../Components/Button';
import { postRequest, postRequestWithToken } from '../../Services/Api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// {
//         name,
//         email,
//         mobile,
//         student_id,
//         room,
// }

const AddStudent = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    register('Name', { required: 'Name is required' })
    register('StudentID', { required: 'Student ID is required' })
    register('Email', { required: 'Email is required' })
    register('Mobile', { required: 'Mobile is required' })
    register('Room', { required: 'Room is required' })

    const onSubmit = async (data) => {
        console.log(data)

        try {
            const msg = `Are you sure you want to add ${data.Name} - ${data.StudentID} as a student?`
            const confirmation = window.confirm(msg, { title: 'Confirm Student' })
            if (!confirmation) {
                return
            }

            const dataToSend = {
                name: data.Name,
                email: data.Email,
                mobile: data.Mobile,
                student_id: data.StudentID,
                room: data.Room,
            }

            const res = await postRequestWithToken('itAdmin/addStudent', dataToSend)
            console.log(res)

            if (res.status == 200) {
                alert('Student added successfully.')
                reset()
                // navigate('/dashboard')
            }
            else if(reponse.status === 409){
                alert(`Duplicate key error: ${reponse.data.duplicateKey} already exists`);
            }
            else {
                alert('Failed to add student. Please try again.')
            }
        } catch (error) {
            console.log(error)
            alert('Failed to add student. Please try again.')
        }
    }

    return (
        <>
            <div className='mt-4'>
                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                    id='loginForm' onSubmit={handleSubmit(onSubmit)}>

                    <h1 className='text-2xl font-bold'>Add Student</h1>
                    <p className='text-gray-500'>Please fill the form to add Vehicle.</p>

                    <InputField
                        placeholder='Name'
                        label='Name'
                        type='text'
                        register={register}
                        error={errors.Name?.message}
                    />

                    <InputField
                        placeholder='Student ID'
                        label='StudentID'
                        type='text'
                        register={register}
                        error={errors.StudentID?.message}
                    />

                    <InputField
                        placeholder='Email'
                        label='Email'
                        type='email'
                        register={register}
                        error={errors.Email?.message}
                    />

                    <InputField
                        placeholder='Mobile'
                        label='Mobile'
                        type='text'
                        register={register}
                        error={errors.Mobile?.message}
                    />

                    <InputField
                        placeholder='L122'
                        label='Room'
                        type='text'
                        register={register}
                        error={errors.Room?.message}
                    />

                    <Button type='submit'> Add Student </Button>
                </form>
            </div>
        </>
    )
}

export default AddStudent
