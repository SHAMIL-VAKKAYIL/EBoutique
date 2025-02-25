import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { adminSignout } from '../../redux/adminSlice'

function AdminSideBar() {

    const dispatch = useDispatch()
    return (
        <div className="sidebar-container">
            <div className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse vh-100">
                <div className="position-sticky pt-4">
                    <Link to={'/admin'} className="text-center mb-4">
                        <h5 className="text-white">Admin Dashboard</h5>
                        {/* <hr className="bg-light" /> */}
                    </Link>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link to={'/admin/usermanagment'} className="nav-link text-white hover-effect" >
                                <i className="bi bi-people fs-5 me-2"></i>
                                User Management
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to={'/admin/productmanage'} className="nav-link text-white hover-effect">
                                <i className="bi bi-box fs-5 me-2"></i>
                                Product Management
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to={'/admin/ordermanagment'} className="nav-link text-white hover-effect" >
                                <i className="bi bi-cart fs-5 me-2"></i>
                                Order Management
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to={'/admin/feedback'} className="nav-link text-white hover-effect" >
                                <i className="bi bi-chat fs-5 me-2"></i>
                                Feedback Management
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to={'/admin/vendor'} className="nav-link text-white hover-effect" >
                                <i className="bi bi-chat fs-5 me-2"></i>
                                vendor Management
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to={'/admin/custom'} className="nav-link text-white hover-effect" >
                                <i className="bi bi-chat fs-5 me-2"></i>
                                Custom Order
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="position-absolute bottom-0 w-100 p-3">
                    <button className="btn btn-danger btn-lg shadow-sm   d-flex align-items-center justify-content-center"
                        onClick={() => dispatch(adminSignout())}>
                        <i className="bi bi-box-arrow-right fs-5 me-2"></i>
                        Logout
                    </button>
                </div>
            </div>
            <style>
                {`
                    .hover-effect:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                        border-radius: 5px;
                    }
                   
                `}
            </style>
        </div>
    )
}


export default AdminSideBar