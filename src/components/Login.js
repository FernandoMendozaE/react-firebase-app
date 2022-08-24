import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { Alert } from './Alert'

export function Login() {
  const [user, setuser] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState()

  const { login, loginWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()

  // * Para el evento input
  const handleChange = ({ target: { name, value } }) => {
    setuser({ ...user, [name]: value })
  }

  // * Para el evento form
  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleGoogleSigin = async () => {
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleResetPassword = async () => {
    if (!user.email) return setError('Please enter your password')

    try {
      const result = await resetPassword(user.email)
      console.log(result)
      setError('we sent you email with a link to reset your password')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="youremail@company.com"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-400"
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>

          <a
            href="#!"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={handleResetPassword}
          >
            Forgot Password
          </a>
        </div>
      </form>

      <p className="my-4 text-sm flex justify-between px-3">
        Don't have an Account? <Link to="/register">Register</Link>
      </p>

      <button
        onClick={handleGoogleSigin}
        className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
      >
        Google Login
      </button>
    </div>
  )
}
