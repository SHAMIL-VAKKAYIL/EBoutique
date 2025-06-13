import { useEffect, useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router'
import ProductDetials from './pages/ProductDetials'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import Checkout from './pages/Checkout'
import AdminHome from './pages/adminPages/AdminHome'
import AdminSideBar from './pages/adminPages/AdminSideBar'
import ProductManagment from './pages/adminPages/ProductManagment'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AdminLogin from './pages/adminPages/AdminLogin'
import { useDispatch, useSelector } from 'react-redux'
import { adminCheckAuth } from './redux/adminSlice'
import { userCheckAuth } from './redux/userSlice'
import Profile from './pages/Profile'
import AdminUsermanagment from './pages/adminPages/AdminUsermanagment'
import UpdateProduct from './pages/adminPages/UpdateProduct'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/PaymentFaild'
import Orders from './pages/Orders'
import VendorSidebar from './pages/vendorPages/VendorSidebar'
import VendorProductManagment from './pages/vendorPages/VendorProductManagment'
import OrderManagement from './pages/adminPages/OrderManagment'
import Feedback from './pages/adminPages/Feedback'
import Customization from './pages/Customization'
import Vendormanagment from './pages/adminPages/Vendormanagment'
import VendorLogin from './pages/vendorPages/VendorLogin'
import { vendorCheckAuth } from './redux/vendorSlice'
import CustomOrdermanage from './pages/adminPages/CustomOrdermanage'
import CustomOrder from './pages/vendorPages/CustomOrder'
import VendorHome from './pages/vendorPages/vendorHome'

function App() {
  const dispatch = useDispatch()

  const { admin, user, vendor } = useSelector((state) => ({
    admin: state.admin.admin,
    user: state.user.user,
    vendor: state.vendor.vendor

  }))
  // console.log(admin);
  // console.log(user);
  // console.log(vendor);


  useEffect(() => {
    dispatch(adminCheckAuth())
    dispatch(userCheckAuth())
    dispatch(vendorCheckAuth())
  }, [])
  return (
    <>
      <Router>
        <Routes>
          {/*Admin routes*/}

          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <>
              <div className='d-flex flex-column flex-md-row'>
                <div className='col-12 col-md-2' style={{ backgroundColor: '#2b313b' }}>
                  <AdminSideBar />
                </div>
                <div className='col-12 col-md-10'>
                  <Routes>
                    <Route path="/" element={admin?._id ? < AdminHome /> : <Navigate to={'/adminLogin'} />} />
                    <Route path="/productmanage" element={admin?._id ? <ProductManagment /> : <Navigate to={'/adminLogin'} />} />
                    <Route path="/usermanagment" element={admin?._id ? <AdminUsermanagment /> : <Navigate to={'/adminLogin'} />} />
                    <Route path="/ordermanagment" element={admin?._id ? <OrderManagement /> : <Navigate to={'/adminLogin'} />} />
                    <Route path="/feedback" element={admin?._id ? <Feedback /> : <Navigate to={'/adminLogin'} />} />
                    <Route path="/updateProduct/:id" element={admin?._id ? <UpdateProduct /> : <Navigate to={'/adminLogin'} />} />
                    <Route path="/vendor" element={admin?._id ? <Vendormanagment /> : <Navigate to={'/adminLogin'} />} />
                    <Route path="/custom" element={admin?._id ? <CustomOrdermanage /> : <Navigate to={'/adminLogin'} />} />
                  </Routes>
                </div>
              </div>
            </>
          } />

          {/* vendor Router */}
          {/* <Route path="/vendorLogin" element={<Vend />} /> */}
          <Route path="/vendorLogin" element={<VendorLogin />} />
          <Route path="/vendor/*" element={
            <>
              <div className='d-flex flex-column flex-md-row'>
                <div className='col-12 col-md-2' style={{ backgroundColor: '#2b313b' }}>
                  <VendorSidebar />
                </div>
                <div className='col-12 col-md-10'>
                  <Routes>
                    <Route path="/" element={vendor?._id ? < VendorHome /> : <Navigate to={'/vendorLogin'} />} />
                    <Route path="/productmanage" element={vendor?._id ? <VendorProductManagment /> : <Navigate to={'/vendorLogin'} />} />
                    <Route path="/updateProduct/:id" element={vendor?._id ? <UpdateProduct /> : <Navigate to={'/vendorLogin'} />} />
                    <Route path="/custom" element={vendor?._id ? <CustomOrder /> : <Navigate to={'/vendorLogin'} />} />
                  </Routes>
                </div>
              </div>
            </>
          } />

          {/* User Routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/*" element={
            <>
              <Navbar userId={user?._id} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ProductDetails/:id" element={<ProductDetials />} />
                <Route path="/cart" element={user?._id ? <Cart /> : <Navigate to={'/signin'} />} />
                <Route path="/products" element={user?._id ? <Shop /> : <Navigate to={'/signin'} />} />
                <Route path="/checkout" element={user?._id ? <Checkout /> : <Navigate to={'/signin'} />} />
                <Route path="/orders" element={user?._id ? <Orders /> : <Navigate to={'/signin'} />} />
                <Route path="/profile" element={user?._id ? <Profile user={user} /> : <Navigate to={'/signin'} />} />
                <Route path="/custom" element={user?._id ? <Customization /> : <Navigate to={'/signin'} />} />
                <Route path="/success" element={user?._id ? <PaymentSuccess /> : <Navigate to={'/signin'} />} />
                <Route path="/faild" element={user?._id ? <PaymentFailed /> : <Navigate to={'/signin'} />} />
              </Routes>
            </>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
