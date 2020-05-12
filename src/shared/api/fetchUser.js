import axios from 'axios'

const fetchUser = accessToken => {
  const config = {
    url: `${process.env.REACT_APP_API_DOMAIN}/users/me`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  return axios(config)
}

export { fetchUser }
