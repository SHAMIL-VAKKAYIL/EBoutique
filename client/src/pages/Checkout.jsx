import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { ordering } from '../redux/productSlice'

function Checkout() {
    const { state: singleProduct } = useLocation()
    const { state: cart } = useLocation()

    console.log(cart.quantity);
    const [total, setTotal] = useState()

    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({
        user: state.user?.user
    }))
    console.log(singleProduct);


    useEffect(() => {
        if (cart.length > 1) {
            const total = cart.reduce(
                (acc, item) => (acc + item.productId.price * item.quantity), 0);
            setTotal(total);
        }
    }, []);


    const handlePayment = async () => {
        try {
            {
                cart.length > 1 ? dispatch(ordering({
                    totalAmount: total,
                    product: cart.map((item) => (
                        {
                            productId: item.productId._id,
                            quantity: item.quantity,
                            price: item.productId.price * item.quantity
                        }
                    )),
                    user: user
                })) :
                    dispatch(ordering({
                        totalAmount: singleProduct.price,
                        product: {
                            productId: singleProduct._id,
                            quantity: 1,
                            price: singleProduct.price
                        },
                        user: user
                    }))
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>Name</label>
                                    <input className="form-control" value={user?.username} type="text" placeholder="John" />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label>E-mail</label>
                                    <input className="form-control" value={user?.email} type="text" placeholder="example@email.com" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Mobile No</label>
                                    <input className="form-control" value={user?.phone} type="text" placeholder="+123 456 789" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Address Line </label>
                                    <input className="form-control" value={user?.address} type="text" placeholder="123 Street" />
                                </div>
                            </div>
                        </div>
                        <div className="collapse mb-5" id="shipping-address">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Shipping Address</span></h5>
                            <div className="bg-light p-30">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label>Name</label>
                                        <input className="form-control" type="text" placeholder="John" />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label>E-mail</label>
                                        <input className="form-control" type="text" placeholder="example@email.com" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Mobile No</label>
                                        <input className="form-control" type="text" placeholder="+123 456 789" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Address Line </label>
                                        <input className="form-control" type="text" placeholder="123 Street" />
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
                        {singleProduct.price &&
                            <div className="bg-light p-30 mb-5">
                                <div className="border-bottom">
                                    <h6 className="mb-3">Product</h6>
                                    <div className="d-flex justify-content-between">
                                        <p>{singleProduct?.name}</p>
                                        <p>${singleProduct.price}</p>
                                    </div>
                                </div>
                                <div className="border-bottom pt-3 pb-2">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h6>Subtotal</h6>
                                        <h6>${singleProduct.price}</h6>
                                    </div>

                                </div>
                                <div className="pt-2">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Total</h5>
                                        <h5>${singleProduct.price}</h5>
                                    </div>
                                </div>
                            </div>

                        }

                        {cart.length > 1 &&
                            <div className="bg-light p-30 mb-5">
                                <div className="border-bottom">
                                    <h6 className="mb-3">Product</h6>
                                    {cart.map((item) => (
                                        <div className="d-flex justify-content-between">
                                            <p>{item?.productId.name}</p>
                                            <p>${item?.productId?.price * item?.quantity}</p>
                                        </div>
                                    ))
                                    }
                                </div>
                                <div className="pt-2">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Total</h5>
                                        <h5>${total}</h5>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="mb-5">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
                            <div className="bg-light p-30">
                                <button onClick={handlePayment} className="btn btn-block btn-primary font-weight-bold py-3">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default Checkout