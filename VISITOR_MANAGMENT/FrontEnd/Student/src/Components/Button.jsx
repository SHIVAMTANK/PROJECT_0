// button like this but reusable

export const Button = ({ children, ...props }) => (
    <button className='w-full bg-blue3 hover:bg-blue4 text-black font-bold py-2 px-4 rounded mt-6' {...props} >
        {children}
    </button>
)