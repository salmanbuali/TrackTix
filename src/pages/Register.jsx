import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const Register = () => {
  
  return (
    <div>
      
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="mt-2">
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-900"
            placeholder="you@example.com"
          />
        </div>
      </div>
    </div>
  )
}

export default Register