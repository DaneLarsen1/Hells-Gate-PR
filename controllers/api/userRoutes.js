const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/connection');

// Create new user
router.post('/signup', async (req, res) => {
    try {
        // Hashes the password via bcrypt to protect the user data

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Creates new user using the inputs in the HTML body 
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword, // Stores the hashed password to the database
        });

        const serializedUserData = userData.get({ plain: true });

        console.log(serializedUserData)

        // Saves the current session 
        req.session.save(() => {
            req.session.user_id = serializedUserData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Log in existing user (creating new session)
router.post('/login', async (req, res) => {
    try {
        // Looks for a user that matches the email input of the HTML body
        const userData = await User.findOne({
            where: { email: req.body.email },
            attributes: ['id', 'username', 'email', 'password']
        });
        
        // If the email is not found, send error
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const serializedUserData = userData.get({ plain: true });
        console.log(serializedUserData)
        // bcrypt compares the user's password input with the hashed password that was saved as if it wasn't hashed
        const validPassword = await bcrypt.compare(
            req.body.password,
            serializedUserData.password, // Hashed password
        );

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        };

        req.session.save(() => {
            req.session.user_id = serializedUserData.id;
            req.session.logged_in = true;

            const responseData = {
                user: {
                    id: serializedUserData.id,
                    username: serializedUserData.username,
                    email: serializedUserData.email
                },
                message: 'Logged in successfully'
            };

            res.json(responseData);
        });


    } catch (err) {
        res.status(400).json(err);
    }
});

// Log out
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;