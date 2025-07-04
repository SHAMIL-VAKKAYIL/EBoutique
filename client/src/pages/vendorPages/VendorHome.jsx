import React from 'react'
import { Link } from 'react-router';

function VendorHome() {
    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-primary">Vendor Dashboard</h2>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row g-4">
                        {/* <div className="col-sm-6 col-xl-3">
                            <div className="card border-0 bg-primary bg-gradient text-white shadow hover-shadow">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <h4 className="mb-2">Users</h4>
                                            <p className="fs-6 mb-0">Manage System Users</p>
                                        </div>
                                        <i className="bi bi-people fs-1"></i>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="col-sm-6 col-xl-3 mt-5">
                            <Link to={'/vendor/productmanage'} className="text-decoration-none">
                                <div className="card border-0 bg-success bg-gradient text-white shadow hover-shadow">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1">
                                                <h4 className="mb-2">Products</h4>
                                                <p className="fs-6 mb-0">Manage Products</p>
                                            </div>
                                            <i className="bi bi-box fs-1"></i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* <div className="col-sm-6 col-xl-3 mt-5">
                            <Link to={'/vendor/order'} className="card border-0 bg-warning bg-gradient shadow hover-shadow">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <h4 className="mb-2 text-dark">Orders</h4>
                                            <p className="fs-6 mb-0 text-dark">Manage Orders</p>
                                        </div>
                                        <i className="bi bi-cart fs-1 text-dark"></i>
                                    </div>
                                </div>
                            </Link>
                        </div> */} 
                        <div className="col-sm-6 col-xl-3 mt-5">
                            <Link to={'/vendor/custom'} className="card border-0 bg-primary bg-gradient shadow hover-shadow">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <h4 className="mb-2 text-dark">Customized Orders</h4>
                                            <p className="fs-6 mb-0 text-dark">Customized Product</p>
                                        </div>
                                        <i className="bi bi-cart fs-1 text-dark"></i>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorHome;