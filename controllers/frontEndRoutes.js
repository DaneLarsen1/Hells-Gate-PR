const router = require('express').Router();
const { Lift } = require('../models');
const withAuth = require('../utils/auth');

// Route to home feed HTML
router.get('/', withAuth, async (req, res) => { // withAuth checks if user is logged in, if not logged in, withAuth redirects users to log in, if logged in, proceed with function
    try {
        const liftData = await Lift.findAll({
            attributes: { include: ['title', 'description', 'user_id'] },
        });

        // If you're logged in, the home feed will render the home page and inject liftData
        // TODO: change the liftData accordingly to the handlebars view for the homefeed
        res.render('homepage', {
            liftData,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login in route
// If users is logged in, it redirects them to homefeed ('/')
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    // Else it renders the log in HTML
    res.render('login');
});

// Route to get the dashboard of personal lifts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id; // Takes the saved data of the user's session to hold user id

        // liftData finds all data from Lift that matches the userId
        const liftData = await Lift.findAll({ 
            where: {
                user_id: userId,
            },
            //TODO: time constraint
        });

        // Renders the dashboard view with the user's liftData
        //TODO: change the liftData to be relevant to the handlebars view for dashboard
        res.render('dashboard', {
            liftData,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).render('error', `<p>Page Not Found</p>`); // TODO: Render an error message into the handlebars view when created
    }
})

module.exports = router;