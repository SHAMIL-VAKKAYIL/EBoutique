import React, { useEffect, useState } from 'react'
import { getSinlgeProduct, updateProduct } from '../../redux/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

function UpdateProduct() {
    const { id } = useParams()
    const dispatch = useDispatch()


    const { singleProduct } = useSelector((state) => ({
        singleProduct: state.product.singleProduct
    }))



    const [name, setName] = useState()
    const [description, setdescription] = useState()
    const [color, setcolor] = useState()
    const [pattern, setPattern] = useState()
    const [Size, setSize] = useState()
    const [category, setCategory] = useState()
    const [material, setmaterial] = useState()
    const [price, setPrice] = useState()
    const [image, setImage] = useState()


    useEffect(() => {
        dispatch(getSinlgeProduct(id))
        console.log(singleProduct);

    }, [id])


    useEffect(() => {
        setCategory(singleProduct?.category)
        setImage(singleProduct?.image)
        setName(singleProduct?.name)
        setdescription(singleProduct?.description)
        setcolor(singleProduct?.color)
        setPattern(singleProduct?.pattern)
        setPrice(singleProduct?.price)
        setmaterial(singleProduct?.material)
        setSize(singleProduct?.size)

    }, [])

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        setImage(file)

        if (!file) return
        // const reader = new FileReader()
        // reader.onload = () => {
        //     setImage(reader.result)
        // }
        // reader.readAsDataURL(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('color', color)
        formData.append('pattern', pattern)
        formData.append('size', Size)
        formData.append('category', category)
        formData.append('material', material)
        formData.append('price', price)
        formData.append('image', image)

        dispatch(updateProduct({ productData: formData, productId: id }))
        console.log(formData);
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">Update Product</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <div className="text-center mb-3">
                                        <img
                                            src={`/img/${image}` }
                                            alt="Product"
                                            style={{
                                                maxWidth: '200px',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                    </div>
                                    <input
                                        type='file'
                                        placeholder="Image URL"
                                        onChange={handleImageChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e) => setdescription(e.target.value)}
                                        className="form-control"
                                        rows="3"
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            placeholder="Color"
                                            value={color}
                                            onChange={(e) => setcolor(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            placeholder="Size"
                                            value={Size}
                                            onChange={(e) => setSize(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            placeholder="Pattern"
                                            value={pattern}
                                            onChange={(e) => setPattern(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            placeholder="Category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            placeholder="Material"
                                            value={material}
                                            onChange={(e) => setmaterial(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Update Product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct