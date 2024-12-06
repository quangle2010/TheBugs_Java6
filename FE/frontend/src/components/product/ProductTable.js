import React from "react";

const ProductTable = ({ items, onEdit, onDelete }) => (
    <table className="table table-hover mb-3 text-center">
        <thead>
            <tr>
                <th>Tên</th>            
                <th>Thành phần</th>
                <th>Giá sản phẩm</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                items.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td >{item?.name}</td>
                            <td >{item?.ingredients}</td>
                            <td >{item?.price}</td>
                            <td >{item?.quantity}</td>
                            <td >{item?.active ? "Đang hoạt động" : "Ngừng hoạt động"}</td>
                            <td>
                                <button
                                    className="btn btn-primary mr-2"
                                    onClick={() => onEdit(item)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onDelete(item)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
);

export default ProductTable;
