import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear(); 

    return (
        <footer className="footer_area">
            <div className="footer_widgets">
                <div className="container">
                    <div className="row footer_wd_inner">
                        <div className="col-lg-3 col-6">
                            <aside className="f_widget f_about_widget">
                                <img src="/assets/img/footer-logo.png" alt="Footer Logo" />
                                <p>Thơm ngon từng ổ, lan tỏa hương vị Việt!</p>
                                <ul className="nav">
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                </ul>
                            </aside>
                        </div>
                        <div className="col-lg-3 col-6">
                            <aside className="f_widget f_link_widget">
                                <div className="f_title">
                                    <h3>Truy cập nhanh</h3>
                                </div>
                                <ul className="list_style">
                                    <li><a href="#">Tài Khoản</a></li>
                                    <li><a href="#">Đơn Hàng</a></li>
                                    <li><a href="#">Quyền Riêng Tư</a></li>
                                    <li><a href="#">Chính Sách Và Điều Kiện</a></li>
                                </ul>
                            </aside>
                        </div>
                        <div className="col-lg-3 col-6">
                            <aside className="f_widget f_link_widget">
                                <div className="f_title">
                                    <h3>Liên Hệ</h3>
                                </div>
                                <ul className="list_style">
                                    <li><a href="#">Chăm Sóc Khách Hàng</a></li>
                                    <li><a href="#">Liên Hệ Chúng Tôi</a></li>
                                    <li><a href="#">Địa Chỉ</a></li>
                                </ul>
                            </aside>
                        </div>
                        <div className="col-lg-3 col-6">
                            <aside className="f_widget f_contact_widget">
                                <div className="f_title">
                                    <h3>Thông Tin Liên Hệ</h3>
                                </div>
                                <p>0766 - XXX - 732</p>
                                <p>theBugs@gmail.com</p>
                                <p>15 Đường số 4, Khu phố 5, Phường Trường Thạnh, Quận 9, TP.HCM</p>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_copyright_area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <p>© {currentYear} All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
