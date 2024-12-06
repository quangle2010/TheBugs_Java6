import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const Contact = () => {
    const namePage = "Liên hệ";

    return (
        <>
            <Helmet>
                <title>{namePage}</title>
            </Helmet>
            <section className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>{namePage}</h3>
                        <ul>
                            <li><Link to="/home" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="/contact" className="text-white text-decoration-none">{namePage}</Link></li> {/* Chỉnh sửa ở đây */}
                        </ul>
                    </div>
                </div>
            </section>
            <section className="contact_form_area p_100">
                <div className="container">
                    <div className="main_title">
                        <h2>Liên Lạc Với Chúng Tôi</h2>
                        <h5>Bạn có điều gì muốn chia sẻ? Hãy kết nối với chúng tôi qua mẫu liên hệ bên dưới.</h5>
                    </div>
                    <div className="row">
                        <div className="col-lg-7">
                            <form className="row contact_us_form" method="post" id="contactForm" noValidate>
                                <div className="form-group col-md-6">
                                    <input type="text" className="form-control" id="name" name="name" placeholder="Tên của bạn" />
                                </div>
                                <div className="form-group col-md-6">
                                    <input type="email" className="form-control" id="email" name="email" placeholder="Địa chỉ email" />
                                </div>
                                <div className="form-group col-md-12">
                                    <input type="text" className="form-control" id="subject" name="subject" placeholder="Chủ đề" />
                                </div>
                                <div className="form-group col-md-12">
                                    <textarea className="form-control" name="message" id="message" rows="1" placeholder="Nhập tin nhắn"></textarea>
                                </div>
                                <div className="form-group col-md-12">
                                    <button type="submit" value="submit" className="btn order_s_btn form-control p-0">Gửi ngay</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4 offset-md-1">
                            <div className="contact_details">
                                <div className="contact_d_item">
                                    <h3>Địa Chỉ :</h3>
                                    <p>Toà nhà FPT Polytechnic, Đ. Số 22 <br /> Thường Thạnh, Cái Răng, Cần Thơ, Việt Nam</p>
                                </div>
                                <div className="contact_d_item">
                                    <h5>Điện Thoại : <a href="tel:0766XXX732" className='text-decoration-none'>0766 - XXX -732</a></h5> {/* Sửa ở đây */}
                                    <h5>Email : <a href="mailto:theBugs@gmail.com" className='text-decoration-none'>theBugs@gmail.com</a></h5> {/* Sửa ở đây */}
                                </div>
                                <div className="contact_d_item">
                                    <h3>Giờ Mở Cửa :</h3>
                                    <p>8:00 Sáng – 10:00 Tối</p>
                                    <p>Thứ Hai – Thứ Bảy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="map_area">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31435.361547197932!2d105.72016954421994!3d9.982106455020517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08906415c355f%3A0x416815a99ebd841e!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1727282969117!5m2!1svi!2s"
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vị trí địa chỉ công ty trên Google Maps" // Thêm title ở đây
                ></iframe>
            </section>
        </>
    );
};

export default Contact;
