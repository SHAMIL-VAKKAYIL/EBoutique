import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { vendorSignout } from '../../redux/vendorSlice'

function VendorSidebar() {

    const dispatch = useDispatch()
    return (
        <div className="sidebar-container">
            <div className="col-md-3 col-lg-2 d-md-block sidebar collapse vh-100">
                <div className="position-sticky pt-4">
                    <div className="text-center mb-4">
                        <h5 className="text-white">Vendor Dashboard</h5>
                        {/* <hr className="bg-light" /> */}
                    </div>
                    <ul className="nav flex-column">

                        <li className="nav-item mb-2">
                            <Link to={'/vendor/productmanage'} className="nav-link text-white hover-effect">
                                <i className="bi bi-box fs-5 me-2"></i>
                                Product Management
                            </Link>
                        </li>
                        {/* <li className="nav-item mb-2">
                            <Link to={'/vendor/order'} className="nav-link text-white hover-effect" >
                                <i className="bi bi-cart fs-5 me-2"></i>
                                Order Management
                            </Link>
                        </li> */}
                        <li className="nav-item mb-2">
                            <Link to={'/vendor/custom'} className="nav-link text-white hover-effect" >
                                <i className="bi bi-cart fs-5 me-2"></i>
                                Custom  Order Management
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="position-absolute bottom-0 w-100 p-3">
                    <button className="btn btn-danger btn-lg shadow-sm   d-flex align-items-center justify-content-center"
                        onClick={() => dispatch(vendorSignout())}>
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


export default VendorSidebar