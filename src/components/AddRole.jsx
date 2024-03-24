import { useRef } from 'react'

const AddRole = ({ teamId, member }) => {
  const name = useRef('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const role = {
      name: name.current.value,
      team: teamId
    }
    await Client.put(`/roles/user/${member._id}/assign`, role)
    e.target.reset()
  }
  return (
    <div>
      <h1 className="  text-center mb-7 mt-3  text-3xl text-gray-900 dark:text-white">
        Add Role
      </h1>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role:
          </label>
          <input
            type="text"
            id="name"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            ref={name}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default AddRole
