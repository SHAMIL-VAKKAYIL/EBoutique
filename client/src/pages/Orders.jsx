import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, getUserCustomOrder } from '../redux/productSlice';

function Orders() {
    const { orders, customOrder } = useSelector((state) => ({
        orders: state.product.orders,
        customOrder: state.product.customOrder,
    }));

    const [activeSection, setActiveSection] = useState('order');

    console.log(orders);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getUserCustomOrder());
    }, [dispatch]);

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">
                <h2 className="text-center mb-5">Order History</h2>

                <div className="mb-4">
                    <button
                        className={`btn ${activeSection === 'custom' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                        onClick={() => setActiveSection('custom')}
                    >
                        Custom Order
                    </button>
                    <button
                        className={`btn ${activeSection === 'order' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setActiveSection('order')}
                    >
                        Orders
                    </button>
                </div>

                <div className="row justify-content-center">
                    {/* Orders Section */}
                    {activeSection === 'order' &&
                        orders?.map((order) => (
                            <div key={order._id} className="col-lg-8 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-header bg-white">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <small className="text-muted">Order ID:</small>
                                                <p className="mb-0 fw-bold">{order.razorpayid}</p>
                                                <p className="mb-0 fw-bold">{order.createdAt}</p>
                                            </div>
                                            <span
                                                className={`badge rounded-pill ${order.status === 'Delivered'
                                                    ? 'bg-success'
                                                    : order.status === 'Shipped'
                                                        ? 'bg-info'
                                                        : order.status === 'Cancelled'
                                                            ? 'bg-danger'
                                                            : 'bg-warning'
                                                    } px-3 py-2`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    {order.orderItems.map((item) => (

                                        <div key={item._id} className="card-body">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={`img/${item?.productId?.image}`}
                                                        alt={item.productId?.name}
                                                        className="rounded"
                                                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className="flex-grow-1 ms-4 ml-2">
                                                    <h5 className="mb-3">{item.productId?.name}</h5>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="price">
                                                            <small className="text-muted">Price</small>
                                                            <h6 className="mb-0 fw-bold">₹{item.productId?.price}</h6>
                                                            <small className="text-muted">Total Price</small>
                                                            <h6 className="mb-0 fw-bold">₹{item.price}</h6>
                                                        </div>
                                                        <div className="price">
                                                            <small className="text-muted">Quantity</small>
                                                            <h6 className="mb-0 fw-bold">{item.quantity}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
                        ))}

                    {/* Custom Order Section */}
                    {activeSection === 'custom' && (
                        <>
                            {customOrder && customOrder.length > 0 ? (
                                customOrder.map((custom) => (
                                    <div key={custom._id} className="col-lg-8 mb-4">
                                        <div className="card shadow-sm">
                                            <div className="card-header bg-white">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <small className="text-muted">Order ID:</small>
                                                        <p className="mb-0 fw-bold">{custom._id}</p>
                                                    </div>
                                                    <span
                                                        className={`badge rounded-pill ${custom.status === 'Delivered'
                                                            ? 'bg-success'
                                                            : custom.status === 'Shipped'
                                                                ? 'bg-info'
                                                                : custom.status === 'Cancelled'
                                                                    ? 'bg-danger'
                                                                    : 'bg-warning'
                                                            } px-3 py-2`}
                                                    >
                                                        {custom.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={`img/${custom.image}`}
                                                            alt="Custom Order"
                                                            className="rounded"
                                                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1 ms-4 ml-2">
                                                        <h5 className="mb-3">{custom.category} Custom Order</h5>
                                                        <p>
                                                            <strong>Color:</strong> {custom.color}
                                                        </p>
                                                        <p>
                                                            <strong>Size:</strong> {custom.size}
                                                        </p>
                                                        {custom.pattern && (
                                                            <p>
                                                                <strong>Pattern:</strong> {custom.pattern}
                                                            </p>
                                                        )}
                                                        {custom.material && (
                                                            <p>
                                                                <strong>Material:</strong> {custom.material}
                                                            </p>
                                                        )}
                                                        {custom.priceRange && (
                                                            <p>
                                                                <strong>Price Range:</strong> {custom.priceRange}
                                                            </p>
                                                        )}
                                                        {custom.additionalDetails && (
                                                            <p>
                                                                <strong>Additional Details:</strong> {custom.additionalDetails}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-lg-8">
                                    <div className="card shadow-sm">
                                        <div className="card-header bg-white">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <small className="text-muted">Order ID:</small>
                                                    <p className="mb-0 fw-bold">Custom Order</p>
                                                </div>
                                                <span className="badge rounded-pill bg-primary px-3 py-2">Custom</span>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-0">No custom orders found.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Orders;
