document.addEventListener('DOMContentLoaded', function() {
    const strengthData = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
            {
            label: 'Max Bench Press',
            data: [200, 205, 210, 215],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: 'Max Deadlift',
            data: [250, 260, 270, 280],
            borderColor: 'rgb(255, 99, 132)', 
            tension: 0.1,
            fill: false
        },
        {
            label: 'Max Squat',
            data: [220, 230, 240, 250], 
            borderColor: 'rgb(54, 162, 235)', 
            tension: 0.1,
            fill: false
        }
        ]
    };

    const enduranceData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Running Distance',
            data: [2, 2.5, 3, 3.5],
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const strengthChartCtx = document.getElementById('strength-chart').getContext('2d');
    const strengthChart = new Chart(strengthChartCtx, {
        type: 'line',
        data: strengthData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const enduranceChartCtx = document.getElementById('endurance-chart').getContext('2d');
    const enduranceChart = new Chart(enduranceChartCtx, {
        type: 'line',
        data: enduranceData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

app.get('/progress', (req, res) => {
   
    const goalsData = [
        { description: 'Bench Press 300 lbs', percentage: 75 }, // Add percentage value
        { description: 'Run 5 miles without stopping', percentage: 50 }, // Add percentage value
    ];
  
    res.render('progress', {
      goals: goalsData,
      
    });
  });

  