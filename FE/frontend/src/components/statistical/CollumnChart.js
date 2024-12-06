import React from "react";
import Chart from "react-apexcharts";

const SoldProductsChart = ({
    soldProductEachDay,
    soldProductDate,
    soldProductDescription,
    maxHeight,
}) => {
    const options = {
        chart: {
            height: 500,
            type: "bar",
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: "top", // top, center, bottom
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, { dataPointIndex }) {
                if (dataPointIndex !== undefined) {
                    return val + " Cái";
                } else {
                    console.error("dataPointIndex is not available");
                    return val; // Hoặc một giá trị mặc định khác
                }
            },
            offsetY: -20,
            style: {
                fontSize: "12px",
                colors: ["#304758"],
            },
        },
        xaxis: {
            categories: soldProductDate,
            position: "top",
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: true,
            },
            labels: {
                style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    colors: ["#304758"],
                },
            },
        },
        yaxis: {
            labels: {
                show: true,
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                offsetY: 0,
                show: false,
                formatter: function (val, index) {
                    let productDetails;
                    if (index != null) {
                        productDetails =
                            soldProductDescription[index.dataPointIndex];
                    } else {
                        productDetails = val;
                    }

                    return productDetails;
                },
            },
            max: maxHeight + 30,
        },
        title: {
            text: "Số sản phẩm đã bán",
            floating: true,
            offsetY: 50,
            align: "center",
            style: {
                color: "#444",
            },
        },
    };

    const series = [
        {
            name: "Sản phẩm đã bán",
            data: soldProductEachDay,
        },
    ];

    return (
        <div className="chart-sold-products">
            <Chart options={options} series={series} type="bar" height={500} />
        </div>
    );
};

export default SoldProductsChart;
