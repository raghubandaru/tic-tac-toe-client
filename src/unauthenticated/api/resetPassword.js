import axios from 'axios'

const resetPassword = data => {
  const url = `${process.env.REACT_APP_API_DOMAIN}/users/reset_password/change_password`
  const config = {
    method: 'POST',
    url,
    data
  }

  return axios(config)
}

export { resetPassword }
