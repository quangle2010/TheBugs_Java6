import { format } from "date-fns";
import numeral from "numeral";
import React from "react";
const CartTable = ({ items, onEdit}) => {
    const formattedDate = (date) => {
        if (date && !isNaN(new Date(date))) {
            return format(new Date(date), 'dd/MM/yyyy');
        }
        return '';
    };
    const formatCurrency = (amount) => {
        return `${numeral(amount).format('0,0')} VND`;
    };
    <div className="container">
        <div className="table-responsive m-4">
            <table className="table" style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th scope="col">Tên Người nhận</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Ngày đặt hàng</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Tổng Tiền</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        return(
                            <tr key={index}>
                            <td>{item.fullName}</td>
                            <td>{item.phone}</td>
                            <td>{formattedDate(item?.createAt)}</td>
                            <td>{item.orderStatus.status}</td>
                            <td>{formatCurrency(item?.price)} VND</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => onEdit(item)}
                                >
                                    chi tiết
                                </button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </div>
    </div>
}

export default CartTable;
