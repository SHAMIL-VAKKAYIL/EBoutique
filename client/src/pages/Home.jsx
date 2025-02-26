import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import FeaturedProduct from '../components/FeaturedProduct'
import RecentProduct from '../components/RecentProduct'
import Footer from '../components/Footer'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllProducts } from '../redux/productSlice'

function Home() {


    return (
        <>
            <HeroSection />
            {/* <Category /> */}
            <FeaturedProduct />
            <div className="container-fluid pt-5 pb-3">
                <div className="row px-xl-5">
                    <div className="col-md-6">
                        <div className="product-offer mb-30" style={{ height: "300px" }}>
                            <img className="img-fluid" src="img/offer-1.jpg" alt="" />
                            <div className="offer-text">
                                <h6 className="text-white text-uppercase">Save 20%</h6>
                                <h3 className="text-white mb-3">Special Offer</h3>
                                <a href="" className="btn btn-primary">Shop Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-offer mb-30" style={{ height: "300px" }}>
                            <img className="img-fluid" src="img/offer-2.jpg" alt="" />
                            <div className="offer-text">
                                <h6 className="text-white text-uppercase">Save 20%</h6>
                                <h3 className="text-white mb-3">Special Offer</h3>
                                <a href="" className="btn btn-primary">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RecentProduct />
            <Footer />
        </>
    )
}

export default Home