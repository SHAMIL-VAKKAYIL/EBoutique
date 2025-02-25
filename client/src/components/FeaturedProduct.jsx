import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/productSlice'

function FeaturedProduct() {
    const { products } = useSelector((state) => ({
        products: state.product.products
    }))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    console.log(products);
    return (
        <div>
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                    <span className="bg-secondary pr-3">Featured Products</span>
                </h2>
                <div className="row px-xl-5">
                    {products && products.length > 0 ? (
                        products.slice(0, 8).map((product) => (
                            <ProductCard
                                
                                key={product._id}
                                ProductId={product._id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                            />
                        ))
                    ) : (
                        <div>No products found</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FeaturedProduct