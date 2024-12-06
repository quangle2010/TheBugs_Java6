import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { openModal, closeModal } from "../utils/Modal";
import { toast } from "react-toastify";
import Pagination from "../pagination/pagination";
import SaveModal from "../components/product/SaveModal";
import DeleteModal from "../components/DeleteModal";
import ProductTable from "../components/product/ProductTable";
import Cookies from 'js-cookie';
const ProductsManage = () => {
    const namePage = "Danh sách sản phẩm";
    const BASE_URL = "http://localhost:8080/admin/api/products";

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchItems, setSearchItems] = useState("");
    const [selected, setSelected] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const token = Cookies.get('JWT_TOKEN');
    const fetchItems = async () => {
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
            console.error("Lỗi đỗ dữ liệu products:", error);
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

    const saveItem = async (data) => {
        try {
            const formData = new FormData();

            if (selected && selected.id) {
                formData.append("id", selected.id);
            }
            formData.append("name", data.name);
            formData.append("flavor", data.flavor);
            formData.append("ingredients", data.ingredients);
            formData.append("descriptions", data.descriptions);
            formData.append("price", data.price);
            formData.append("quantity", data.quantity);
            formData.append("active", data.active);
            formData.append("categoryId", data.categoryId);

            if (data.images && data.images.length > 0) {
                for (let i = 0; i < data.images.length; i++) {
                    formData.append("images", data.images[i]);
                }
            }
            console.log(formData);
            const response = await axios.post("http://localhost:8080/admin/api/products/save", formData, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });

            if (response.data.status) {
                toast.success(response.data.message, { position: "top-right", autoClose: 1500 });
                setSelected(null);
                closeModal("saveModal");
                fetchItems();
            }
        } catch (err) {
            console.error("Error saving product:", err);
            const errorMessage = err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
            toast.error(errorMessage, { position: "top-right", autoClose: 2000 });
        }
    };

    const deleteItem = async () => {
        if (!selected) return;

        try {
            await axios.post(`${BASE_URL}/delete?id=${selected?.id}`, null, {
                withCredentials: true,
            });
            toast.success("Xóa thành công!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false
            });
            fetchItems();
            closeModal("delete");
        } catch (err) {
            console.error("Error deleting item:", err);
            toast.error("Xóa thất bại! Vui lòng thử lại.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false
            });
        }
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
                                <div className="filter">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={searchItems}
                                        onChange={handleSearch}
                                        placeholder="Nhập chữ cái để lọc"
                                    />
                                </div>
                                <div>
                                    <button className="btn btn-primary mr-2" onClick={() => { setSelected(null); openModal("saveModal"); }}>Thêm</button>
                                </div>
                            </div>
                            <ProductTable
                                items={currentItems}
                                onEdit={(item) => { setSelected(item); openModal("saveModal"); }}
                                onDelete={(item) => { setSelected(item); openModal("delete"); }}
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
            </div>
            <SaveModal selected={selected} onSubmit={saveItem} />
            <DeleteModal selected={selected} onDelete={deleteItem} />
        </>
    );
};

export default ProductsManage;
