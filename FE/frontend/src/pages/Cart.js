import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { formatCurrency } from "../utils/CurrencyUtils";
import { showErrorToast, showSuccessToast } from "../utils/Toast";
import { closeModal, openModal } from "../utils/Modal";
const Cart = () => {
    const namePage = "Giỏ hàng";
    const BASE_URL = "http://localhost:8080/user/cart";
    const [total, setTotal] = useState([]);
    const [items, setItems] = useState([]);

    const token = Cookies.get('JWT_TOKEN');
    const fetchItems = async () => {
        try {
            if (!token) {
                showErrorToast("Vui lòng đăng nhập !");
                return;
            }
            const response = await axios.get(`${BASE_URL}/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setItems(response.data.data.cartItemDTOs);
            setTotal(response.data.data.total);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const updateCart = async (cartItemId, quantity) => {
        try {
            if (!token) {
                showErrorToast("Vui lòng đăng nhập !");
                return;
            }
            const response = await axios.post(
                `${BASE_URL}/update-to-cart?cartItemId=${cartItemId}&quantity=${quantity}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchItems();
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    };

    const deleteItem = async (id) => {
        try {
            if (!token) {
                showErrorToast("Vui lòng đăng nhập !");
                return;
            }
            await axios.post(`${BASE_URL}/delete?id=${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchItems();
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    };

    const ordered = async (data) => {
        console.log(data);
        try {
            if (!token) {
                showErrorToast("Vui lòng đăng nhập !");
                window.location.href = "/login";
                return;
            }
            const response = await axios.post("http://localhost:8080/user/ordered", {
                fullName: data.fullName,
                phone: data.phone,
                address: data.address,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status === true) {
                console.log(response.data.message);
                showSuccessToast(response.data.message);
                closeModal("exampleModalCenter");
            } else {
                console.log(response.data.message);
            }

            fetchItems();
        } catch (error) {
            console.error("Error placing order:", error.response.data.message);
        }
    };


    return (
        <>
            <section className="cart_table_area p_100">
                <div className="container">
                    {
                        items.length === 0 ? (
                            <div className="main_container_content">
                                <p className="fs-4">Không có sản phẩm nào trong giỏ</p>
                                <div className="shop_cart_myuser">
                                    <a href="/products">Tiếp tục mua sắm</a>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="table-responsive">
                                    <div className="tatable-wrapper">
                                        <table className="table table-hover mb-3 text-center ">
                                            <thead>
                                                <tr>
                                                    <th >Ảnh</th>
                                                    <th >Tên Bánh</th>
                                                    <th >Giá Tiền</th>
                                                    <th >Số Lượng</th>
                                                    <th >Thành Tiền</th>
                                                    <th >Xóa</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    items.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <img src={`http://localhost:8080/images/${item?.productDTO?.images[0]?.name}`} alt={item?.productDTO?.images[0]?.name} />

                                                                </td>
                                                                <td>{item?.productDTO?.name}</td>

                                                                <td>{formatCurrency(item?.productDTO?.price)}</td>
                                                                <td>
                                                                    <div style={{ width: "120px" }}>
                                                                        <div className="input-group bootstrap-touchspin">
                                                                            <span className="input-group-btn">
                                                                                <button className="btn btn-default" type="button" onClick={() => updateCart(item.id, item.quantity - 1)} title="Giảm số lượng">-</button>
                                                                            </span>
                                                                            <input type="text" value={item?.quantity} readOnly className="input-qty form-control text-center" />
                                                                            <span className="input-group-btn">
                                                                                <button className="btn btn-default" type="button" onClick={() => updateCart(item.id, item.quantity + 1)} title="Tăng số lượng">+</button>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td>{formatCurrency(item?.productDTO?.price * item?.quantity)}</td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        onClick={() => deleteItem(item.id)}
                                                                    >
                                                                        Xóa
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                            <tfoot className="cart_total_text">
                                                <tr className="cart_total_text">
                                                    <td colspan="4" className="text-start ps-5 fs-2">Tổng tiền </td>
                                                    <td >
                                                        {formatCurrency(total)}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center ">
                                                            <button type="button" className="btn btn-primary" onClick={() => openModal("exampleModalCenter")}>
                                                                Chi tiết
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog  modal-xl modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <form>
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">Xác nhận đơn hàng</h5>
                                                    <button type="button" className="btn-close" onClick={() => closeModal("exampleModalCenter")}></button>
                                                </div>
                                                <div className="modal-body m-0 p-3">
                                                    <div className="row">
                                                        <div className="col-lg-7">
                                                            <table className="table table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="custom-style">Tên</th>
                                                                        <th className="custom-style">Giá</th>
                                                                        <th className="custom-style">Số lượng</th>
                                                                        <th className="custom-style">Thành tiền</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        items.map((item, index) => {
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <td className="custom-style">{item?.productDTO?.name}</td>
                                                                                    <td className="custom-style">{formatCurrency(item?.productDTO?.price)}</td>
                                                                                    <td className="custom-style">{item?.quantity}</td>
                                                                                    <td className="custom-style">{formatCurrency(item?.productDTO?.price * item?.quantity)}</td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <td className="custom-style" colspan="3">Tổng tiền</td>
                                                                        <td className="custom-style">
                                                                            {formatCurrency(total)}
                                                                        </td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                        <div className="col-lg-5">
                                                            <div className="px-4">
                                                                <div className="row mb-3 align-items-center">
                                                                    <div className="col-4">
                                                                        <label className="custom-style" htmlFor="fullName">Tên</label>
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <input
                                                                            type="text"
                                                                            id="fullName"
                                                                            className="custom-style form-control"
                                                                            placeholder="Nhập họ tên của bạn"
                                                                            {...register("fullName", {
                                                                                required: "Họ tên không được để trống"
                                                                            })}
                                                                        />
                                                                        {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3 align-items-center">
                                                                    <div className="col-4 custom-style">
                                                                        <label htmlFor="phone">Số điện thoại</label>
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <input
                                                                            type="text"
                                                                            id="phone"
                                                                            className="custom-style form-control"
                                                                            placeholder="Nhập số điện thoại của bạn"
                                                                            {...register("phone", {
                                                                                required: "Số điện thoại không được để trống"
                                                                            })}
                                                                        />
                                                                        {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3 align-items-center">
                                                                    <div className="col-4 custom-style">
                                                                        <label htmlFor="address">Địa chỉ</label>
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <textarea
                                                                            className="form-control custom-style"
                                                                            rows="2"
                                                                            id="address"
                                                                            placeholder="Nhập địa chỉ của bạn"
                                                                            {...register("address", {
                                                                                required: "Địa chỉ không được để trống"
                                                                            })}
                                                                        ></textarea>
                                                                        {errors.address && <span className="text-danger">{errors.address.message}</span>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button className="btn btn-primary mx-2" onClick={handleSubmit(ordered)}>Đặt hàng</button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </section >
        </>
    )
};
export default Cart;


