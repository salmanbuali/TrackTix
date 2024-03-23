import Client from './api'

export const RegisterUser = async (data) => {
  try {
    const response = await Client.post('/auth/signup', data)

    return response.data
  } catch (error) {
    throw error
  }
}
export const LogInUser = async (data) => {
  try {
    const response = await Client.post('/auth/signin', data)

    localStorage.setItem('token', response.data.token)
    return response.data.user
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const response = await Client.get('/auth/session')
    return response.data
  } catch (error) {
    throw error
  }
}
