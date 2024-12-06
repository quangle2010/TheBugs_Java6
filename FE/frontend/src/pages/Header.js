import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../utils/Toast";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  // Handle scroll event for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const BASE_URL = 'http://localhost:8080/user/profile';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(false);
  const [userName, setUserName] = useState([]);
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
        setUserName(userData.username);
      } else {
        setUserName(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoggedIn(false);
      setUserName(null);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [token]);




  const logout = async () => {
    try {
      const token = Cookies.get('JWT_TOKEN');
      if (!token) {
        showErrorToast("Token không hợp lệ hoặc không tồn tại.");
        return;
      }

      const response = await axios.get("http://localhost:8080/logout", {
        withCredentials: true,
      });

      if (response.data.status === true) {
        showSuccessToast(response.data.message || "Đăng xuất thành công!");
        Cookies.remove('JWT_TOKEN');
        setIsLoggedIn(false);
        navigate('/home');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        showErrorToast(response.data.message || "Không thể đăng xuất!");
      }
    } catch (error) {
      console.error('Logout Error:', error);
      if (error.response && error.response.status === 401) {
        showErrorToast("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        Cookies.remove('JWT_TOKEN');
        window.location.href = "/login";
      } else {
        showErrorToast("Đã xảy ra lỗi khi đăng xuất.");
      }
    }
  };



  return (
    <header className={`main_header_area ${isScrolled ? "navbar_fixed" : ""}`}>
      <div className="top_header_area row m0">
        <div className="container">
          <div className="float-left">
            <a href="tell:+18004567890">
              <i className="fa fa-phone" aria-hidden="true"></i> 0766 XXX 732
            </a>
            <a href="mailto:info@cakebakery.com">
              <i className="fa fa-envelope-o" aria-hidden="true"></i>
              theBugs@gmail.com
            </a>
          </div>
          <div className="float-right">
            <ul className="h_social list_style">
              <li><a href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
              <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main_menu_two">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/home">
              <img src="/assets/img/logo-2.png" alt="Logo" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="my_toggle_menu">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav justify-content-end">
                <li><NavLink to="/home">Trang chủ</NavLink></li>
                {
                  isLoggedIn && userRole === true && (
                    <li className="dropdown submenu">
                      <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                        Quản lý
                      </a>
                      <ul className="dropdown-menu">
                        <li><NavLink to="/admin/list-user">Người dùng  </NavLink></li>
                        <li><NavLink to="/admin/list-product">Sản phẩm</NavLink></li>
                        <li><NavLink to="/admin/list-category">Loại sản phẩm</NavLink></li>
                        {

                        }
                        <li><NavLink to="/admin/list-ordered">Đơn hàng</NavLink></li>
                        <li><NavLink to="/admin/statistical">Thống kê sản phẩm</NavLink></li>
                      </ul>
                    </li>
                  )
                }

                <li><NavLink to="/products">Sản phẩm</NavLink></li>
                <li><NavLink to="/menu">Thực Đơn</NavLink></li>
                <li><NavLink to="/about">Giới Thiệu</NavLink></li>
                <li><NavLink to="/contact">Liên Hệ</NavLink></li>
                <li className="dropdown submenu">
                  <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                    <i className="bi bi-person">{userName}</i>
                  </a>
                  <ul className="dropdown-menu">
                    {isLoggedIn ? (
                      <>
                        <li><NavLink to="/author/profile">Thông tin</NavLink></li>
                        <li><NavLink to="/author/resetpass">Đổi mật khẩu</NavLink></li>
                        {
                          isLoggedIn && userRole === false && (
                            <li><NavLink to="/user/list-ordered">Đơn hàng</NavLink></li>
                          )
                        }
                        <li><a href="#" onClick={logout}>Đăng xuất</a></li>
                      </>
                    ) : (
                      <>
                        <li><NavLink to="/login">Đăng nhập</NavLink></li>
                        <li><NavLink to="/register">Đăng ký</NavLink></li>
                      </>
                    )}
                  </ul>
                </li>
                <li>
                  <NavLink to="/user/cart">
                    <i className="bi bi-cart shop_cart position-relative">
                      <span
                        className="badge position-absolute top-0 start-100 translate-middle"
                        style={{ background: "#F195B2" }}
                      ></span>
                    </i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
