import React from 'react'
import { InputField } from '../../Components/InputField';
import { Button } from '../../Components/Button';
import { postRequest, postRequestWithToken } from '../../Services/Api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const DeleteBatch = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    register('Year', { 
        required: 'This field is required',
        pattern: {
            value: /^[0-9]{4}$/,
            message: 'Invalid Year'
        }
    })
    register('BreanchCode', { 
        required: 'This field is required',
        pattern: {
            value: /^[0-9]{2}$/,
            message: 'Invalid Branch Code'
        }
     })


    const onSubmit = async (data) => {
        // console.log(data)

        try {
            const msg = `Are you sure you want to delete this batch ${data.Year} -  ${data.BreanchCode}?`
            const confirmation = window.confirm(msg, { title: 'Confirm Batch' })
            if (!confirmation) {
                return
            }

            const dataToSend = {
                batch : data.Year + data.BreanchCode
            }

            // console.log(dataToSend)

            const res = await postRequestWithToken('itAdmin/deleteWholebatch', dataToSend)

            // console.log(res)

            if (res.status == 200) {
                alert('Batch deleted successfully.')
                reset()
                navigate('/dashboard')
            }
            else if (res.status == 400) {
                alert('Batch not found')
            }
            else {
                alert('Failed to delete Batch. Please try again.')
            }
        } catch (error) {
            console.log(error)
            alert('Failed to delete Batch. Please try again.')
        }
    }

    return (
        <>
            <div className='mt-4'>
                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                    id='loginForm' onSubmit={handleSubmit(onSubmit)}>

                    <h1 className='text-2xl font-bold'>Delete Batch</h1>
                    <p className='text-gray-500'>Please fill the form to delete Batch.</p>

                    <div className='flex justify-center items-center space-x-2'>

                        <span>
                            <label className="mt-4 block text-sm font-medium text-gray-700"> Year / Batch</label>

                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm"
                                type='text'
                                placeholder='Ex : 2021'
                                {...register('Year')}
                            ></input>
                            <p className="text-red-500 text-xs italic">{errors.Year?.message}</p>
                        </span>

                        <span>
                            <label className="mt-4 block text-sm font-medium text-gray-700"> Branch Code</label>

                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm"
                                type='text'
                                placeholder='Ex : 01'
                                {...register('BreanchCode')}
                            ></input>
                            <p className="text-red-500 text-xs italic">{errors.BreanchCode?.message}</p>
                        </span>
                    </div>

                    <Button type='submit'> delete Batch </Button>
                </form>
            </div>
        </>
    )
}

export default DeleteBatch
