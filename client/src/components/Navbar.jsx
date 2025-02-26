import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function Navbar({ userId }) {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    const handleSearch = () => {
        navigate(`/products`, { state: searchTerm })
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                    <div className="col-lg-4">
                        <a href="" className="text-decoration-none">
                            <span className="h1 text-uppercase text-primary bg-dark px-2">E</span>
                            <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">BOUTIQUE</span>
                        </a>
                    </div>
                    <div className="col-lg-4 col-6 text-left">
                        <form action="">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for products" onChange={(e) => setSearchTerm(e.target.value)} />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-transparent text-primary">
                                        <i className="fa fa-search" onClick={handleSearch}></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 col-6 text-right">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">My Account</button>
                            <div className="dropdown-menu dropdown-menu-right">
                                {userId ? <Link to={'/profile'} className="dropdown-item" type="button">Profile</Link> :
                                    <>
                                        <Link to={'/signin'} className="dropdown-item" type="button">Sign in</Link>
                                        <Link to={'/signup'} className="dropdown-item" type="button">Sign up</Link>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark mb-30">
                <div className="row px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: " 65px", padding: "0 30px" }}>
                            {/* <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
                            <i className="fa fa-angle-down text-dark"></i> */}
                        </a>
                        <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: "calc(100% - 30px)", zIndex: 999 }}>
                            <div className="navbar-nav w-100">
                                {/* <div className="nav-item dropdown dropright">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Dresses <i className="fa fa-angle-right float-right mt-1"></i></a>
                                    <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                        <a href="" className="dropdown-item">Men's Dresses</a>
                                        <a href="" className="dropdown-item">Women's Dresses</a>
                                        <a href="" className="dropdown-item">Baby's Dresses</a>
                                    </div>
                                </div>
                                <a href="" className="nav-item nav-link">Shirts</a>
                                <a href="" className="nav-item nav-link">Jeans</a>
                                <a href="" className="nav-item nav-link">Swimwear</a>
                                <a href="" className="nav-item nav-link">Sleepwear</a>
                                <a href="" className="nav-item nav-link">Sportswear</a>
                                <a href="" className="nav-item nav-link">Jumpsuits</a>
                                <a href="" className="nav-item nav-link">Blazers</a>
                                <a href="" className="nav-item nav-link">Jackets</a>
                                <a href="" className="nav-item nav-link">Shoes</a> */}
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                            </a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to={'/'} className="nav-item nav-link ">Home</Link>
                                    <Link to={'/products'} className="nav-item nav-link">Products</Link>
                                    <Link to={'/orders'} className="nav-item nav-link">Orders</Link>
                                    <Link to={'/custom'} className="nav-item nav-link">Customize Your Product</Link>
                                </div>
                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                    <Link to={'/cart'} className="btn px-0 ml-3">
                                        <i className="fas fa-shopping-cart text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}></span>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar