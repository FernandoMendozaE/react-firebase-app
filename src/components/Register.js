import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { Alert } from './Alert'

export function Register() {
  const [user, setuser] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState()

  const { signup } = useAuth()
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
      await signup(user.email, user.password)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold my-2"
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
            className="block text-gray-700 text-sm font-bold my-2"
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

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>
      </form>

      <p className="my-4 text-sm flex justify-between px-3">
        Alredy have an Account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}
