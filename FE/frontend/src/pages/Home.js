import React, { useEffect, useState } from "react";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/CurrencyUtils";

const Home = () => {
    const [userC, setUserC] = useState([]);
    const [products, setproducts] = useState([]);
    // Fetch data from the API
    const fetchItems = async () => {
        try {
            const response = await axios.get("http://localhost:8080/home");
            if (response.data.status === true) {
                setUserC(response.data.data.userComments);
                setproducts(response.data.data.newProducts);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const [img, setImg] = useState([
        '/assets/img/home-slider/slider-1.jpg',
        '/assets/img/home-slider/slider-2.jpg',
        '/assets/img/home-slider/slider-3.jpg',
        '/assets/img/home-slider/slider-4.jpg',
        '/assets/img/home-slider/slider-5.jpg',
    ]);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        nextArrow: <button className="slick-next">Next</button>,
        prevArrow: <button className="slick-prev">Prev</button>,
    };
    const settingsProduct = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        nextArrow: <button className="slick-next">Next</button>, // Tùy chỉnh mũi tên next
        prevArrow: <button className="slick-prev">Prev</button>,
    };

    return (
        <div>
            <section className="container-fuild">
                <Slider {...settings}>
                    {img.map((image, index) => (
                        <img key={index} src={image} alt={`image-${index}`} />
                    ))}
                </Slider>
            </section>

            <section className="our_chef_area p_100">
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
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
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
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/home" className='text-decoration-none'>
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
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/home" className='text-decoration-none'>
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
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/home" className='text-decoration-none'>
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
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/home" className='text-decoration-none'>
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
                                                <li><Link to="/home"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to="/home"><i className="fa fa-facebook-square"></i></Link></li>
                                            </ul>
                                        </div>
                                        <Link to="/home" className='text-decoration-none'>
                                            <h4>Michale Joe</h4>
                                        </Link>
                                        <h5>Expert in Cake Making</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="new_arivals_area p_100">
                <div className="container">
                    <div className="single_pest_title">
                        <h2>Bánh mới</h2>
                    </div>
                    <Slider {...settingsProduct}>
                        {products.length > 0 ? (
                            products.map((item, index) => {
                                return (
                                    <div className="item " key={index}>
                                        <div className="cake_feature_item mx-3" >
                                            <div className="cake_feature_item_top">
                                                <Link to={`/products-detail?id=${item?.id}`} className="cake_img d-block">
                                                    <img src={`http://localhost:8080/images/${item.images?.[0]?.name}`} alt={item.name} />
                                                </Link>
                                            </div>
                                            <div className="cake_text">
                                                <h3 className="cake_text_name">{item?.name}</h3>
                                                {/* If you have price data */}
                                                <h3 className="cake_text_price">{formatCurrency(item?.price)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>hi</div>
                        )}
                    </Slider>
                </div>
            </section>


            <section className="client_says_area p_100">
                <div className="container">
                    <div className="client_says_inner">
                        <div className="c_says_title">
                            <h2>Khách hàng nói gì?</h2>
                        </div>
                        <Slider {...settings}>
                            {userC.length > 0 ? (
                                userC.map((item, index) => (
                                    <div key={index}>
                                        <div className="media">
                                            <div className="d-flex">
                                                <img src="/assets/img/client/client-1.png" alt="" />
                                                <h3>“</h3>
                                            </div>
                                            <div className="media-body">
                                                <p>{item?.noted}</p>
                                                <h5>{item?.author}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-comments">Chưa có bình luận nào</div>
                            )}
                        </Slider>
                    </div>
                </div>
            </section>
            <section className="bakery_video_area">
                <div className="container">
                    <div className="video_inner">
                        <h3>Hương Vị Thật Sự</h3>
                        <p>Bánh của chúng tôi chứa đựng tình cảm bùng cháy đến từ các đầu bếp</p>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
