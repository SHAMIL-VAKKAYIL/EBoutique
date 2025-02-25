import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomiseProduct } from "../redux/productSlice";

function Customization({ userId }) {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [pattern, setPattern] = useState("");
  const [material, setMaterial] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "color":
        setColor(value);
        break;
      case "size":
        setSize(value);
        break;
      case "pattern":
        setPattern(value);
        break;
      case "material":
        setMaterial(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "priceRange":
        setPriceRange(value);
        break;
      case "additionalDetails":
        setAdditionalDetails(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("color", color);
    formData.append("size", size);
    formData.append("pattern", pattern);
    formData.append("material", material);
    formData.append("category", category);
    formData.append("priceRange", priceRange);
    formData.append("additionalDetails", additionalDetails);
    formData.append("image", image);
    dispatch(createCustomiseProduct( formData ))

    alert("Dress customization submitted!");
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-3 text-gray-800">Customize Your Dress</h1>
      <p className="mb-4">Select your preferred dress attributes and submit your request.</p>

      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Color</label>
                <input type="text" name="color" className="form-control" value={color} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Size</label>
                <input type="text" name="size" className="form-control" value={size} onChange={handleChange} required />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label className="form-label">Pattern</label>
                <input type="text" name="pattern" className="form-control" value={pattern} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Material</label>
                <input type="text" name="material" className="form-control" value={material} onChange={handleChange} />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select name="category" className="form-select" value={category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  <option value="Casual">Casual</option>
                  <option value="Formal">Formal</option>
                  <option value="Ethnic">Ethnic</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Price Range</label>
                <input type="text" name="priceRange" className="form-control" value={priceRange} onChange={handleChange} />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <label className="form-label">Additional Details</label>
                <textarea name="additionalDetails" className="form-control" rows="3" value={additionalDetails} onChange={handleChange}></textarea>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <label className="form-label">Upload Reference Image</label>
                <input type="file" className="form-control" onChange={handleFileChange} />
              </div>
            </div>

            <div className="mt-4 text-center">
              <button type="submit" className="btn btn-warning px-5">Submit Customization</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Customization;
