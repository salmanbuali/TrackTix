import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const Register = () => {
  let navigate = useNavigate()
  const [invalid, setInvalid] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const formRef = {
    name: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    phone: useRef(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let tempInvalid
    let tempPassInvalid
    if (
      !formRef.email.current.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setInvalid(true)
      tempInvalid = true
    } else {
      setInvalid(false)
      tempInvalid = false
    }

    if (
      formRef.password.current.value !==
        formRef.confirmPassword.current.value ||
      formRef.password.current.value.match(/^\s*$/)
    ) {
      formRef.password.current.value = ''
      formRef.confirmPassword.current.value = ''
      setInvalidPassword(true)
      tempPassInvalid = true
    } else {
      setInvalidPassword(false)
      tempPassInvalid = false
    }
    if (!tempInvalid && !tempPassInvalid) {
      await RegisterUser({
        name: formRef.name.current.value,
        email: formRef.email.current.value,
        password: formRef.password.current.value,
        phone: formRef.phone.current.value
      })
      navigate('/login')
    }
  }
  return (
    <div className="flex justify-center">
      <div className="w-1/4 flex justify-center flex-col gap-3">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Name
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-white"
              placeholder="First and Last name"
              ref={formRef.name}
            />
          </div>
        </div>
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
                  ? 'text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                  : ''
              }`}
              placeholder={` ${
                invalid ? 'Not a valid email address' : 'you@example.com'
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
              className={`block text-sm w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-white ${
                invalidPassword
                  ? 'text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                  : ''
              }`}
              placeholder="Password"
              ref={formRef.password}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="passwordCheck"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="passwordCheck"
              id="passwordCheck"
              className={`block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-white ${
                invalidPassword
                  ? 'text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                  : ''
              }`}
              placeholder={` ${
                invalidPassword ? 'Passwords Do Not Match' : 'Confirm Password'
              }`}
              ref={formRef.confirmPassword}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="phone"
              id="phone"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-950 dark:text-white"
              placeholder="Your number"
              ref={formRef.phone}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mt-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
        <Link to="/login" className="m-auto underline dark:text-white">
          Have an account ? Login
        </Link>
      </div>
    </div>
  )
}

export default Register
