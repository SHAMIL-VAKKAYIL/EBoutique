import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { userSignup } from '../redux/userSlice'

function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userSignup({ username: name, password: password, email: email }))

    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Enter your name" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter your email" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter your password" />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Sign Up</button>
                                <p className="text-center mt-3">
                                    Already have an account? <Link to="/singin" className="text-decoration-none">Sign In</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup