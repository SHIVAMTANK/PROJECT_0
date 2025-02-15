import React from 'react'
import { InputField } from '../../Components/InputField';
import { Button } from '../../Components/Button';
import { postRequest, postRequestWithToken } from '../../Services/Api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddBatch = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    register('File', { required: 'Please upload a file' })


    const onSubmit = async (data) => {
        console.log(data)

        try {
            const msg = `Are you sure you want to add this batch?`
            const confirmation = window.confirm(msg, { title: 'Confirm Batch' })
            if (!confirmation) {
                return
            }

            const dataToSend = {
                student: data.File[0]
            }

            // console.log(dataToSend)

            const res = await postRequestWithToken('itAdmin/addBulkStudents', dataToSend, {
                'Content-Type': 'multipart/form-data'
            }, {})

            // console.log(res)

            if (res.status == 201) {
                alert('Batch added successfully.')
                reset()
                navigate('/dashboard')
            }
            else if (res.status == 402) {
                alert('There is some problem in data. Please check and try again.')
            }
            else if (res.status == 400) {
                alert('The Given excel file is in invalid format.');   
                
            }
            else if (res.status == 405) {
                alert('Excel file is empty.')
            }
            else {
                alert('Failed to add Batch. Please try again.')
            }
        } catch (error) {
            console.log(error)
            alert('Failed to add Batch. Please try again.')
        }
    }

    return (
        <>
            <div className='mt-4'>
                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                    id='loginForm' onSubmit={handleSubmit(onSubmit)}>

                    <h1 className='text-2xl font-bold'>Add Batch</h1>
                    <p className='text-gray-500'>Please fill the form to add Batch.</p>
                    <p className='text-gray-500'>Please upload a file in .xlsx, .xls or .csv format.
                        The file should contain the following columns:
                    </p>
                    <p className='text-gray-900'>

                        name, student_id, mobile, room, vehicle, email
                    </p>

                    <InputField
                        label='File'
                        type='file'
                        register={register}
                        error={errors.File?.message}
                        accept='.xlsx,.xls,.csv'
                        required
                    />

                    <Button type='submit'> Add Batch </Button>
                </form>
            </div>
        </>
    )
}

export default AddBatch
