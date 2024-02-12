const router = require("express").Router();
const { Lift, User } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");

// Route to the home page
router.get("/", async (req, res) => {
   try {
      res.render("home", {
         logged_in: req.session.logged_in,
      });
   } catch (err) {
      res.status(500).json(err);
   }
});

// Route to feed HTML
router.get("/feed", withAuth, async (req, res) => {
   try {
      const liftData = await Lift.findAll({
         include: [
            {
               model: User,
               attributes: ["username"],
            },
         ],
      });

      const lifts = liftData.map((lift) => {
         return lift.get({ plain: true });
      });

      // If you're logged in, the home feed will render the home page and inject liftData
      res.render("feed", {
         lifts,
         logged_in: req.session.logged_in,
      });
   } catch (err) {
      res.status(500).json(err);
   }
});

// Login in route
// If users is logged in, it redirects them to homefeed ('/')
router.get("/login", (req, res) => {
   try {
      if (req.session.logged_in) {
         res.redirect("/");
         return;
      }
      // Else it renders the log in HTML
      res.render("login");
   } catch (err) {
      res.status(404).json(err);
   }
});

router.get("/signup", async (req, res) => {
   try {
      res.render("signup");
   } catch (err) {
      res.status(500).json(err);
   }
});

// Route to get the dashboard of personal lifts
router.get("/dashboard", withAuth, async (req, res) => {
   try {
      const userId = req.session.user_id; // Takes the saved data of the user's session to hold user id

      // liftData finds all data from Lift that matches the userId
      const liftData = await Lift.findAll({
         where: {
            user_id: userId,
         },
      });

      const lifts = liftData.map((lift) => {
         return lift.get({ plain: true });
      });

      // Renders the dashboard view with the user's liftData
      res.render("dashboard", {
         lifts,
         logged_in: req.session.logged_in,
      });
   } catch (err) {
      res.status(500).json(err);
   }
});

//TODO: Add withAuth
router.get("/progress", withAuth, async (req, res) => {
   try {
      const userId = req.session.user_id; // Takes the saved data of the user's session to hold user id

      // liftData finds all data from Lift that matches the userId
      const liftData = await Lift.findAll({
         where: {
            user_id: userId,
         },
      });

      const lifts = liftData.map((lift) => {
         return lift.get({ plain: true });
      });

      // Renders the dashboard view with the user's liftData
      res.render("progress", {
         lifts,
         logged_in: req.session.logged_in,
      });
   } catch (err) {
      res.status(500).json(err);
   }
});

// Route to make a new post
router.get("/newpost", withAuth, async (req, res) => {
   try {
      res.render("newpost", {
         logged_in: req.session.logged_in,
      });
   } catch (err) {
      res.status(500).json(err);
   }
});

module.exports = router;
