import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomiseProduct, setVendor } from "../../redux/productSlice";
import { getAllVendors } from "../../redux/vendorSlice";

const CustomOrderManage = () => {
    const dispatch = useDispatch();
    const { customProd, allVendors } = useSelector((state) => ({
        customProd: state.product?.customProd,
        allVendors: state.vendor?.allVendors,
    }));

    // Store selected vendor per order
    const [vendorSelections, setVendorSelections] = useState({});

    useEffect(() => {
        dispatch(getAllCustomiseProduct());
        dispatch(getAllVendors());
    }, [dispatch]);

    // Handle vendor selection change
    const handleVendorChange = (orderId, vendorId) => {
        setVendorSelections((prev) => ({
            ...prev,
            [orderId]: vendorId, // Store vendor for each order
        }));
    };

    // Handle Save Button Click
    const handleSave = (orderId) => {
        if (vendorSelections[orderId]) {
            dispatch(setVendor({ vendor: vendorSelections[orderId], orderId }));
        }
    };

    return (
        <div className="py-4">
            <h2 className="text-center mb-4">Custom Order Management</h2>
            <table className="table table-bordered text-center">
                <thead className="bg-dark text-light">
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Pattern</th>
                        <th>Material</th>
                        <th>Category</th>
                        <th>Price Range</th>
                        <th>Details</th>
                        <th>Assign Vendor</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customProd?.map((order, index) => (
                        <tr key={order._id}>
                            <td>{index + 1}</td>
                            <td>
                                <img
                                    src={`/img/${order.image}`}
                                    alt="Product"
                                    width="60"
                                    height="60"
                                    className="rounded border"
                                />
                            </td>
                            <td>{order.color}</td>
                            <td>{order.size}</td>
                            <td>{order.pattern}</td>
                            <td>{order.material}</td>
                            <td>{order.category}</td>
                            <td>₹{order.priceRange}</td>
                            <td>{order.additionalDetails}</td>
                            <td>
                                <select
                                    className="form-select"
                                    value={vendorSelections[order._id] || ""}
                                    onChange={(e) => handleVendorChange(order._id, e.target.value)}
                                >
                                    <option value="">Select Vendor</option>
                                    {allVendors?.map((vendor) => (
                                        <option key={vendor._id} value={vendor._id}>
                                            {vendor.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button
                                    className={`btn btn-${vendorSelections[order._id] ? "primary" : "secondary"}`}
                                    disabled={!vendorSelections[order._id]}
                                    onClick={() => handleSave(order._id)}
                                >
                                    Save
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomOrderManage;
