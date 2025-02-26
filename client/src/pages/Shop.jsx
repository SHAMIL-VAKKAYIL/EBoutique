import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllProducts,
    priceRage,
    productsearching,
    sizeFilter
} from '../redux/productSlice';
import { useLocation } from 'react-router';

function Shop() {
    const dispatch = useDispatch();
    const { products, filterdProduct } = useSelector((state) => ({
        products: state.product.products,
        filterdProduct: state.product.filterdProduct
    }));

    const { state: searchTerm } = useLocation()

    // State for filters
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    // const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    console.log(searchTerm);

    useEffect(() => {

        dispatch(getAllProducts());

    }, [dispatch], searchTerm);

    // console.log(size, 'dfkj');

    console.log(filterdProduct);


    useEffect(() => {
        dispatch(priceRage({ min, max }));
        // dispatch(colorFilter({ filter: color }));
        dispatch(sizeFilter({ filter: size }));
        dispatch(productsearching(searchTerm))
    }, [max, size, searchTerm, dispatch]);

    return (
        <>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <a className="breadcrumb-item text-dark" href="#">Home</a>
                            <span className="breadcrumb-item active">Products</span>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row px-xl-5">

                    <div className="col-lg-3 col-md-4">

                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Filter by price</span>
                        </h5>
                        <div className="bg-light p-4 mb-30">
                            <form>
                                {[{ label: 'All', min: '', max: '' }, { label: '$0 - $100', min: 0, max: 100 },
                                { label: '$100 - $400', min: 100, max: 400 }, { label: '$400 - $800', min: 400, max: 800 },
                                { label: '$800 - $1200', min: 800, max: 1200 }, { label: '$1200 - $1500', min: 1200, max: 1500 }]
                                    .map((range, index) => (
                                        <div key={index} className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                            <input type="radio" name='price' className="custom-control-input"
                                                id={`price-${index}`} onChange={() => { setMin(range.min); setMax(range.max); }} />
                                            <label className="custom-control-label" htmlFor={`price-${index}`}>{range.label}</label>
                                        </div>
                                    ))}
                            </form>
                        </div>


                        {/* <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Filter by color</span>
                        </h5>
                        <div className="bg-light p-4 mb-30">
                            <form>
                                {['All', 'Black', 'White', 'Red', 'Blue', 'Green'].map((col, index) => (
                                    <div key={index} className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" name='color' className="custom-control-input"
                                            id={`color-${index}`} onChange={() => setColor(col === 'All' ? '' : col)} />
                                        <label className="custom-control-label" htmlFor={`color-${index}`}>{col}</label>
                                    </div>
                                ))}
                            </form>
                        </div> */}

                        {/* Size Filter */}
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Filter by size</span>
                        </h5>
                        <div className="bg-light p-4 mb-30">
                            <form>
                                {['All', 'S', 'M', 'L', 'XL'].map((sz, index) => (
                                    <div key={index} className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" name='size' className="custom-control-input"
                                            id={`size-${index}`} onChange={() => setSize(sz === 'All' ? null : sz)} />
                                        <label className="custom-control-label" htmlFor={`size-${index}`}>{sz}</label>
                                    </div>
                                ))}
                            </form>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="col-lg-9 col-md-8">
                        <div className="row pb-3">
                            {(filterdProduct?.length > 0 ? filterdProduct : products)?.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    ProductId={product._id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;
