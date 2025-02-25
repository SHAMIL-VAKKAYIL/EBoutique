import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateProfile, userSignout } from '../redux/userSlice';

function Profile({ user }) {



    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAdress] = useState('')
    const [phone, setPhone] = useState('')
    const [edit, setEdit] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        setUsername(user.username)
        setEmail(user.email)
        setPhone(user.phone)
        setAdress(user.address)
    }, [])
    const changed = (e) => {
        e.preventDefault()
        if (username.trim() && email.trim()) {
            dispatch(updateProfile({ username, email, phone, address }))
            setEdit(!edit)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center">Profile Settings</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={changed}>
                                <div className="mb-3">
                                    <label className="form-label">Username:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        disabled={edit}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        disabled={edit}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        disabled={edit}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Adress:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        disabled={edit}
                                        value={address}
                                        onChange={(e) => setAdress(e.target.value)}
                                    />
                                </div>
                                <div className=" ">
                                    {!edit ? <button onClick={changed} type="button" className="btn btn-primary">
                                        Save Changes
                                    </button> : <button onClick={() => setEdit(!edit)} type="button" className="btn btn-primary">
                                        Edit
                                    </button>}
                                    <div className="text-center mt-3">
                                        <button
                                            onClick={() => {
                                                dispatch(userSignout());
                                                window.location.href = '/signin';
                                            }}
                                            className="btn btn-danger"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile