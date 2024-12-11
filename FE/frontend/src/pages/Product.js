
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showErrorToast, showSuccessToast } from '../utils/Toast';
import { formatCurrency } from '../utils/CurrencyUtils';
import Pagination from '../pagination/pagination';
const Product = () => {
    const namePage = "Sản phẩm";
    const token = Cookies.get('JWT_TOKEN');
    const BASE_URLADD = "http://localhost:8080/user/cart";

    const BASE_URL = "http://localhost:8080/products";

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchItems, setSearchItems] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const fetchItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}`);
            const data = response.data.data || [];
            setItems(data.products);
            setFilteredItems(data.products);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);
    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setSearchItems(search);
        setFilteredItems(items.filter(item => item.name.toLowerCase().includes(search)));
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };
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
            if (response.data.status === true) {
                showSuccessToast(response.data.message);
            } else {
                showErrorToast(response.data.message || "Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
            if (err.response && err.response.status === 401) {
                showErrorToast(err.response.message);
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
                    <div className="row product_inner_row mb-3">
                        <div className="col-lg-9">
                            <div className="row m0 product_task_bar">
                                <div className="product_task_inner ">

                                    <div className="float-left">

                                    </div>
                                    <div className="float-right">
                                        <form>
                                            <select name="sortBy" className="short" >
                                                <option value="asc">Giá: thấp đến cao</option>
                                                <option value="desc">Giá: cao đến thấp</option>
                                            </select>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="row product_item_inner mb-2">
                                {
                                    currentItems.map((item, index) => {
                                        return (<div className="col-lg-4 col-md-4 col-sm-6">
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
                                                            onClick={() => addToCart(item.id, 1)}
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
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                totalElements={items.length}
                                itemsPerPage={itemsPerPage}
                            />
                        </div>
                        <div className='col-lg-3'>
                            <div className="product_left_sidebar">
                                <aside className="left_sidebar search_widget">
                                    <div className="input-group m-0">
                                        <input type="text" className="form-control" placeholder="Nhập từ khóa tìm kiếm"
                                            value={searchItems}
                                            onChange={handleSearch}
                                        />
                                        <div className="input-group-append">
                                            <button className="btn" type="button"><i className="icon icon-Search"></i></button>
                                        </div>
                                    </div>
                                </aside>
                                <aside className="left_sidebar p_catgories_widget">
                                    <div className="p_w_title">
                                        <h3>Danh mục sản phẩm</h3>
                                    </div>
                                    <ul className="list_style">
                                        <li><a href="#">Chocolate (17)</a></li>
                                        <li><a href="#">Chocolate (15)</a></li>
                                        <li><a href="#">Chocolate (14)</a></li>
                                        <li><a href="#">Chocolate (8)</a></li>
                                        <li><a href="#">Chocolate (11)</a></li>
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



