import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { pieData, amountByType } from "./Fake_data2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'


const PieChart = ({ pieChartData }) => {
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

ChartJS.register(ArcElement, Tooltip, Legend)
const DoughnutChart = ({ amountByType }) => {
	// https://www.learnui.design/tools/data-color-picker.html
	// const colors = [
	// 	"#003f5c",
	// 	"#2f4b7c",
	// 	"#665191",
	// 	"#a05195",
	// 	"#d45087",
	// 	"#f95d6a",
	// 	"#ff7c43",
	// 	"#ffa600",
	// ]
	// const colors = [
	// 	"#004c6d",
	// 	"#255e7e",
	// 	"#3d708f",
	// 	"#5383a1",
	// 	"#6996b3",
	// 	"#7faac6",
	// 	"#94bed9",
	// 	"#abd2ec",
	// 	"#c1e7ff",
	// ]
	const colors = [
		"#00876c",
		"#459a82",
		"#6cad99",
		"#90c0b0",
		"#b3d3c8",
		"#d6e6e0",
		"#f9f9f9",
		"#f9dbdb",
		"#f5bebd",
		"#f0a0a1",
		"#e98285",
		"#df626a",
		"#d43d51",
	]

	const options = {
		maintainAspectRatio: false,
		// animation
	}

	const data = {
		labels: Object.keys(amountByType),
		datasets: [
			{
				label: 'Amount spent',
				data: Object.values(amountByType),
				backgroundColor: colors,
				// borderColor: [
				//   'rgba(255, 99, 132, 1)',
				//   'rgba(54, 162, 235, 1)',
				//   'rgba(255, 206, 86, 1)',
				//   'rgba(75, 192, 192, 1)',
				//   'rgba(153, 102, 255, 1)',
				//   'rgba(255, 159, 64, 1)',
				// ],
				borderWidth: 0,
			},
		],
	}
	return <Doughnut options={options} data={data} />
}

export default DoughnutChart;