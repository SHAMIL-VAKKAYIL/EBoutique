import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { userSignin } from '../redux/userSlice'

function Signin() {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = (e) => {

    e.preventDefault()
    dispatch(userSignin({ email: email, password: password }))

  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-4">Sign In</h1>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input onChange={(e) => setemail(e.target.value)} type="email" className="form-control" id="email" required />
                  <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input onChange={(e) => setpassword(e.target.value)} type="password" className="form-control" id="password" required />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary w-100">Sign In</button>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/signup" className="text-decoration-none">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin