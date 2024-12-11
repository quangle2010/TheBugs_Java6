import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { showErrorToast, showSuccessToast } from '../utils/Toast';
import CommentsList from './CommentsList';
import { formatCurrency } from '../utils/CurrencyUtils';

const ProductDetail = () => {
    const namePage = "Chi tiết sản phẩm";
    const [searchParams] = useSearchParams();
    const productInfoId = searchParams.get("id");

    const [items, setItems] = useState({});
    const [comments, setComments] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const token = Cookies.get('JWT_TOKEN');
    const BASE_URLADD = "http://localhost:8080/user/cart";
    const changeQuantity = (amount) => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + amount;
            return newQuantity > 0 ? newQuantity : 1;
        });
    };

    const fetchItems = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/product-detail?id=${productInfoId}`);
            setItems(response.data.data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }, [productInfoId]);

    const fetchComments = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/comment?productId=${productInfoId}`);
            setComments(response.data.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
            showErrorToast("Không thể tải bình luận.");
        }
    }, [productInfoId]);

    const addToCart = async (productInfoId, quantity) => {
        try {
            if (token) {
                const response = await axios.post(
                    `${BASE_URLADD}/add-to-cart?productId=${productInfoId}&quantity=${quantity}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status) {
                    showSuccessToast(response.data.message);
                } else {
                    showErrorToast(response.data.message || "Có lỗi xảy ra, vui lòng thử lại!");
                }

            } else {
                console.error("Không tìm thấy token");
                showErrorToast("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
            }

        } catch (err) {
            console.error("Error adding to cart:", err);
            showErrorToast(err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    };


    const deleteComment = async (id) => {
        try {
            if (token) {
                const response = await axios.post(`http://localhost:8080/user/deleComment?id=${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.status) {
                    showSuccessToast("Bình luận đã được xóa!");
                    fetchComments();
                } else {
                    showErrorToast("Không thể xóa bình luận.");
                }
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            showErrorToast("Lỗi khi xóa bình luận.");
        }
    };

    const addComment = async (productInfoId, noted) => {
        try {
            if (token) {
                const response = await axios.post(
                    `http://localhost:8080/user/addComment?productId=${productInfoId}&noted=${noted}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status) {
                    showSuccessToast("Bình luận đã được thêm!");
                    fetchComments();
                } else {
                    showErrorToast("Không thể thêm bình luận.");
                }
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            showErrorToast("Lỗi khi thêm bình luận.");
        }
    };

    const updateComment = async (id, noted) => {
        try {
            if (token) {
                const response = await axios.post(
                    `http://localhost:8080/user/updateComment?id=${id}&noted=${noted}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status) {
                    setComments(comments.map(comment =>
                        comment.id === id ? { ...comment, noted: response.data.data.noted } : comment
                    ));
                    fetchComments();
                    showSuccessToast("Bình luận đã được cập nhật!");
                } else {
                    showErrorToast("Không thể cập nhật bình luận.");
                }
            }
        } catch (error) {
            console.error("Error updating comment:", error);
            showErrorToast("Lỗi khi cập nhật bình luận.");
        }
    };

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const imageSrc = items?.images?.length
        ? `http://localhost:8080/images/${items.images[0].name}`
        : 'http://localhost:8080/images/10000.jpg';

    return (
        <>
            <Helmet>
                <title>{namePage}</title>
            </Helmet>
            <section className="product_details_area p_100">
                <div className="container">
                    <div className="row product_d_price">
                        <div className="col-lg-6">
                            <div style={{ width: "100%", height: "500px" }}>
                                <img
                                    className="img-fluid"
                                    style={{ width: "100%", height: "100%" }}
                                    src={imageSrc}
                                    alt={items?.name}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="product_details_text" style={{ marginBottom: "40px" }}>
                                <h4 className="border-bottom-0">{items?.name || "Tên sản phẩm không có"}</h4>
                                <p className="py-2 border-bottom-0">Thành phần: {items?.ingredients}</p>
                                <p className="py-2 border-bottom-0 mb-4">Hương vị: {items?.flavor}</p>
                                <h4 className="border-bottom-0">Giá: {formatCurrency(items?.price)}</h4>
                                <div
                                    className="row justify-content-center align-items-center"
                                >
                                    <h4 className="col-lg-4 pb-0 border-0">Số lượng:</h4>
                                    <div className="col-lg-8">
                                        <div className="d-flex justify-content-tart align-item-center" style={{ width: "200px" }}>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => changeQuantity(-1)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className=""
                                                placeholder="1"
                                                min="1"
                                                value={quantity}
                                                readOnly
                                                style={{ width: "80px", textAlign: "center" }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => changeQuantity(1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={() => addToCart(productInfoId, quantity)}
                            >
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <CommentsList
                        id={productInfoId}
                        comments={comments}
                        onEdit={updateComment}
                        onDelete={deleteComment}
                        onAdd={addComment}
                    />
                </div>
            </section>
        </>
    );
};

export default ProductDetail;
