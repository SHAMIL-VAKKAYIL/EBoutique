import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProduct, getAllProducts } from '../../redux/productSlice'
import { Link } from 'react-router'

function VendorProductManagment() {
    const dispatch = useDispatch()


    const { products } = useSelector((state) => ({
        products: state.product.products
    }))

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const [name, setName] = useState()
    const [description, setdescription] = useState()
    const [color, setcolor] = useState()
    const [pattern, setPattern] = useState()
    const [Size, setSize] = useState()
    const [category, setCategory] = useState()
    const [material, setmaterial] = useState()
    const [price, setPrice] = useState()
    const [image, setImage] = useState()

    const validateForm = () => {
        if (!name.trim()) alert("product name is required ")
        if (!description.trim()) alert("product description is required ")
        if (!color.trim()) alert("product color is required ")
        if (!pattern.trim()) alert("product pattern is required ")
        if (!Size.trim()) alert("product size is required ")
        if (!category.trim()) alert("product category is required ")
        if (!material.trim()) alert("product material is required ")
        if (!price.trim()) alert("product price is required ")
        if (!image) alert("product image is required ")
    }


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


        const success = validateForm()
        if (!success) {
            dispatch(addProduct({ productData: formData }))
            console.log(formData);
            setName('')
            setdescription('')
            setcolor('')
            setPattern('')
            setPrice('')
            setImage(null)
            setmaterial('')
            setSize('')
            setCategory('')
        }

    }

    const [activeSection, setActiveSection] = useState('list')


    const delProduct = async (id) => {
        dispatch(deleteProduct(id))
    }


    return (
        <>
            <div className="d-block d-md-none col-12 " >
                <div className="row ">
                    <div className="col-12">
                        <nav className="breadcrumb mb-30" style={{ backgroundColor: '#2b313b', borderRadius: '20px', marginTop: '2px' }} >
                            <Link className="breadcrumb-item text-black" to={'/vendor'}>Home</Link>
                            <span className="breadcrumb-item active">Product Management</span>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <h2 className="mb-4">Product Management</h2>
                <div className="mb-4">
                    <button
                        className={`btn ${activeSection === 'add' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                        onClick={() => setActiveSection('add')}
                    >
                        Add Product
                    </button>
                    <button
                        className={`btn ${activeSection === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setActiveSection('list')}
                    >
                        Manage Products
                    </button>
                </div>

                {activeSection === 'add' && (
                    <div className="row">
                        <div className="container mt-4">
                            <form className="card p-4">
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea onChange={(e) => setdescription(e.target.value)} className="form-control" rows="3"></textarea>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label">Color</label>
                                        <input onChange={(e) => setcolor(e.target.value)} type="text" className="form-control" />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Size</label>
                                        <input onChange={(e) => setSize(e.target.value)} type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label">Pattern</label>
                                        <input onChange={(e) => setPattern(e.target.value)} type="text" className="form-control" />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Category</label>
                                        <input onChange={(e) => setCategory(e.target.value)} type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label">Material</label>
                                        <input onChange={(e) => setmaterial(e.target.value)} type="text" className="form-control" />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Price</label>
                                        <input onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input onChange={handleImageChange} type="file" className="form-control" accept="image/*" />
                                </div>
                                <button onClick={handleSubmit} type="submit" className="btn btn-primary w-100">
                                    Add Product
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {activeSection === 'list' && (
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Category</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.map((product) => (
                                            <tr key={product._id}>
                                                <td>
                                                    <img
                                                        src={`/img/${product.image}`}
                                                        alt={product.name}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                    />
                                                </td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.category}</td>
                                                <td>
                                                    {/* <button className="btn btn-sm btn-danger mr-3" onClick={() => delProduct(product._id)}>Delete</button> */}
                                                    <Link to={`/vendor/updateProduct/${product._id}`}><button className='btn btn-sm btn-dark'>manage</button></Link>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>

    )

}

export default VendorProductManagment