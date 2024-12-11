import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { userInfo, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
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
                  isLoggedIn && userInfo?.roles === true && (
                    <li className="dropdown submenu">
                      <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                        Quản lý
                      </a>
                      <ul className="dropdown-menu">
                        <li><NavLink to="/admin/list-user">Người dùng</NavLink></li>
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
                    <i className="bi bi-person">{userInfo?.username}</i>
                  </a>
                  <ul className="dropdown-menu">
                    {isLoggedIn ? (
                      <>
                        <li><NavLink to="/author/profile">Thông tin</NavLink></li>
                        <li><NavLink to="/author/resetpass">Đổi mật khẩu</NavLink></li>
                        {
                          isLoggedIn && userInfo?.roles === false && (
                            <li><NavLink to="/user/list-ordered">Đơn hàng</NavLink></li>
                          )
                        }
                        <li><a href="#" onClick={handleLogout}>Đăng xuất</a></li>
                      </>
                    ) : (
                      <>
                        <li><NavLink to="/login">Đăng nhập</NavLink></li>
                        <li><NavLink to="/register">Đăng ký</NavLink></li>
                      </>
                    )}
                  </ul>
                </li>
                {
                  isLoggedIn && userInfo?.roles === false && (
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
                  )
                }


              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
