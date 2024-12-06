import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import numeral from "numeral";
import axios from "axios";

const Menu = () => {
    const namePage = "Thực đơn";
    const BASE_URL = "http://localhost:8080/products";
    const [items, setItems] = useState([]);
    const fetchItems = async () => {
        try {
            const response = await axios.get(BASE_URL);
            setItems(response.data.data.products);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);
    const formatCurrency = (amount) => {
        return `${numeral(amount).format('0,0')} VND`;
    };
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
                            <li><Link to="/menu" className="text-white text-decoration-none">{namePage}</Link></li> {/* Chỉnh sửa ở đây */}
                        </ul>
                    </div>
                </div>
            </section>
            <section className="price_list_area p_100">
                <div className="container">
                    <div className="price_list_inner">
                        <div className="single_pest_title">
                            <h2>Bảng giá của chúng tôi</h2>
                            <p>Thực đơn này mang đến cho thực khách nhiều lựa chọn hấp dẫn, từ các món ăn nhẹ đến tráng miệng
                                độc đáo.
                            </p>
                        </div>
                        <div className="row">
                            {
                                items.map((item, index) => {
                                    return (
                                        <div className="col-lg-6 my-1" key={index}>
                                            <div className="discover_item_inner">
                                                <div className="discover_item">
                                                    <Link to={`/products-detail?id=${item?.id}`} className="text-decoration-none">
                                                        <h4>{item?.name}</h4>
                                                    </Link>
                                                    <p className="mb-0">{item?.ingredients}</p>
                                                    <p>{formatCurrency(item?.price)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row our_bakery_image">
                            <div className="col-md-4 col-6">
                                <img className="img-fluid" src="/assets/images/img/our-bakery/bakery-1.jpg" alt="" />
                            </div>
                            <div className="col-md-4 col-6">
                                <img className="img-fluid" src="/assets/images/img/our-bakery/bakery-2.jpg" alt="" />
                            </div>
                            <div className="col-md-4 col-6">
                                <img className="img-fluid" src="/assets/images/img/our-bakery/bakery-3.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Menu;


