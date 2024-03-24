import { useRef, useState } from 'react'
const EditProfile = ({ id }) => {
  const [user, setUser] = useState({})
  const formRef = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    avatar: useRef(null)
  }
  useEffect(() => {
    const getUser = async () => {
      const response = await Client.get(`/users/${id}`)
      setUser(response.data)
      formRef.name.current.value = response.data.name
      formRef.email.current.value = response.data.email
      formRef.phone.current.value = response.data.phone
      formRef.avatar.current.value = response.data.avatar
    }
    getUser()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = {
      name: formRef.name.current.value,
      email: formRef.email.current.value,
      phone: formRef.phone.current.value,
      avatar: formRef.avatar.current.value
    }
    await Client.put(`/users/${id}`, user)
  }
  return (
    <div>
      <div>
        <h1 className="  text-center mb-7 mt-3  text-3xl text-gray-900 dark:text-white">
          {user.name}
        </h1>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              ref={formRef.name}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              ref={formRef.email}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              ref={formRef.phone}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="avatar"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Avatar
            </label>
            <input
              type="text"
              id="avatar"
              ref={formRef.avatar}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  )
}
export default EditProfile
