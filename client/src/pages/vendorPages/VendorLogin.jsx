import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { vendorSignin } from '../../redux/vendorSlice'

function VendorLogin() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const dispatch = useDispatch()
  
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(vendorSignin({ email, password }))
        // console.log('User logged in:', email, password)

    }
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h1 className="text-center mb-4">Vendor Login</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            onChange={(e) => setemail(e.target.value)}
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            aria-describedby="emailHelp"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            onChange={(e) => setpassword(e.target.value)}
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default VendorLogin