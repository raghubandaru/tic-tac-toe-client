import axios from 'axios'

const fetchAccessToken = () => {
  const config = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_DOMAIN}/users/refresh_token`,
    withCredentials: true
  }

  return axios(config)
}

export { fetchAccessToken }
