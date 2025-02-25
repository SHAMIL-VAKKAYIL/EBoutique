import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router'
import { addToCart, getReview, getSinlgeProduct, reviewsend } from '../redux/productSlice';

function ProductDetials() {
    const { id: productId } = useParams()
    const navigate = useNavigate()
    const { singleProduct, review } = useSelector((state) => ({
        singleProduct: state.product.singleProduct,
        review: state.product.review

    }))

    console.log(review);

    const [prreview, setReview] = useState()
    const [rating, setRating] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSinlgeProduct(productId))
        dispatch(getReview(productId))
    }, [productId])

    const buyProduct = () => {
        navigate('/checkout', { state: singleProduct })
    }

    const submitReview = () => {
        dispatch(reviewsend({ productId, comment: prreview, rating }))
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <Link className="breadcrumb-item text-dark" to={'/'}>Home</Link>
                            <Link to={'/products'} className="breadcrumb-item text-dark" >product</Link>
                            <span className="breadcrumb-item active">product Detail</span>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid pb-5">
                <div className="row px-xl-5">
                    <div className="col-lg-5 mb-30">
                        <div id="product-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner bg-light">
                                <div className="carousel-item active">
                                    <img className="w-100 h-100" src={`/img/${singleProduct?.image}`} alt="Image" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 h-auto mb-30">
                        <div className="h-100 bg-light p-30">
                            <h3>{singleProduct?.name}</h3>
                            <div className="d-flex mb-3">
                                <div className="text-primary mr-2">
                                    <small className="fas fa-star"></small>
                                    <small className="fas fa-star"></small>
                                    <small className="fas fa-star"></small>
                                    <small className="fas fa-star-half-alt"></small>
                                    <small className="far fa-star"></small>
                                </div>
                                <small className="pt-1">(99 Reviews)</small>
                            </div>
                            <h3 className="font-weight-semi-bold mb-4">${singleProduct?.price}</h3>
                            <p className="mb-4">{singleProduct?.description}</p>
                            <div className="d-flex mb-3">
                                <strong className="text-dark mr-3">Sizes: <span>{singleProduct?.size}</span></strong>

                            </div>
                            <div className="d-flex mb-4">
                                <strong className="text-dark mr-3">Colors: <span>{singleProduct?.color}</span></strong>

                            </div>
                            <div className="d-flex align-items-center mb-4 pt-2">
                                <button className="btn btn-primary px-3 mr-3" onClick={buyProduct}><i className="mr-1"></i> Buy now</button>
                                <button onClick={() => dispatch(addToCart(singleProduct._id))} className="btn btn-primary px-3"><i className="fa fa-shopping-cart mr-1"></i> Add To
                                    Cart</button>
                            </div>
                            <div className="d-flex pt-2">
                                <strong className="text-dark mr-2">Share on:</strong>
                                <div className="d-inline-flex">
                                    <a className="text-dark px-2" href="">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a className="text-dark px-2" href="">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a className="text-dark px-2" href="">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                    <a className="text-dark px-2" href="">
                                        <i className="fab fa-pinterest"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row px-xl-5">
                    <div className="col">
                        <div className="bg-light p-30">
                            <div className="nav nav-tabs mb-4">
                                <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3">Reviews ({singleProduct?.review.length})</a>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade" id="tab-pane-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4 className="mb-4">1 review for "Product Name"</h4>
                                            {review?.map((review) => (
                                                <div className="media mb-4">
                                                    {/* <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{ width: "45px" }} /> */}
                                                    <div className="media-body">
                                                        <h6>{review?.userId.username}<small> - <i>01 Jan 2045</i></small></h6>
                                                        <div className="text-primary mb-2">
                                                            {review.rating} <i className="fas fa-star"></i>

                                                        </div>
                                                        <p>{review?.comment}.</p>
                                                    </div>
                                                </div>
                                            ))
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <h4 className="mb-4">Leave a review</h4>
                                            <small>Your email address will not be published. Required fields are marked *</small>
                                            <div className="d-flex my-3">
                                                <p className="mb-0 mr-2">Your Rating * :</p>
                                                <div className="text-primary">
                                                    <i className={rating >= 1 ? 'fas fa-star' : `far fa-star`} onClick={() => setRating(1)}></i>
                                                    <i className={rating >= 2 ? 'fas fa-star' : `far fa-star`} onClick={() => setRating(2)}></i>
                                                    <i className={rating >= 3 ? 'fas fa-star' : `far fa-star`} onClick={() => setRating(3)}></i>
                                                    <i className={rating >= 4 ? 'fas fa-star' : `far fa-star`} onClick={() => setRating(4)}></i>
                                                    <i className={rating >= 5 ? 'fas fa-star' : `far fa-star`} onClick={() => setRating(5)}></i>
                                                </div>
                                            </div>
                                            <form>
                                                <div className="form-group">
                                                    <label for="message">Your Review *</label>
                                                    <textarea id="message" cols="30" rows="5" className="form-control" onChange={(e) => setReview(e.target.value)}></textarea>
                                                </div>
                                                <div className="form-group mb-0">
                                                    <button type="button" onClick={submitReview} className="btn btn-primary px-3" >Leave Your Review </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetials