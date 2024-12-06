import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages === 0) return null;

    return (
        <div className="product_pagination pt-3 mt-0">
            <div className="pagination left_btn">
                {currentPage > 1 && (
                    <>
                        <li className="page-item">
                            <a className="page-link" onClick={() => onPageChange(1)}>
                                <i className="bi bi-chevron-bar-left"></i>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                                <i className="bi bi-chevron-double-left"></i>
                            </a>
                        </li>
                    </>
                )}
            </div>
            <div className="middle_list">
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNum = index + 1;
                            return (
                                <li key={pageNum} className={`page-item ${pageNum === currentPage ? "active" : ""}`}>
                                    <a className="page-link" onClick={() => onPageChange(pageNum)}>
                                        {pageNum}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            <div className="pagination right_btn">
                {currentPage < totalPages && (
                    <>
                        <li className="page-item">
                            <a className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                                <i className="bi bi-chevron-double-right"></i>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" onClick={() => onPageChange(totalPages)}>
                                <i className="bi bi-chevron-bar-right"></i>
                            </a>
                        </li>
                    </>
                )}
            </div>
        </div>
    );
};

export default Pagination;
