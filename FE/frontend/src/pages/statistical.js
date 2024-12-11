import React, { useState, useEffect } from "react";
import SparkChartCard from "../components/statistical/SparkChartCard";
import SoldProductsChart from "../components/statistical/CollumnChart";
import axios from "axios";
import Cookies from "js-cookie";

const StatisticsPage = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const API_revenue = "http://localhost:8080/admin/api/statistical-revenue";
    const API_orders_failure =
        "http://localhost:8080/admin/api/statistical-failure-orders";
    const API_orders_success =
        "http://localhost:8080/admin/api/statistical-success-orders";
    const API_sold_products =
        "http://localhost:8080/admin/api/statistical-sold-product";

    const token = Cookies.get("JWT_TOKEN");

    const [data, setData] = useState({
        revenue: [],
        successOrders: [],
        failureOrders: [],
        soldProducts: [],
    });
    const [sparkChartsData, setSparkChartsData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (startDate, endDate) => {
        try {
            const [
                revenueResponse,
                soldProductsResponse,
                failureOrdersResponse,
                successOrdersResponse,
            ] = await Promise.all([
                axios.get(`${API_revenue}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        startDate: startDate,
                        endDate: endDate,
                    },
                }),
                axios.get(API_sold_products, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        startDate: startDate,
                        endDate: endDate,
                    },
                }),
                axios.get(API_orders_failure, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        startDate: startDate,
                        endDate: endDate,
                    },
                }),
                axios.get(API_orders_success, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        startDate: startDate,
                        endDate: endDate,
                    },
                }),
            ]);

            groupAllData(
                revenueResponse.data.data.statistical,
                successOrdersResponse.data.data.statistical,
                failureOrdersResponse.data.data.statistical,
                soldProductsResponse.data.data.statistical
            );

            setSparkChartsData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(startDate, endDate);
        console.log(data);
    };
    const groupAllData = (
        revenue,
        successOrders,
        failureOrders,
        soldProducts
    ) => {
        setData({
            revenue: groupData(revenue),
            successOrders: groupData(successOrders),
            failureOrders: groupData(failureOrders),
            soldProducts: groupData(soldProducts),
        });
    };

    const groupData = (dataO) => {
        if (!Array.isArray(dataO) || dataO.length === 0) {
            return {
                date: [],
                values: 0,
                total: 0,
                details: [],
            };
        }
        return {
            date: dataO.map((item) => {
                const date = new Date(item.create_at);
                return date.toISOString().split("T")[0]; // Chỉ lấy phần ngày (YYYY-MM-DD)
            }),
            values: dataO.map((item) => item.total),
            total: dataO.reduce((sum, item) => sum + item.total, 0),
            details: dataO.map((item) => item.details),
        };
    };
    return (
        <>
            <div className="container-fluid">
                <div
                    className="table-title py-3"
                    style={{ background: "#f195b2" }}
                >
                    <h2>Thống kê</h2>
                </div>

                {/* Filter Form */}
                <div className="card shadow m-3">
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        Ngày bắt đầu
                                    </span>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) =>
                                            setStartDate(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        Ngày kết thúc
                                    </span>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) =>
                                            setEndDate(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4 d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary pink_btn"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Chart Components */}
                <div className="card shadow m-3 border-0">
                    <div className="row p-3">
                        <SparkChartCard
                            id="sparkRevenue"
                            series={[
                                {
                                    id: "sparkRevenue",
                                    name: "Doanh thu",
                                    data:

                                        Array.isArray(
                                            sparkChartsData.revenue?.values
                                        )
                                            ? sparkChartsData.revenue.values
                                            : [],
                                },
                            ]}
                            labels={sparkChartsData.revenue?.date || []} // Sử dụng toán tử optional chaining
                            title={
                                sparkChartsData.revenue?.total?.toString() ||
                                "0"
                            } // Kiểm tra và gán giá trị mặc định
                            subtitle="Doanh thu"
                            type="area"
                            height={160}
                            tooltipFormat="dd/MM/yyyy"
                        />
                        <SparkChartCard
                            id="sparkSuccessOrders"
                            series={[
                                {
                                    id: "sparkSuccessOrders",
                                    name: "Số lượng",
                                    data: Array.isArray(
                                        sparkChartsData.successOrders?.values
                                    )
                                        ? sparkChartsData.successOrders.values
                                        : [],
                                },
                            ]}
                            labels={sparkChartsData.successOrders?.date || []} // Sử dụng toán tử optional chaining
                            title={
                                sparkChartsData.successOrders?.total?.toString() ||
                                "0"
                            } // Kiểm tra và gán giá trị mặc định
                            subtitle="Đơn hàng thành công"
                            type="area"
                            height={160}
                            tooltipFormat="dd/MM/yyyy"
                        />
                        <SparkChartCard
                            id="sparkFailure"
                            series={[
                                {
                                    id: "sparkFailure",
                                    name: "Thất bại",
                                    data: Array.isArray(
                                        sparkChartsData.failureOrders?.values
                                    )
                                        ? sparkChartsData.failureOrders.values
                                        : [],
                                },
                            ]}
                            labels={sparkChartsData.failureOrders?.date || []} // Sử dụng toán tử optional chaining
                            title={
                                sparkChartsData.failureOrders?.total?.toString() ||
                                "0"
                            } // Kiểm tra và gán giá trị mặc định
                            subtitle="Đơn hàng thất bại"
                            type="area"
                            height={160}
                            tooltipFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>
            </div>
            <div className="card shadow m-3 border-0">
                <div className="p-3">
                    <SoldProductsChart
                        soldProductEachDay={
                            Array.isArray(sparkChartsData.soldProducts?.values)
                                ? sparkChartsData.soldProducts?.values
                                : []
                        }
                        soldProductDate={
                            Array.isArray(sparkChartsData.soldProducts?.date)
                                ? sparkChartsData.soldProducts?.date
                                : []
                        }
                        soldProductDescription={
                            Array.isArray(sparkChartsData.soldProducts?.details)
                                ? sparkChartsData.soldProducts?.details
                                : []
                        }
                        maxHeight={sparkChartsData.soldProducts?.total || 0}
                    />

                </div>
            </div>
        </>
    );
};

export default StatisticsPage;
