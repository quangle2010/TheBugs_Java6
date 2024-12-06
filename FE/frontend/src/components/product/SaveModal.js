import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { closeModal } from "../../utils/Modal";
import axios from "axios";
import Cookies from 'js-cookie';
import { showErrorToast } from "../../utils/Toast";
const SaveModal = ({ onSubmit, selected }) => {

    const BASE_URL = "http://localhost:8080/admin/api/categories";
    const token = Cookies.get('JWT_TOKEN');
    const [items, setItems] = useState([]);
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
            const data = response.data.data || [];
            setItems(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
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

    useEffect(() => {
        if (selected) {
            reset(selected);
        } else {
            reset({
                name: "",
                ingredients: "",
                flavor: "",
                price: "",
                quantity: "",
                descriptions: "",
                active: "true",
                categoryId: 1,
                images: [],
            });
        }
    }, [selected, reset]);

    return (
        <div className="modal fade" id="saveModal" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div className="modal-header">
                            <h5 className="modal-title">{selected ? "Sửa" : "Thêm mới"}</h5>
                            <button type="button" className="btn-close" onClick={() => closeModal("saveModal")}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="name">Tên sản phẩm</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            {...register("name", { required: "Tên không được để trống" })}
                                        />
                                        {errors.name && <small className="text-danger">{errors.name.message}</small>}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="ingredients">Thành phần</label>
                                        <input
                                            type="text"
                                            id="ingredients"
                                            className="form-control"
                                            {...register("ingredients", { required: "Thành phần không được để trống" })}
                                        />
                                        {errors.ingredients && <small className="text-danger">{errors.ingredients.message}</small>}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="flavor">Hương vị</label>
                                        <input
                                            type="text"
                                            id="flavor"
                                            className="form-control"
                                            {...register("flavor", { required: "Hương vị không được để trống" })}
                                        />
                                        {errors.flavor && <small className="text-danger">{errors.flavor.message}</small>}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="price">Giá sản phẩm</label>
                                        <input
                                            type="number"
                                            id="price"
                                            className="form-control"
                                            {...register("price", {
                                                required: "Giá  không được để trống",
                                            })}
                                        />
                                        {errors.price && <small className="text-danger">{errors.price.message}</small>}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="quantity">Giá sản phẩm</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            className="form-control"
                                            {...register("quantity", {
                                                required: "Số lượng không được để trống",
                                            })}
                                        />
                                        {errors.price && <small className="text-danger">{errors.price.message}</small>}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="images">Hình</label>
                                        <input
                                            type="file"
                                            id="images"
                                            className="form-control"
                                            {...register("images", { required: "Hình không được để trống" })}
                                            multiple
                                        />
                                        {errors.images && <small className="text-danger">{errors.images.message}</small>}
                                    </div>

                                </div>
                                <div className="col-lg-6">

                                    <div>
                                        <label>Loại sản phẩm</label>
                                        <select
                                            className="form-select"
                                            id="category"
                                            {...register("categoryId", {
                                                required: "Hình không được để trống",
                                            })}
                                        >
                                            {items?.map((item, index) => (
                                                <option key={index} value={item.id}>
                                                    {item?.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {selected?.id && (
                                <div className="mb-3">
                                    <label>Trạng thái</label>
                                    <select className="form-control" {...register("active")}>
                                        <option value={true}>Đang hoạt động</option>
                                        <option value={false}>Ngừng hoạt động</option>
                                    </select>
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor="descriptions" className="form-label">Mô tả</label>
                                <textarea
                                    className="form-control"
                                    id="descriptions"
                                    rows="2"
                                    {...register("descriptions", {
                                        required: "Địa chỉ không được bỏ trống"
                                    })}
                                ></textarea>
                                {errors.descriptions && (
                                    <small className="form-text text-muted">{errors.descriptions.message}</small>
                                )}
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SaveModal;
