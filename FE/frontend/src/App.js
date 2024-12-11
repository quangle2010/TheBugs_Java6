import './App.css';

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import About from './pages/AboutMe';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import User from './pages/UserManage';

import CategoryManagment from './pages/CategoryManage';
import OrderedManagment from './pages/OrderedManage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserOrder from './pages/UserOder';
import Profile from './pages/Profile';
import ProductsManage from './pages/ProductsManage';
import Cart from './pages/Cart';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Err from './pages/404';
import Resertpass from './pages/Resertpass';
import StatisticsPage from './pages/statistical';
import PaymentStatus from './pages/PaymentStatus';


// Layout with Header and Footer
function Layout() {
  const location = useLocation();
  const BASE_URL = 'http://localhost:8080/user/profile';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(false);
  const token = Cookies.get('JWT_TOKEN');
  const fetchUserProfile = async () => {
    try {
      if (token) {
        const response = await axios.get(BASE_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data.data;
        setIsLoggedIn(true);
        setUserRole(userData.roles);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [token]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/admin/list-product" element={isLoggedIn && userRole === true ? <ProductsManage /> : <Navigate to="/login" />} />
        <Route path="/admin/list-ordered" element={isLoggedIn && userRole === true ? <OrderedManagment /> : <Navigate to="/login" />} />
        <Route path="/admin/list-user" element={isLoggedIn && userRole === true ? <User /> : <Navigate to="/login" />} />
        <Route path="/admin/list-category" element={isLoggedIn && userRole === true ? <CategoryManagment /> : <Navigate to="/login" />} />
        <Route path="/admin/statistical" element={isLoggedIn && userRole === true ? <StatisticsPage /> : <Navigate to="/login" />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/payment-status" element={<PaymentStatus />} />
        <Route path="/author/profile" element={<Profile />} />
        <Route path="/user/list-ordered" element={<UserOrder />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products-detail" element={<ProductDetail />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/author/resetpass" element={<Resertpass />} />
        <Route path="*" element={<Err />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<Layout />} />
        <Route path="*" element={<Err />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;  