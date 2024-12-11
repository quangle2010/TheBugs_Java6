import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { formatCurrency } from "../utils/CurrencyUtils";
import { showErrorToast, showSuccessToast } from "../utils/Toast";
import { closeModal, openModal } from "../utils/Modal";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
const Cart = () => {
    const [sessionId, setSessionId] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const namePage = "Giỏ hàng";
    const BASE_URL = "http://localhost:8080/user/cart";
    const [total, setTotal] = useState([]);
    const [items, setItems] = useState([]);
    const token = Cookies.get("JWT_TOKEN");

    const fetchItems = async () => {
        try {
            if (!token) {
                showErrorToast("Vui lòng đăng nhập !");
                return;
            }
            const response = await axios.get(`${BASE_URL}/list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItems(response.data.data.cartItemDTOs);
            setTotal(response.data.data.total);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };
    const openWindowAndWait = async (url) => {
        return new Promise((resolve, reject) => {
            const popup = window.open(
                url,
                "",
                "width=1000,height=800,scrollbars=no,toolbar=no,location=no,status=no,menubar=no"
            );

            if (!popup) {
                reject("Popup bị trình duyệt chặn.");
                return;
            }
            const originalUrl = popup.location.href;
            const interval = setInterval(() => {
                if (popup.closed) {
                    clearInterval(interval); // Dừng kiểm tra
                    resolve(); // Thông báo rằng quá trình đã hoàn tất
                } else if (popup.location.href !== originalUrl) {
                    clearInterval(interval);
                    setTimeout(() => {
                        popup.close(); // Đóng popup sau 5 giây
                        reject("Popup đã chuyển trang hoặc bị thay đổi.");
                    }, 5000); // 5000ms = 5s
                }
            }, 500); // Kiểm tra mỗi 500ms
        });
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
            await axios.post(
                `${BASE_URL}/delete?id=${id}`,
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

    const ordered = async (data) => {
        console.log(data);
        try {
            if (!token) {
                showErrorToast("Vui lòng đăng nhập !");
                window.location.href = "/login";
                return;
            }
            const orderRes = await axios.post(
                "http://localhost:8080/user/ordered",
                {
                    fullName: data.fullName,
                    phone: data.phone,
                    address: data.address,
                    paymentMethod: data.paymentMethod,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            showSuccessToast(orderRes.data.message);
            if (data.onlinePayment && orderRes.data.status === true) {
                showSuccessToast("Đang chuyển đến trang thanh toán VNPay");
                const orderInfor = `Don hang ${orderRes.data.data.id} "co gia tri" ${total}`;

                const paymentRes = await axios.get(
                    "http://localhost:8080/payment-online/create-payment",
                    {
                        params: {
                            orderId: orderRes.data.data.id,
                            orderInfor: orderInfor,
                            total: total,
                        },
                    }
                );
                if (paymentRes.data.status === true) {
                    console.log(paymentRes.data);
                    closeModal("exampleModalCenter");
                    window.location.href = paymentRes.data.data;
                }
                console.log("test thử");
            }

            // if (orderRes.data.status === true) {
            //     console.log("Order Data:");
            //     console.log(orderRes.data);
            //     console.log(orderRes.data.message);
            //
            // } else {
            //     console.log(orderRes.data.message);
            // }

            fetchItems();
        } catch (error) {
            console.error("Error placing order:", error.response.data.message);
        }
    };

    return (
        <>
            <section className="cart_table_area p_100">
                <div className="container">
                    {items.length === 0 ? (
                        <div className="main_container_content">
                            <p className="fs-4">
                                Không có sản phẩm nào trong giỏ
                            </p>
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
                                                <th>Ảnh</th>
                                                <th>Tên Bánh</th>
                                                <th>Giá Tiền</th>
                                                <th>Số Lượng</th>
                                                <th>Thành Tiền</th>
                                                <th>Xóa</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img
                                                                src={`http://localhost:8080/images/${item?.productDTO?.images[0]?.name}`}
                                                                alt={
                                                                    item
                                                                        ?.productDTO
                                                                        ?.images[0]
                                                                        ?.name
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            {
                                                                item?.productDTO
                                                                    ?.name
                                                            }
                                                        </td>

                                                        <td>
                                                            {formatCurrency(
                                                                item?.productDTO
                                                                    ?.price
                                                            )}
                                                        </td>
                                                        <td>
                                                            <div
                                                                style={{
                                                                    width: "120px",
                                                                }}
                                                            >
                                                                <div className="input-group bootstrap-touchspin">
                                                                    <span className="input-group-btn">
                                                                        <button
                                                                            className="btn btn-default"
                                                                            type="button"
                                                                            onClick={() =>
                                                                                updateCart(
                                                                                    item.id,
                                                                                    item.quantity -
                                                                                    1
                                                                                )
                                                                            }
                                                                            title="Giảm số lượng"
                                                                        >
                                                                            -
                                                                        </button>
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            item?.quantity
                                                                        }
                                                                        readOnly
                                                                        className="input-qty form-control text-center"
                                                                    />
                                                                    <span className="input-group-btn">
                                                                        <button
                                                                            className="btn btn-default"
                                                                            type="button"
                                                                            onClick={() =>
                                                                                updateCart(
                                                                                    item.id,
                                                                                    item.quantity +
                                                                                    1
                                                                                )
                                                                            }
                                                                            title="Tăng số lượng"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            {formatCurrency(
                                                                item?.productDTO
                                                                    ?.price *
                                                                item?.quantity
                                                            )}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() =>
                                                                    deleteItem(
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                Xóa
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                        <tfoot className="cart_total_text">
                                            <tr className="cart_total_text">
                                                <td
                                                    colspan="4"
                                                    className="text-start ps-5 fs-2"
                                                >
                                                    Tổng tiền{" "}
                                                </td>
                                                <td>{formatCurrency(total)}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center ">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={() =>
                                                                openModal(
                                                                    "exampleModalCenter"
                                                                )
                                                            }
                                                        >
                                                            Chi tiết
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div
                                className="modal fade"
                                id="exampleModalCenter"
                                tabindex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalCenterTitle"
                                aria-hidden="true"
                            >
                                <div
                                    className="modal-dialog  modal-xl modal-dialog-centered"
                                    role="document"
                                >
                                    <div className="modal-content">
                                        <form>
                                            <div className="modal-header">
                                                <h5
                                                    className="modal-title"
                                                    id="exampleModalLongTitle"
                                                >
                                                    Xác nhận đơn hàng
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() =>
                                                        closeModal(
                                                            "exampleModalCenter"
                                                        )
                                                    }
                                                ></button>
                                            </div>
                                            <div className="modal-body m-0 p-3">
                                                <div className="row">
                                                    <div className="col-lg-7">
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th className="custom-style">
                                                                        Tên
                                                                    </th>
                                                                    <th className="custom-style">
                                                                        Giá
                                                                    </th>
                                                                    <th className="custom-style">
                                                                        Số lượng
                                                                    </th>
                                                                    <th className="custom-style">
                                                                        Thành
                                                                        tiền
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {items.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <tr
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <td className="custom-style">
                                                                                    {
                                                                                        item
                                                                                            ?.productDTO
                                                                                            ?.name
                                                                                    }
                                                                                </td>
                                                                                <td className="custom-style">
                                                                                    {formatCurrency(
                                                                                        item
                                                                                            ?.productDTO
                                                                                            ?.price
                                                                                    )}
                                                                                </td>
                                                                                <td className="custom-style">
                                                                                    {
                                                                                        item?.quantity
                                                                                    }
                                                                                </td>
                                                                                <td className="custom-style">
                                                                                    {formatCurrency(
                                                                                        item
                                                                                            ?.productDTO
                                                                                            ?.price *
                                                                                        item?.quantity
                                                                                    )}
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    }
                                                                )}
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td
                                                                        className="custom-style"
                                                                        colspan="3"
                                                                    >
                                                                        Tổng
                                                                        tiền
                                                                    </td>
                                                                    <td className="custom-style">
                                                                        {formatCurrency(
                                                                            total
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                    <div className="col-lg-5">
                                                        <div className="px-4">
                                                            <div className="row mb-3 align-items-center">
                                                                <div className="col-4">
                                                                    <label
                                                                        className="custom-style"
                                                                        htmlFor="fullName"
                                                                    >
                                                                        Tên
                                                                    </label>
                                                                </div>
                                                                <div className="col-8">
                                                                    <input
                                                                        type="text"
                                                                        id="fullName"
                                                                        className="custom-style form-control"
                                                                        placeholder="Nhập họ tên của bạn"
                                                                        {...register(
                                                                            "fullName",
                                                                            {
                                                                                required:
                                                                                    "Họ tên không được để trống",
                                                                            }
                                                                        )}
                                                                    />
                                                                    {errors.fullName && (
                                                                        <span className="text-danger">
                                                                            {
                                                                                errors
                                                                                    .fullName
                                                                                    .message
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="row mb-3 align-items-center">
                                                                <div className="col-4 custom-style">
                                                                    <label htmlFor="phone">
                                                                        Số điện
                                                                        thoại
                                                                    </label>
                                                                </div>
                                                                <div className="col-8">
                                                                    <input
                                                                        type="text"
                                                                        id="phone"
                                                                        className="custom-style form-control"
                                                                        placeholder="Nhập số điện thoại của bạn"
                                                                        {...register(
                                                                            "phone",
                                                                            {
                                                                                required:
                                                                                    "Số điện thoại không được để trống",
                                                                            }
                                                                        )}
                                                                    />
                                                                    {errors.phone && (
                                                                        <span className="text-danger">
                                                                            {
                                                                                errors
                                                                                    .phone
                                                                                    .message
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="row mb-3 align-items-center">
                                                                <div className="col-4 custom-style">
                                                                    <label htmlFor="address">
                                                                        Địa chỉ
                                                                    </label>
                                                                </div>
                                                                <div className="col-8">
                                                                    <textarea
                                                                        className="form-control custom-style"
                                                                        rows="2"
                                                                        id="address"
                                                                        placeholder="Nhập địa chỉ của bạn"
                                                                        {...register(
                                                                            "address",
                                                                            {
                                                                                required:
                                                                                    "Địa chỉ không được để trống",
                                                                            }
                                                                        )}
                                                                    ></textarea>
                                                                    {errors.address && (
                                                                        <span className="text-danger">
                                                                            {
                                                                                errors
                                                                                    .address
                                                                                    .message
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="row mb-3 align-items-center">
                                                                <div className="col-4 custom-style">
                                                                    <label htmlFor="address">
                                                                        Thanh
                                                                        toán
                                                                    </label>
                                                                </div>
                                                                <div className="col-lg-8">
                                                                    <div className="mx-1 d-flex">
                                                                        <div className="mx-3">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                name="Payment"
                                                                                id="onlinePayment"
                                                                                {...register(
                                                                                    "onlinePayment"
                                                                                )}
                                                                            />
                                                                            <label
                                                                                class="form-check-label"
                                                                                for="onlinePayment"
                                                                            >
                                                                                Online
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    className="btn btn-primary mx-2"
                                                    onClick={handleSubmit(
                                                        ordered
                                                    )}
                                                >
                                                    Đặt hàng
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};
export default Cart;