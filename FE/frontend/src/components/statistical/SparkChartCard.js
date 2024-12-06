import React from "react";
import Chart from "react-apexcharts";

const SparkChartCard = ({
  id,
  series,
  labels,
  type,
  height,
  title,
  subtitle,
  tooltipFormat,
}) => {
  const chartOptions = {
    chart: {
      id,
      type,
      height,
      sparkline: { enabled: true },
    },
    stroke: { curve: "straight" },
    fill: { opacity: 0.3 },
    xaxis: {
      categories: labels,
      crosshairs: { width: 1 },
    },
    title: {
      text: title,
      offsetX: 0,
      style: { fontSize: "24px" },
    },
    subtitle: {
      text: subtitle,
      offsetX: 0,
      style: { fontSize: "14px" },
    },
    tooltip: {
      x: { format: tooltipFormat },
    },
  };

  return (
    <div className="col-lg-4 mb-4">
      <div className="card shadow border-0">
        <div className="card-body">
          <Chart options={chartOptions} series={series} type={type} height={height} />
        </div>
      </div>
    </div>
  );
};

export default SparkChartCard;
