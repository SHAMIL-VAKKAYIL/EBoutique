import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/userSlice';
import { Link } from 'react-router';

function AdminUsermanagment() {

    const { allUsers } = useSelector((state) => ({
        allUsers: state.user.allUsers
    }))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    console.log(allUsers);


    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = allUsers?.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <div className="d-block d-md-none col-12 " >
                <div className="row ">
                    <div className="col-12">
                        <nav className="breadcrumb mb-30" style={{ backgroundColor: '#2b313b' ,borderRadius:'20px', marginTop:'2px'}} >
                            <Link className="breadcrumb-item text-black" to={'/admin'}>Home</Link>
                            <span className="breadcrumb-item active">user Management</span>
                        </nav>
                    </div>
                </div>
            </div>
            <section className="container mt-4">
                <h2 className="display-4 mb-4">User Management</h2>
                <div className="mb-4">
                    <input
                        type="search"
                        placeholder="Search users..."
                        className="form-control w-100 w-md-50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers?.map(user => (
                                <tr key={user.id}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default AdminUsermanagment