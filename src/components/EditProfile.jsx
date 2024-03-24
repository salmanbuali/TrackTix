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
  return <></>
}
export default EditProfile
