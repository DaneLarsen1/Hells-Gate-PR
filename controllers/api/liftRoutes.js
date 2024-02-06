const router = require('express').Router();
const { Lift } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// Gets logged in user's lifts only
// TODO: Add withAuth
router.get('/userLifts', async (req, res) => {
    try {
        const userId = req.session.user_id; // Stores the user's id in userId

        // findAll Lift where user id matches the logged in user
        const liftData = await Lift.findAll({
            where: {
                user_id: userId,
            },
        });

        // Returns json of liftData to be used where it's rendered (in the public js)
        res.status(200).json(liftData)

    } catch (err) {
        res.status(500).json(err); // TODO: Render an error message into the handlebars view when created
    }
});

// Create a new lift 
router.post('/userLifts', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;

        const liftData = await Lift.create({
            title: req.body.title,
            description: req.body.description,
            user_id: userId,
        });

        res.status(200).json(liftData)  //* render from frontEndRoutes
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;