import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, setOrderStatus } from '../../redux/productSlice';
import { Link } from 'react-router';

function OrderManagement() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();

  // Get orders from Redux
  const orders = useSelector((state) => state.product.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // Update order status
  const statusUpdate = (orderId, newStatus) => {
    if (!newStatus) return; // Ensure user selected a status
    dispatch(setOrderStatus({ orderId, status: newStatus }));
  };

  // Choose a badge color based on status
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-warning';
      case 'processing':
        return 'bg-info';
      case 'shipped':
        return 'bg-primary';
      case 'delivered':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  // Format price to INR (assuming your totalAmount is in rupees)
  const formatPrice = (amount) => {
    // If `amount` is stored as rupees in your DB, no need to multiply by 100.
    // If `amount` is stored in paise, you might need to adjust.
    return Number(amount).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
  };

  // Filter orders by status
  const filteredOrders = orders?.filter((order) =>
    filterStatus === 'all'
      ? true
      : order.status?.toLowerCase() === filterStatus.toLowerCase()
  );

  return (
    <>
      <div className="d-block d-md-none col-12 " >
        <div className="row ">
          <div className="col-12">
            <nav className="breadcrumb mb-30" style={{ backgroundColor: '#2b313b', borderRadius: '20px', marginTop: '2px' }} >
              <Link className="breadcrumb-item text-black" to={'/admin'}>Home</Link>
              <span className="breadcrumb-item active">Order Management</span>
            </nav>
          </div>
        </div>
      </div>
      <div className="container-fluid py-4">
        <div className="row mb-4">
          <div className="col">
            <h1 className="h3 mb-2 text-gray-800">Order Management</h1>
            <p className="mb-4">Manage and track all customer orders</p>
          </div>
        </div>


        {/* Status Filter Buttons */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                onClick={() => setFilterStatus('all')}
              >
                All Orders
              </button>
              {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(
                (sts) => (
                  <button
                    key={sts}
                    type="button"
                    className={`btn ${filterStatus === sts.toLowerCase()
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                      }`}
                    onClick={() => setFilterStatus(sts.toLowerCase())}
                  >
                    {sts}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Product Details</th>
                    <th>Payment Info</th>
                    <th>Product Specs</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders?.map((order) => {
                    // If an order has multiple items, we want to show
                    // the order-level columns only once, using rowSpan.
                    const itemCount = order.orderItems?.length || 0;

                    return order.orderItems.map((item, index) => (
                      <tr key={`${order._id}-${item.productId?._id}-${index}`}>
                        {/* Order ID + Razorpay ID => Show only on first row of the order */}
                        {index === 0 && (
                          <td rowSpan={itemCount}>
                            <div className="fw-bold">{order.razorpayid}</div>
                            <small className="text-muted">ID: {order._id}</small>
                          </td>
                        )}

                        {/* Product Details */}
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={`/img/${item.productId?.image}`}
                              alt={item.productId?.name}
                              className="me-2"
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                              }}
                            />
                            <div className='ml-2'>
                              <div className="fw-bold ">
                                {item.productId?.name}
                              </div>
                              {/* You could display a short description or quantity */}
                              <small className="text-muted">
                                Qty: {item.quantity}
                              </small>
                            </div>
                          </div>
                        </td>

                        {/* Payment Info => Show only on first row of the order */}
                        {index === 0 && (
                          <td rowSpan={itemCount}>
                            <div>{formatPrice(order.totalAmount)}</div>
                            <small className="text-muted">{order.currency}</small>
                          </td>
                        )}

                        {/* Product Specs */}
                        <td>
                          <div className="d-flex flex-column gap-1">
                            <span className="badge">
                              Color: {item.productId?.color}
                            </span>
                            <span className="badge">
                              Size: {item.productId?.size}
                            </span>
                            <span className="badge">
                              Pattern: {item.productId?.pattern}
                            </span>
                            <span className="badge">
                              Material: {item.productId?.material}
                            </span>
                          </div>
                        </td>

                        {/* Status => Show only on first row of the order */}
                        {index === 0 && (
                          <td rowSpan={itemCount}>
                            <span
                              style={{ borderRadius: '3px' }}
                              className={`badge ${getStatusBadgeClass(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                        )}

                        {/* Actions => Show only on first row of the order */}
                        {index === 0 && (
                          <td rowSpan={itemCount}>
                            <div className="d-flex align-items-center">
                              <select
                                name="status"
                                className="form-select"
                                style={{ width: '150px', borderRadius: '3px' }}
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                              <button
                                className="btn btn-sm btn-warning ms-2"
                                style={{ borderRadius: '3px' }}
                                onClick={() => statusUpdate(order._id, status)}
                              >
                                Set
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default OrderManagement;
