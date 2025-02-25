import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decreasequantity, getCart, removeFromCart } from '../redux/productSlice';
import { useNavigate } from 'react-router';

function Cart() {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { cart } = useSelector((state) => ({
        cart: state.product.cart
    }))

    const [quantity, setQuantity] = useState(1)
    const [cartTotal, setCartTotal] = useState()

    console.log(cart?.products);
    useEffect(() => {
        dispatch(getCart())
    }, [])


    // useEffect(() => {
    //     if (cart && cart.products) {
    //         const total = cart.products.reduce(
    //             (acc, item) => (acc + item.productId.price * item.quantity), 0);
    //         setCartTotal(total);
    //     }
    // }, [cart]);

    useMemo(() => {
        if (cart && cart.products) {
            const total = cart.products.reduce(
                (acc, item) => (acc + item.productId.price * item.quantity), 0)
            setCartTotal(total)
        }
    }, [cart])

    const checkout = () => {
        navigate('/checkout', { state: cart.products })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <a className="breadcrumb-item text-dark" href="#">Home</a>
                            <a className="breadcrumb-item text-dark" href="#">Shop</a>
                            <span className="breadcrumb-item active">Shopping Cart</span>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-12 table-responsive mb-5">
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {cart?.products?.map((cart) => (
                                    <tr>
                                        <td className="align-middle"><img src={`img/${cart.productId.image}`} alt="" style={{ width: "50px", objectFit: "contain" }} /> {cart.productId.name}</td>
                                        <td className="align-middle">${cart.productId.price}</td>
                                        <td class="align-middle">
                                            <div class="input-group quantity mx-auto" style={{ width: "100px" }}>
                                                <div class="input-group-btn">
                                                    <button class="btn btn-sm btn-primary btn-minus" onClick={() => dispatch(decreasequantity(cart.productId._id))} >
                                                        <i class="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value={cart.quantity || quantity} />
                                                <div class="input-group-btn">
                                                    <button class="btn btn-sm btn-primary btn-plus " onClick={() => dispatch(addToCart(cart.productId._id))} >
                                                        <i class="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">${cart.quantity * cart.productId.price}</td>
                                        <td className="align-middle"><button className="btn btn-sm btn-danger" onClick={() => dispatch(removeFromCart(cart.productId._id))}><i className="fa fa-times"></i></button></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>${cartTotal}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">$0</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>${cartTotal}</h5>
                                </div>
                                <button className="btn btn-block btn-primary font-weight-bold my-3 py-3" onClick={checkout}>Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default Cart