import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const About = () => {
    const namePage = "Giới thiệu";
    return (
        <>
            <Helmet>
                <title>{namePage}</title>
            </Helmet>
            <div className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>{namePage}</h3>
                        <ul>
                            <li><Link to="/home" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="/about" className="text-white text-decoration-none">{namePage}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="our_bakery_area p_100">
                <div className="container">
                    <div className="our_bakery_text">
                        <h2>Phương pháp làm bánh của chúng tôi</h2>
                        <h6>Đầu tiên, nguyên liệu cần được cân đo chính xác để đảm bảo bánh có kết cấu chuẩn. Sau đó, bột được nhào cho đến khi mịn và đàn hồi. Khi bột đã được ủ nở, nó sẽ được nướng trong lò ở nhiệt độ phù hợp để bánh chín vàng đều. Cuối cùng, bánh sẽ được trang trí tùy theo sở thích, tạo nên thành phẩm vừa ngon miệng vừa đẹp mắt.</h6>
                    </div>
                    <div className="row our_bakery_image">
                        <div className="col-md-4 col-6">
                            <img className="img-fluid" src="/assets/img/our-bakery/bakery-1.jpg" alt="" />
                        </div>
                        <div className="col-md-4 col-6">
                            <img className="img-fluid" src="/assets/img/our-bakery/bakery-2.jpg" alt="" />
                        </div>
                        <div className="col-md-4 col-6">
                            <img className="img-fluid" src="/assets/img/our-bakery/bakery-3.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="our_chef_area p_100">
                <div className="container" >
                    <div className="row our_chef_inner m-0">
                        <div className="col-lg-3">
                            <div className="chef_text_item">
                                <div className="main_title">
                                    <h2>Đầu bếp</h2>
                                    <p>
                                        Đầu bếp là nghệ sĩ trong bếp, sáng tạo ra những món ăn hấp dẫn. Họ không chỉ nấu nướng mà còn truyền cảm hứng cho thực khách qua hương vị và cách trình bày. Với đam mê và kỹ năng, đầu bếp biến mỗi bữa ăn thành một trải nghiệm ẩm thực độc đáo.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row our_chef_inner d-flex justify-content-center align-items-center">
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/about"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/about"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link className='text-decoration-none'>
                                            <h4>Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/about"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/about"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/about" className='text-decoration-none'>
                                            <h4 >Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/about"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/about"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/about" className='text-decoration-none'>
                                            <h4 >Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/about"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/about"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/about" className='text-decoration-none'>
                                            <h4>Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/about"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/about"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/about" className='text-decoration-none'>
                                            <h4>Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="chef_item">
                                        <div className="chef_img">
                                            <img className="img-fluid" src="/assets/img/chef/chef-2.jpg" alt="" />
                                            <ul className="list_style">
                                                <li><Link to="/about"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/about"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/about" className='text-decoration-none'>
                                            <h4>Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bakery_video_area">
                <div className="container">
                    <div className="video_inner">
                        <h3>Hương Vị Thật Sự</h3>
                        <p>Bánh của chúng tôi chứa đựng tình cảm bùng cháy đến từ các đầu bếp</p>

                    </div>
                </div>
            </div>
        </>

    );
};

export default About;
