let inMemoryToken

const getAccessToken = () => inMemoryToken

const setAccessToken = accessToken => {
  inMemoryToken = accessToken
}

export { getAccessToken, setAccessToken }
