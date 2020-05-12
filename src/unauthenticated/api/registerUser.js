import axios from 'axios'

const registerUser = data => {
  const url = `${process.env.REACT_APP_API_DOMAIN}/users`
  const config = {
    method: 'POST',
    url,
    data,
    withCredentials: true
  }

  return axios(config)
}

export { registerUser }
