import React from "react";

const UserTable = ({ items, onEdit, onDelete }) => (
    <table className="table table-hover mb-3 text-center">
        <thead>
            <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Roles</th>
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
                            <td >{item?.email}</td>
                            <td >{item?.phone}</td>
                            <td >{item?.roles ? "Admin" : "User"}</td>
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

export default UserTable;
