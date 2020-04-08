const isRequired = value => value && value.length > 0

const isLongerthan = (min, value) => value.length > min

const isValidEmail = value => {
  const re = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return re.test(value.toLowerCase())
}

const isPasswordSame = inputs => inputs.password === inputs.confirmPassword

const isError = errors => Object.keys(errors).some(error => errors[error])

const validateLogin = inputs => ({
  email: !isRequired(inputs.email)
    ? 'Email is required'
    : !isValidEmail(inputs.email)
    ? 'Email is invalid'
    : null,
  password: !isRequired(inputs.password) ? 'Password is required' : null
})

const validateRegister = inputs => ({
  name: !isRequired(inputs.name) ? 'Name is required' : null,
  email: !isRequired(inputs.email)
    ? 'Email is required'
    : !isValidEmail(inputs.email)
    ? 'Email is invalid'
    : null,
  password: !isRequired(inputs.password)
    ? 'Password is required'
    : !isLongerthan(3, inputs.password)
    ? 'Password should be longer than 3 characters'
    : null
})

const validateForgotPassword = email => ({
  email: !isRequired(email)
    ? 'Email is required'
    : !isValidEmail(email)
    ? 'Email is invalid'
    : null
})

const validateResetPassword = inputs => ({
  password: !isRequired(inputs.password)
    ? 'Password is required'
    : !isLongerthan(3, inputs.password)
    ? 'Password should be longer than 3 characters'
    : null,
  confirmPassword: !isRequired(inputs.confirmPassword)
    ? 'Confirm Password is required'
    : !isLongerthan(3, inputs.confirmPassword)
    ? 'Password should be longer than 3 characters'
    : !isPasswordSame(inputs)
    ? 'Both passwords do not match'
    : null
})

const validateGoal = name => ({
  name: !isRequired(name) ? 'Goal name is required' : null
})

const validateTask = description => ({
  description: !isRequired(description) ? 'Task description is required' : null
})

const validateJoinGame = joinGame => ({
  joinGame: !isRequired(joinGame) ? 'Code is required' : null
})

export {
  isError,
  isLongerthan,
  isRequired,
  isValidEmail,
  validateForgotPassword,
  validateGoal,
  validateJoinGame,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateTask
}
