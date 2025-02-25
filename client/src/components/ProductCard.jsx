import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, getSinlgeProduct } from '../redux/productSlice'
import { Link, useNavigate } from 'react-router';

function ProductCard({ name, image, price, ProductId }) {

    const dispatch = useDispatch()

    return (
        <>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1 ">
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" src={`/img/${image}`} alt="" style={{ height: '300px', objectFit: 'cover' }} />
                        <div className="product-action">
                            <a className="btn btn-outline-dark btn-square" onClick={()=>dispatch(addToCart(ProductId))}><i className="fa fa-shopping-cart"></i></a>
                            {/* <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
                            <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></a>
                            <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></a> */}
                        </div>
                    </div>
                    <Link to={`/ProductDetails/${ProductId}`} className="text-center py-4" >
                        <a className="h6 text-decoration-none text-truncate ml-2" href="">{name}</a>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>${price}</h5><h6 className="text-muted ml-2"><del>${price + 24}</del></h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small>(99)</small>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ProductCard