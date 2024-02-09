document.addEventListener("DOMContentLoaded", async function () {
   const labels = Utils.months({ count: 12 });
   const strengthData = await Lift.findAll({
      where: { user_id: userId },
      attributes: ["id", "title", "description", "user_id"],
   });

   const strengthChartCtx = document.getElementById("strength-chart").getContext("2d");
   const strengthChart = new Chart(strengthChartCtx, {
      type: "line",
      data: {
         labels: strengthData.data,
         datasets: [
            {
               label: "Max Bench Press",
               data: strengthData.data,
               fill: false,
               borderColor: "rgb(75, 192, 192)",
               tension: 0.1,
            },
            {
               label: "Max Deadlift",
               data: strengthData.data,
               borderColor: "rgb(255, 99, 132)",
               tension: 0.1,
               fill: false,
            },
            {
               label: "Max Squat",
               data: strengthData.data,
               borderColor: "rgb(54, 162, 235)",
               tension: 0.1,
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

   // const enduranceData = {
   //     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
   //     datasets: [{
   //         label: 'Running Distance',
   //         data: [2, 2.5, 3, 3.5],
   //         fill: true,
   //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
   //         borderColor: 'rgb(75, 192, 192)',
   //         tension: 0.1
   //     }]
   // };

   const enduranceChartCtx = document.getElementById("endurance-chart").getContext("2d");
   const enduranceChart = new Chart(enduranceChartCtx, {
      type: "line",
      data: enduranceData,
      options: {
         scales: {
            y: {
               beginAtZero: true,
            },
         },
      },
   });
});

app.get("/progress", (req, res) => {
   const goalsData = [
      { description: "Bench Press 300 lbs", percentage: 75 }, // Add percentage value
      { description: "Run 5 miles without stopping", percentage: 50 }, // Add percentage value
   ];

   res.render("progress", {
      goals: goalsData,
   });
});

document.getElementById("goalsButton").addEventListener("click", function () {
   showGoalOptions();
});

function showGoalOptions() {
   // Check if a modal already exists, if so, remove it
   const existingModal = document.querySelector(".goal-options-modal");
   if (existingModal) {
      existingModal.remove();
   }

   // Create a new modal element
   const modal = document.createElement("div");
   modal.className = "goal-options-modal";

   // Add goal options to the modal
   const goals = ["Stronger Bench", "Stronger Deadlift", "Run Faster"];
   goals.forEach((goal) => {
      const goalButton = document.createElement("button");
      goalButton.innerText = goal;
      goalButton.addEventListener("click", function () {
         // Here you can link to resources or handle the choice
         window.location.href = "/resource/" + goal.replace(" ", "-").toLowerCase();
      });
      modal.appendChild(goalButton);
   });

   // Append the modal to the body or a specific div
   document.body.appendChild(modal);
}
