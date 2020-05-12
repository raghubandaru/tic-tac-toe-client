import axios from 'axios'

const forgotPassword = data => {
  const url = `${process.env.REACT_APP_API_DOMAIN}/users/reset_password/generate_token`

  const config = {
    method: 'POST',
    url,
    data
  }

  return axios(config)
}

export { forgotPassword }
