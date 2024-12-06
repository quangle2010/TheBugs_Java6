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
                name: "",
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
                                <label>Tên loại sản phẩm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("name", { required: "Tên không được để trống" })}
                                />
                                {errors.name && <small className="text-danger">{errors.name.message}</small>}
                            </div>
                            {selected?.id && (
                                <div className="mb-3">
                                    <label>Trạng thái</label>
                                    <select className="form-control" {...register("active")}>
                                        <option value={true} selected={selected?.active === true}>
                                            Đang hoạt động
                                        </option>
                                        <option value={false} selected={selected?.active === false}>
                                            Ngừng hoạt động
                                        </option>
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
