document.addEventListener("DOMContentLoaded", async function () {
   //    const labels = Utils.months({ count: 12 });
   const strengthData = await Lift.findAll({
      where: { user_id: userId },
      attributes: ["id", "title", "description", "squat", "bench", "deadlift", "user_id"],
   });
   console.log("strengthData:", strengthData);

   const strengthChartCtx = document.getElementById("strength-chart").getContext("2d");
   const strengthChart = new Chart(strengthChartCtx, {
      type: "line",
      data: {
         labels: ["Jan", "Feb", "Mar"],
         datasets: [
            {
               label: "Max Squat",
               data: strengthData.squat,
               fill: false,
               borderColor: "rgb(75, 192, 192)",
               tension: 0.1,
            },
         ],
      },
      // {
      //    label: "Max Deadlift",
      //    data: strengthData.data,
      //    borderColor: "rgb(255, 99, 132)",
      //    tension: 0.1,
      //    fill: false,
      // },
      // {
      //    label: "Max Squat",
      //    data: strengthData.data,
      //    borderColor: "rgb(54, 162, 235)",
      //    tension: 0.1,
      //    fill: false,
      // },
      options: {
         scales: {
            y: {
               beginAtZero: true,
            },
         },
      },
   });
});

// Function to fetch data from the server
async function fetchDataFromServer() {
   try {
      const response = await fetch("/api/lift/userLifts"); // Replace '/api/data' with your server endpoint
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching data:", error);
   }
}

// Function to create line chart
async function createLineChart() {
   const data = await fetchDataFromServer();
   const ctx = document.getElementById("myChart").getContext("2d");
   const myChart = new Chart(ctx, {
      type: "line",
      data: {
         labels: data.labels,
         datasets: [
            {
               label: "My Dataset",
               data: data.data,
               borderColor: "rgb(75, 192, 192)",
               borderWidth: 1,
               fill: false,
            },
         ],
      },
      options: {
         scales: {
            y: {
               beginAtZero: true,
            },
         },
      },
   });
}
