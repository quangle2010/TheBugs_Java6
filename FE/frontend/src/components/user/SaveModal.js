import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { closeModal } from "../../utils/Modal";

const SaveModal = ({ onSubmit, selected }) => {
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
                email: "",
                name: "",
                phone: "",
                address: "",
                active: "true",
            });
        }
    }, [selected, reset]);

    return (
        <div className="modal fade" id="saveModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="modal-header">
                            <h5 className="modal-title">{selected ? "Sửa" : "Thêm mới"}</h5>
                            <button type="button" className="btn-close" onClick={() => closeModal("saveModal")}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("name", { required: "Tên không được để trống" })}
                                />
                                {errors.name && <small className="text-danger">{errors.name.message}</small>}
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("email", {
                                        required: "Email không được để trống",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Email không hợp lệ"
                                        }
                                    })}
                                />
                                {errors.email && <small className="text-danger">{errors.email.message}</small>}
                            </div>

                            <div className="mb-3">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("phone", {
                                        required: "Phone không được để trống",
                                        maxLength: {
                                            value: 10,
                                            message: "Phone không được quá 10 ký tự"
                                        },
                                        pattern: {
                                            value: /^\d{10}$/,
                                            message: "Số điện thoại phải là 10 chữ số"
                                        }
                                    })}
                                />
                                {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
                            </div>

                            <div className="mb-3">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("address", { required: "Tên không được để trống" })}
                                />
                                {errors.address && <small className="text-danger">{errors.address.message}</small>}
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
