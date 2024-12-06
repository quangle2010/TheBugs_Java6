import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, totalElements, itemsPerPage }) => {
    if (totalPages === 0) return null;

    const visiblePages = getVisiblePages(currentPage, totalPages);
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalElements);
    return (
        <>
            <div className="page-status d-flex justify-content-end">
                <span>
                    Đang hiển thị {start}-{end} của {totalElements} kết quả
                </span>
            </div>
            <div className="product_pagination pt-3 mt-0">
                <div className="middle_list">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'd-none' : ''}`}>
                                <a className="page-link" onClick={() => onPageChange(1)}>
                                    <i className="p-0 bi bi-chevron-bar-left"></i>
                                </a>
                            </li>
                            <li className={`page-item ${currentPage === 1 ? 'd-none' : ''}`}>
                                <a className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                                    <i className="p-0 bi bi-chevron-double-left"></i>
                                </a>
                            </li>
                            {visiblePages.map((page, index) =>
                                page === "..." ? (
                                    <li key={`ellipsis-${index}`} className="page-item disabled">
                                        <a className="page-link" href="#">...</a>
                                    </li>
                                ) : (
                                    <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                        <a
                                            className="page-link"
                                            onClick={() => onPageChange(page)}
                                        >
                                            {page}
                                        </a>
                                    </li>
                                )
                            )}
                            <li className={`page-item ${currentPage === totalPages ? 'd-none' : ''}`}>
                                <a className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                                    <i className="p-0 bi bi-chevron-double-right"></i>
                                </a>
                            </li>
                            <li className={`page-item ${currentPage === totalPages ? 'd-none' : ''}`}>
                                <a className="page-link" onClick={() => onPageChange(totalPages)}>
                                    <i className="p-0 bi bi-chevron-bar-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>

        </>
    );
};

const getVisiblePages = (currentPage, totalPages) => {
    const maxVisible = 4;
    const pages = [];

    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        if (startPage > 2) {
            pages.push("...");
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1) {
            pages.push("...");
        }
        pages.push(totalPages);
    }

    return pages;
};


export default Pagination;
