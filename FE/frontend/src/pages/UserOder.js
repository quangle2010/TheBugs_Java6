import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import Cookies from 'js-cookie';
import { formatCurrency, formattedDate } from "../utils/CurrencyUtils";
import { closeModal, openModal } from "../utils/Modal";
import { useForm } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "../utils/Toast";
const UserOrder = () => {
    const namePage = "Danh sách đơn hàng";

    const BASE_URL = "http://localhost:8080/user/ordered";
    const [selected, setSelected] = useState(null);
    const [items, setItems] = useState([]);
    const token = Cookies.get('JWT_TOKEN');
    const { register, handleSubmit, reset } = useForm();
    const fetchItems = async () => {
        try {
            if (token) {
                const response = await axios.get(BASE_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data.data || [];
                setItems(data);
                console.log(data);
            } else {
                console.error("không tìm thấy token");
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };


    useEffect(() => {
        fetchItems();
    }, []);



    const saveItem = async (data) => {
        try {
            if (token) {
                const payload = selected ? { ...data, id: selected.id } : data;
                const response = await axios.post(`${BASE_URL}/cancel`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.status === true) {
                    showSuccessToast(response.data.message);
                    reset();
                    setSelected(null);
                    closeModal("saveModal");
                    fetchItems();
                }
            } else {
                console.error("Không tìm thấy token");
            }

        } catch (err) {
            console.error("Lỗi save order:", err);
            if (err.response) {
                const errorMessage = err.response.data.message || "Có lỗi xảy ra. Vui lòng thử lại.";
                showErrorToast(errorMessage);
            } else {
                showErrorToast("Không thể kết nối đến server");
            }
        }
    };
    return (
        <>
            <Helmet>
                <title>{namePage}</title>
            </Helmet>
            <div className="cart_table_area p_100">
                <div className="container">
                    <div className="table-responsive m-4">
                        <table className="table" style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th scope="col">Tên Người nhận</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Ngày đặt hàng</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Tổng Tiền</th>
                                    <th scope="col">Thanh toán</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items && items.length > 0 ? (
                                    items.map((item, index) => (
                                        <tr key={item.id || index}>
                                            <td>{item?.fullName}</td>
                                            <td>{item?.phone}</td>
                                            <td>{formattedDate(item?.createAt)}</td>
                                            <td>{item?.orderStatus?.status}</td>
                                            <td> {formatCurrency(item.total)}</td>
                                            <td> {item.paymentMethod? "Đã thanh toán" : "Chưa thanh toán"}</td>
                                            <td>
                                                <button
                                                    className="bi bi-eye btn btn-primary mr-2"
                                                    onClick={() => {
                                                        setSelected(item);
                                                        reset(item);
                                                        openModal("saveModal");
                                                    }}
                                                >

                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No orders found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="saveModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title custom-style">Chi tiết hóa đơn</h5>
                            <button type="button" className="close" onClick={() => closeModal("saveModal")}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="custom-style col-lg-6">Họ tên: {selected?.fullName}</div>
                                <div className="custom-style col-lg-6">
                                    Ngày đặt hàng: {formattedDate(selected?.createAt)}
                                </div>
                                <div className="custom-style col-lg-6">Số điện thoại: {selected?.phone}</div>
                                <div className="custom-style col-lg-6">Địa chỉ: {selected?.address}</div>

                                <div className="custom-style col-lg-6">Trạng thái: {selected?.orderStatus.status}</div>

                            </div>
                            <div className="mt-2">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th className="custom-style">Tên sản phẩm</th>
                                            <th className="custom-style">Số lượng</th>
                                            <th className="custom-style">Giá</th>
                                            <th className="custom-style">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selected?.orderDetails.map((item, index) => (
                                            <tr key={index}>
                                                <td className="custom-style">{item?.productName}</td>
                                                <td className="custom-style">{item?.quantity}</td>
                                                <td className="custom-style">{formatCurrency(item?.price)}</td>
                                                <td className="custom-style">
                                                    {formatCurrency(item?.price * item?.quantity)}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="custom-style" colSpan="3">
                                                Tổng tiền
                                            </td>
                                            <td className="custom-style">{formatCurrency(selected?.total)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="modal-footer">
                                <input type="hidden" value={selected?.id} {...register("id")} />
                                <input type="hidden" value={2}
                                    {...register("status")}
                                />
                                <button className="btn btn-danger" onClick={handleSubmit(saveItem)}>
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserOrder;
