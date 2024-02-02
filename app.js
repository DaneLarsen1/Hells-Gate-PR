const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const PORT = 3000;

// Set up the Handlebars engine with the default layout set to 'main'
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route for the homepage
app.get('/', (req, res) => {
    // Render the 'home' template with a context object for dynamic data
    res.render('home', {
        title: 'Hells-Gate-PR', // This title is used in the main layout
        // Other dynamic data can be passed here if needed
    });
});

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

