
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import numeral from 'numeral';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { showErrorToast, showSuccessToast } from '../utils/Toast';
import { formatCurrency } from '../utils/CurrencyUtils';
const Product = () => {
    const namePage = "Sản phẩm";

    const BASE_URL = "http://localhost:8080/products";
    const BASE_URLADD = "http://localhost:8080/user/cart";
    const [items, setItems] = useState([]);
    const [cates, setCates] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const token = Cookies.get('JWT_TOKEN');
    const fetchItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}`);
            const data = response.data.data || [];
            setItems(data.products);
            setCates(data.categories)
            setFilteredItems(data.products);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);


    const addToCart = async (productId, quantity) => {
        try {
            if (!token) {
                showErrorToast("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
                return;
            }
            const response = await axios.post(
                `${BASE_URLADD}/add-to-cart?productId=${productId}&quantity=${quantity}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.status == true) {
                showSuccessToast(response.data.message);
            } else {
                showErrorToast(response.data.message || "Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
            if (err.response && err.response.status === 401) {
                showErrorToast("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
            } else {
                showErrorToast("Lỗi không xác định, vui lòng thử lại sau.");
            }
        }
    };

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
            <section className="product_area p_100">
                <div className="container">
                    <div className="row product_inner_row">
                        <div className="col-lg-9">
                            <div className="row m0 product_task_bar">

                            </div>

                            <div className="row product_item_inner">
                                {
                                    items.map((item, index) => {
                                        return (<div className="col-lg-4 col-md-4 col-6">
                                            <div className="cake_feature_item" key={index}>
                                                <div className="cake_feature_item_top">
                                                    <Link to={`/products-detail?id=${item.id}`} className="cake_img d-block">
                                                        <img src={`http://localhost:8080/images/${item.images?.[0]?.name}`} alt={item.name} />
                                                    </Link>
                                                </div>


                                                <div className="cake_text">
                                                    <h3 className="cake_text_name">{item?.name}</h3>
                                                    <h3 className="cake_text_price">{formatCurrency(item?.price)}</h3>
                                                    <div className="b-none">
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => addToCart(item.id, 1)} // Truyền ID và quantity trực tiếp vào hàm
                                                        >
                                                            Thêm vào giỏ
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })}
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="product_left_sidebar">
                                {/* <aside className="left_sidebar search_widget">
                                    <form action="/products/filter" method="get">


                                        <div className="input-group m-0">
                                            <input type="text" className="form-control" placeholder="Nhập từ khóa tìm kiếm" name="keyword" value="${keyword}" />
                                            <div className="input-group-append">
                                                <button className="btn" type="submit"><i className="icon icon-Search"></i></button>
                                            </div>
                                        </div>

                                    </form>
                                </aside> */}
                                <aside className="left_sidebar p_catgories_widget">
                                    <div className="p_w_title">
                                        <h3>Danh mục sản phẩm</h3>
                                    </div>
                                    <ul className="list_style">
                                        <li>
                                            <a href="/products">Xem tất cả</a>
                                        </li>
                                        {
                                            cates.map((item, index) => {
                                                return (
                                                    <li key={index} >   <a href="#">{item?.name}</a></li>
                                                )
                                            })
                                        }
                                        <li>
                                            <a href="/products">Xem tất cả</a>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>

    );
};

export default Product;



