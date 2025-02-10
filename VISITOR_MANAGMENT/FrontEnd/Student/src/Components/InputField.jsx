// tailwind input field component
export const InputField = ({ label, register, type, error, ...props }) => (
  <>

    <label className="mt-4 block text-sm font-medium text-gray-700">{label}</label>
    <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm"
      type={type}
      {...register(label)}
      {...props}
    ></input>
    <p className="text-red-500 text-xs italic">{error}</p>
  </>
)