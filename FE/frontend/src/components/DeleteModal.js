
import React from "react";
import { closeModal } from "../utils/Modal";

const DeleteModal = ({ selected, onDelete }) => (
    <div className="modal fade" id="delete" tabIndex="-1">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Xác nhận xóa</h5>
                    <button type="button" className="btn-close" onClick={() => closeModal("delete")}></button>
                </div>
                <div className="modal-body">
                    <p>Bạn có chắc muốn xóa ?</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => closeModal("delete")}>Hủy</button>
                    <button className="btn btn-danger" onClick={onDelete}>Xóa</button>
                </div>
            </div>
        </div>
    </div>
);

export default DeleteModal;