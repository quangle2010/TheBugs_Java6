import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import axios from "axios";
import { openModal, closeModal } from "../utils/Modal";
import { toast } from "react-toastify";
import Pagination from "../pagination/pagination";
import { formatCurrency, formattedDate } from "../utils/CurrencyUtils";
import Cookies from 'js-cookie';
import { showErrorToast, showSuccessToast } from "../utils/Toast";
const OrderedManagement = () => {
    const namePage = "Danh sách loại sản phẩm";
    const BASE_URL = "http://localhost:8080/admin/api/ordered";
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selected, setSelected] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [order_Status, setOrder_Status] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const token = Cookies.get('JWT_TOKEN');
    const fetchItems = async () => {
        try {
            if (token) {
                const response = await axios.get(`${BASE_URL}/list`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setItems(response.data.data.orderDTOs);
                setFilteredItems(response.data.data.orderDTOs);
                setOrder_Status(response.data.data.statusDTOs)
            } else {
                console.error("Không tìm thấy token");
            }


        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const saveItem = async (data) => {
        try {
            if (token) {
                const payload = selected ? { ...data, id: selected.id } : data;
                const response = await axios.post(`${BASE_URL}/save`, payload , {
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
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <>
            <Helmet>
                <title>{namePage}</title>
            </Helmet>
            <div className="cart_table_area p_100">
                <div className="container">
                    <div className="table-responsive">
                        <div className="table-wrapper">
                            <div className="table-title d-flex justify-content-between align-items-center" style={{ background: "#f195b2" }}>
                                <h2>Danh sách</h2>
                                <div>
                                    <div className="input-group">
                                        <label htmlFor="startDate" className="input-group-text">Ngày bắt đầu</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="startDate"
                                            name="startDate"
                                        />
                                    </div>
                                </div>

                                <div className="mx-1">
                                    <div className="input-group">
                                        <label htmlFor="endDate" className="input-group-text">Ngày kết thúc</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="endDate"
                                            name="endDate"
                                        />

                                    </div>
                                </div>

                                <div>
                                    <select
                                        className="form-select"
                                        id="status"
                                        name="status"
                                    >
                                        <option value="">Chọn trạng thái...</option>
                                        {order_Status?.map((status, index) => (
                                            <option key={index} value={status.id}>
                                                {status?.status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <table className="table table-hover mb-3 text-center ">
                                <thead>
                                    <tr>
                                        <th>Tên người nhận</th>
                                        <th>Số điện thoại</th>
                                        <th>Địa chỉ</th>
                                        <th>Ngày tạo</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.fullName}</td>
                                            <td>{item?.phone}</td>
                                            <td>{item?.address}</td>
                                            <td>{formattedDate(item?.createAt)}</td>
                                            <td>{formatCurrency(item?.total)}</td>
                                            <td>{item?.orderStatus?.status}</td>
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
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalElements={items.length}
                        itemsPerPage={itemsPerPage}
                    />
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
                            <form onSubmit={handleSubmit(saveItem)}>
                                <div className="row">
                                    <div className="custom-style col-lg-6">Họ tên: {selected?.fullName}</div>
                                    <div className="custom-style col-lg-6">
                                        Ngày đặt hàng: {formattedDate(selected?.createAt)}
                                    </div>
                                    <div className="custom-style col-lg-6">Số điện thoại: {selected?.phone}</div>
                                    <div className="custom-style col-lg-6">Địa chỉ: {selected?.address}</div>

                                    {/* Trạng thái */}
                                    <div className="col-lg-6">
                                        <div className="row align-items-center">
                                            <input type="hidden" value={selected?.id} {...register("id")} />
                                            <div className="col-4">
                                                <label htmlFor="status" className="mb-0 custom-style">
                                                    Trạng thái
                                                </label>
                                            </div>

                                            <div className="col-8">
                                                <select
                                                    id="status"
                                                    {...register("status")}
                                                    className="form-control custom-style"
                                                >
                                                    {order_Status.map((status, index) => (
                                                        <option key={index} value={status?.id} selected={status?.id === selected?.orderStatus?.id}>
                                                            {status?.status}

                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                    </div>
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
                                    <button type="submit" className="btn btn-primary">
                                        Lưu
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderedManagement;
