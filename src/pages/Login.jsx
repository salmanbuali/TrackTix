import { Link, useNavigate } from "react-router-dom"
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/20/solid"
import { LogInUser } from "../services/Auth"
import { useRef } from "react"
const Login = ({ setUser }) => {
  let navigate = useNavigate()
  let invalid = false
  const formRef = {
    email: useRef(null),
    password: useRef(null),
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await LogInUser({
      email: formRef.email.current.value,
      password: formRef.password.current.value,
    })
    setUser(payload)
    if (payload) {
      navigate(`/teams`)
    } else {
      invalid = true
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/4 flex justify-center flex-col gap-3">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Email
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className={`block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-white ${
                invalid
                  ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-red-500"
                  : ""
              }`}
              placeholder={` ${
                invalid ? "Not a valid email address" : "you@example.com"
              }`}
              ref={formRef.email}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Password
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              id="password"
              className="block text-sm w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-white"
              placeholder="Password"
              ref={formRef.password}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mt-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <Link to="/register" className="m-auto underline dark:text-white">
          Don't have an account ? Register
        </Link>
      </div>
    </div>
  )
}

export default Login
