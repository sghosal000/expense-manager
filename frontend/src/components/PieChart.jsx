import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { pieData } from "../Fake_data2";


const PieChart = ( {pieChartData }) => {
  const chartRef = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    if (pieChartData) {
      const data = {
        labels: pieChartData.label,
        datasets: [
          {
            label: "Total Income",
            data: pieChartData.data,
            backgroundColor: [
              "rgb(255, 99, 132)", // Red for expenditure
              "rgb(121, 222, 67)",  // Green for savings/investment
            ],
            hoverOffset: 4,
          },
        ],
      };

      // Options for the pie chart
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function (
                previousValue,
                currentValue,
                currentIndex,
                array
              ) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = Math.floor((currentValue / total) * 100 + 0.5);
              return percentage + "% (" + currentValue + ")";
            },
          },
        },
      };

      // Get the chart canvas element
      const ctx = document.getElementById("pieChart");

      // Destroy the existing chart instance if it exists
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }

      // Create the pie chart
      chartRef.current = new Chart(ctx, {
        data: data,
        options: options,
        type: "doughnut",
      });

      // Clean up function to destroy the chart instance on component unmount
      return () => {
        if (chartRef.current !== null) {
          chartRef.current.destroy();
        }
      };
    }
  }, [pieChartData]);

  return (
    <div
      className="shadow border rounded p-2 d-flex justify-content-center align-items-center"
      style={{ height: "100%", width: "100%" }}
    >
      {pieChartData ? (
        <canvas id="pieChart"></canvas>
      ) : (
        <div>
          <h5 className="text-uppercase fw-bold text-muted ">
            Zero Sales So Far
          </h5>
        </div>
      )}
    </div>
  );
};

export default PieChart;