import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/productSlice'

function RecentProduct() {

    const { products } = useSelector((state) => ({
        products: state.product.products
    }))
    const dispatch = useDispatch()

    useEffect
        (() => {
            dispatch(getAllProducts())
        }, [])
    console.log(products);

    return (
        <>
            <div class="container-fluid pt-5 pb-3">
                <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Recent Products</span></h2>
                <div class="row px-xl-5">

                    {products?.slice(0, 8).map((product) => (
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
        </ >
    )
}

export default RecentProduct