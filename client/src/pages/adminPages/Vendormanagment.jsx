import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVendors, vendorSignup } from "../../redux/vendorSlice";
import { Link } from "react-router";

function VendorManagement() {

  const { allVendors } = useSelector((state) => ({
    allVendors: state.vendor.allVendors,
  }));
  console.log(allVendors);


  const dispatch = useDispatch()

  const [vendor, setVendor] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getAllVendors())
  }, [])

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vendor.name || !vendor.email || !vendor.password) {
      alert("All fields are required!");
      return;
    }
    dispatch(vendorSignup({ vendor: vendor }))
    setVendor({ name: "", email: "", password: "" });
  };

  // const handleDelete = (index) => {
  //   const updatedVendors = vendors.filter((_, i) => i !== index);
  //   setVendors(updatedVendors);
  // };

  return (
    <>
      <div className="d-block d-md-none col-12 " >
        <div className="row ">
          <div className="col-12">
            <nav className="breadcrumb mb-30" style={{ backgroundColor: '#2b313b', borderRadius: '20px', marginTop: '2px' }} >
              <Link className="breadcrumb-item text-black" to={'/admin'}>Home</Link>
              <span className="breadcrumb-item active">Vendor Management</span>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <h2 className="mb-4 text-center text-primary">Vendor Management</h2>

        {/* Add Vendor Form */}
        <div className="card shadow-lg rounded p-4 mb-4">
          <h4 className="mb-3 text-center">Add New Vendor</h4>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={vendor.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter Vendor Name"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={vendor.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter Email"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={vendor.password}
                onChange={handleChange}
                required
                placeholder="Enter Password"
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success px-4">
                Add Vendor
              </button>
            </div>
          </form>
        </div>

        {/* Vendor List */}
        <div className="card shadow-lg rounded p-4">
          <h4 className="mb-3 text-center">Vendor List</h4>
          {allVendors?.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allVendors.map((vendor, index) => (
                    <tr key={vendor._id}>
                      <td>{index + 1}</td>
                      <td>{vendor.name}</td>
                      <td>{vendor.email}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted mt-3">No vendors added yet.</p>
          )}
        </div>
      </div>
    </>

  );
}

export default VendorManagement;
