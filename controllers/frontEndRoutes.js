const router = require("express").Router();
const { Lift, User } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", async (req, res) => {
   try {
      res.render("home")
   } catch (err) {
      res.status(500).json(err);
   }
});

// Route to home feed HTML
router.get("/feed", async (req, res) => {
   // TODO: ADD withAuth - withAuth checks if user is logged in, if not logged in, withAuth redirects users to log in, if logged in, proceed with function
   try {
      const liftData = await Lift.findAll({
         include: [
            {
               model: User,
               attributes: ["username"],
            },
         ],
      });

      // const lifts = liftData.map((lift) => lift.get({ plain: true }));

      const lifts = liftData.map((lift) => {
         return lift.get({plain: true})
      });
      // If you're logged in, the home feed will render the home page and inject liftData
      // TODO: change the liftData accordingly to the handlebars view for the homefeed
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

// Route to get the dashboard of personal lifts
//TODO: ADD withAuth
router.get("/dashboard", async (req, res) => {
   try {
      const userId = req.session.user_id; // Takes the saved data of the user's session to hold user id

      // liftData finds all data from Lift that matches the userId
      const liftData = await Lift.findAll({
         where: {
            user_id: userId,
         },
         //TODO: time constraint
      });

      const lifts = liftData.map((lift) => {
         return lift.get({plain: true})
      });
      // const lifts = liftData.map((lift) => lift.get({ plain: true }));
      // console.log(lifts);

      // Renders the dashboard view with the user's liftData
      //TODO: change the liftData to be relevant to the handlebars view for dashboard
      // Should it be an object like {liftData}
      res.render("dashboard", {
         lifts,
         logged_in: req.session.logged_in,
      });
   } catch (err) {
      res.status(500).json(err); // TODO: Render an error page into the handlebars view when created
   }
});

module.exports = router;
