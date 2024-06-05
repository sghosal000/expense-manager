import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import { lineChartData } from './FAKE_DATA';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({ data }) {
	// const animation = {
	// 	x: {
	// 		type: 'number',
	// 		easing: 'linear',
	// 		duration: 100,
	// 		from: NaN, // the point is initially skipped
	// 		delay(ctx) {
	// 			if (ctx.type !== 'data' || ctx.xStarted) {
	// 				return 0;
	// 			}
	// 			ctx.xStarted = true;
	// 			return ctx.index * delayBetweenPoints;
	// 		}
	// 	},
	// 	y: {
	// 		type: 'number',
	// 		easing: 'linear',
	// 		duration: 100,
	// 		from: previousY,
	// 		delay(ctx) {
	// 			if (ctx.type !== 'data' || ctx.yStarted) {
	// 				return 0;
	// 			}
	// 			ctx.yStarted = true;
	// 			return ctx.index * delayBetweenPoints;
	// 		}
	// 	}
	// };
	const options = {
		maintainAspectRatio: false,
		// animation
	}

	const lineChartData = {
		labels: Object.keys(data),
		datasets: [
			{
				label: "Total Transaction", // Corrected typo here
				data: Object.values(data),
				borderColor: "rgb(75, 192, 192)",
				borderWidth: 1,
				radius: 1,
				tension: 0.3,
			},
		],
	};


	return <Line options={options} data={lineChartData} />;
};
