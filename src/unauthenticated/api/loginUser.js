import axios from 'axios'

const loginUser = data => {
  const url = `${process.env.REACT_APP_API_DOMAIN}/users/login`
  const config = {
    method: 'POST',
    url,
    data,
    withCredentials: true
  }

  return axios(config)
}

export { loginUser }
