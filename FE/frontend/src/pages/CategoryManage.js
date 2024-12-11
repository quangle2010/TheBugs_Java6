import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { openModal, closeModal } from "../utils/Modal";
import Pagination from "../pagination/pagination";
import CategoryTable from "../components/category/CategoryTable";
import SaveModal from "../components/category/SaveModal";
import DeleteModal from "../components/DeleteModal";
import Cookies from 'js-cookie';
import { showErrorToast, showSuccessToast } from "../utils/Toast";
import { Spinner } from "react-bootstrap";

const CategoryManagement = () => {
    const namePage = "Danh sách loại sản phẩm";
    const BASE_URL = "http://localhost:8080/admin/api/categories";
    const [selected, setSelected] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchItems, setSearchItems] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const token = Cookies.get('JWT_TOKEN');

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            if (token) {
                const response = await axios.get(`${BASE_URL}/list`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data.data || [];
                setItems(data);
                setFilteredItems(data);
            } else {
                console.error("Không tìm thấy token");
            }
        } catch (error) {
            console.error("Lỗi đỗ dữ liệu categories:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchItems();
    }, [token]);

    useEffect(() => {
        const filtered = items.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchItems.toLowerCase());
            const matchesStatus = statusFilter === '' || item.active === (statusFilter === 'true');
            return matchesSearch && matchesStatus;
        });
        setFilteredItems(filtered);
        setCurrentPage(1);
    }, [items, searchItems, statusFilter]);
    const handleSearchChange = (e) => {
        setSearchItems(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const saveItem = async (data) => {
        try {
            if (token) {
                const payload = selected ? { ...data, id: selected.id } : data;
                const response = await axios.post(`${BASE_URL}/save`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.status === true) {
                    showSuccessToast(response.data.message);
                    setSelected(null);
                    closeModal("saveModal");
                    fetchItems();
                }
            } else {
                console.error("Không tìm thấy token");
            }
        } catch (err) {
            console.error("Lỗi lưu category:", err);
            if (err.response) {
                const errorMessage = err.response.data.message || "Có lỗi xảy ra. Vui lòng thử lại.";
                showErrorToast(errorMessage);
            } else {
                showErrorToast("Không thể kết nối tới server");
            }
        }
    };

    const deleteItem = async () => {
        if (!selected) return;

        try {
            const response = await axios.post(`${BASE_URL}/delete?id=${selected?.id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.status === true) {
                showSuccessToast(response.data.message);
                setSelected(null);
                fetchItems();
                closeModal("delete");
            }
        } catch (err) {
            console.error("Error deleting item:", err);
            if (err.response) {
                const errorMessage = err.response.data.message || "Có lỗi xảy ra. Vui lòng thử lại.";
                showErrorToast(errorMessage);
            } else {
                showErrorToast("Không thể kết nối tới server");
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
                    {
                        loading ? (
                            <div className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <div>
                                <div className="table-responsive">
                                    <div className="table-wrapper">
                                        <div className="table-title d-flex justify-content-between align-items-center" style={{ background: "#f195b2" }}>
                                            <h2>Danh sách</h2>
                                            <div className="filter">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={searchItems}
                                                    onChange={handleSearchChange}
                                                    placeholder="Nhập chữ cái để lọc"
                                                />
                                            </div>
                                            <div>
                                                <select class="form-select"
                                                    onChange={handleStatusChange} value={statusFilter}>
                                                    <option value="">Chọn trạng thái...</option>
                                                    <option value="true">Còn hoạt động</option>
                                                    <option value="false">Ngừng hoạt động</option>
                                                </select>
                                            </div>
                                            <div>
                                                <button

                                                    className="btn btn-primary mr-2"
                                                    onClick={() => {
                                                        setSelected(null);
                                                        openModal("saveModal");
                                                    }}
                                                >
                                                    Thêm
                                                </button>

                                            </div>
                                        </div>
                                        <CategoryTable
                                            items={currentItems}
                                            onEdit={(item) => {
                                                console.log(item);
                                                setSelected(item);
                                                openModal("saveModal");

                                            }}
                                            onDelete={(item) => {
                                                setSelected(item);
                                                openModal("delete");
                                            }}
                                        />
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
                        )
                    }

                </div>
            </div>

            <SaveModal selected={selected} onSubmit={saveItem} />
            <DeleteModal selected={selected} onDelete={deleteItem} />
        </>
    );
};

export default CategoryManagement;
