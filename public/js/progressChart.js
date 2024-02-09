// //* CONFIG
// // const config = {
// //    type: "line",
// //    data: data,
// // };

// //* SETUP
// // const labels = Utils.months({ count: 12 });
// // const data = {
// //    labels: labels,
// //    datasets: [
// //       {
// //          label: "Squat",
// //          data: [65, 59, 80, 81, 56, 55, 40, 35, 60, 78, 38, 89],
// //          fill: false,
// //          borderColor: "rgb(75, 192, 192)",
// //          tension: 0.1,
// //       },
// //       {
// //          label: "Deadlift",
// //          data: [35, 29, 40, 61, 16, 95, 80, 60, 25, 38, 78, 98],
// //          fill: false,
// //          borderColor: "rgb(106, 137, 233)",
// //          tension: 0.1,
// //       },
// //       {
// //          label: "Bench",
// //          data: [15, 47, 29, 87, 48, 100, 60, 38, 60, 25, 49, 72],
// //          fill: false,
// //          borderColor: "rgb(228, 34, 160)",
// //       },
// //    ],
// // };

// //* GITHUB EXAMPLE
// // <block:setup:1>
// // const labels = Utils.months({count: 7});
// // const data = {
// //   labels: labels,
// //   datasets: [{
// //     label: 'My First Dataset',
// //     data: [65, 59, 80, 81, 56, 55, 40],
// //     fill: false,
// //     borderColor: 'rgb(75, 192, 192)',
// //     tension: 0.1
// //   }]
// // };
// // </block:setup>

// // <block:config:0>
// // const config = {
// //   type: 'line',
// //   data: data,
// // };
// // </block:config>

// // module.exports = {
// //   actions: [],
// //   config: config,
// // };

// // Function to create line chart
// async function createLineChart() {
//    const data = await Lift.findAll({
//       where: {
//          user_id: userId,
//       },
//       attributes: ["id", "title", "description", "user_id"],
//    });
//    const ctx = document.getElementById("myChart").getContext("2d");
//    const myChart = new Chart(ctx, {
//       type: "line",
//       data: {
//          labels: data.labels,
//          datasets: [
//             {
//                label: "My Dataset",
//                data: data.data,
//                borderColor: "rgb(75, 192, 192)",
//                borderWidth: 1,
//                fill: false,
//             },
//          ],
//       },
//       options: {
//          scales: {
//             y: {
//                beginAtZero: true,
//             },
//          },
//       },
//    });
// }

// // Call the function to create the chart
// createLineChart();
