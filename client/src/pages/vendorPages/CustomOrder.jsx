import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomizedProductsForVendor, setcustomOrderStatus, } from "../../redux/productSlice";

function CustomOrder() {
  const dispatch = useDispatch();
  const { customProd } = useSelector((state) => ({
    customProd: state.product.customProd,
  }));

  useEffect(() => {
    dispatch(getCustomizedProductsForVendor());
  }, [dispatch]);

  // State to handle selected status for each order
  const [statusUpdates, setStatusUpdates] = useState({});

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleUpdateStatus = (orderId) => {
    if (statusUpdates[orderId]) {
      dispatch(setcustomOrderStatus({ orderId, status: statusUpdates[orderId] }));
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <h2 className="text-center mb-5">Custom Order History</h2>
        <div className="row justify-content-center">
          {customProd?.map((order) => (
            <div key={order._id} className="col-lg-6 col-md-8 col-sm-12 mb-4">
              <div className="card shadow-sm border-0">
                {/* Card Header */}
                <div className="card-header bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-muted">Order ID:</small>
                      <p className="mb-0 fw-bold">{order._id}</p>
                    </div>
                    <span
                      className={`badge rounded-pill ${order.status === "Delivered"
                          ? "bg-success"
                          : order.status === "Shipped"
                            ? "bg-info"
                            : order.status === "Cancelled"
                              ? "bg-danger"
                              : "bg-warning"
                        } px-3 py-2`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="d-flex">
                    {/* Order Image */}
                    <div className="flex-shrink-0 mr-3">
                      <img
                        src={`/img/${order.image}`}
                        alt="Custom Product"
                        className="rounded"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    {/* Order Details */}
                    <div className="flex-grow-1 ms-4">
                      <h5 className="mb-2 text-primary">{order.category}</h5>
                      <p className="mb-1">
                        <strong>Color:</strong> {order.color}
                      </p>
                      <p className="mb-1">
                        <strong>Size:</strong> {order.size}
                      </p>
                      <p className="mb-1">
                        <strong>Material:</strong> {order.material}
                      </p>
                      <p className="mb-1">
                        <strong>Pattern:</strong> {order.pattern}
                      </p>
                      <p className="mb-1">
                        <strong>Price Range:</strong> ₹{order.priceRange}
                      </p>
                      <p className="text-muted">
                        <strong>Details:</strong> {order.additionalDetails}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer with Order Status Update */}
                <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                  {/* <p className="mb-0">
                    <strong>Vendor ID:</strong> {order.vendor ? order.vendor : "Not Assigned"}
                  </p> */}

                  {/* Status Update Dropdown */}
                  <div className="d-flex align-items-center">
                    <select
                      className="form-select me-2"
                      value={statusUpdates[order._id] || order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      className="btn btn-primary btn-sm ml-2"
                      onClick={() => handleUpdateStatus(order._id)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomOrder;
