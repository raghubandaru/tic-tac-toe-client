import axios from 'axios'

const verifyToken = (resetToken, userId) => {
  const url = `${process.env.REACT_APP_API_DOMAIN}/users/reset_password/${userId}/${resetToken}`
  const config = {
    url
  }

  return axios(config)
}

export { verifyToken }
