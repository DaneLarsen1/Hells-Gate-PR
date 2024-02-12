const router = require("express").Router();
const { Lift } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

// Gets logged in user's lifts only
router.get("/userLifts", withAuth, async (req, res) => {
   try {
      const userId = req.session.user_id; // Stores the user's id in userId

      // findAll Lift where user id matches the logged in user
      const liftData = await Lift.findAll({
         where: {
            user_id: userId,
         },
      });

      // Returns json of liftData to be used where it's rendered (in the public js)
      res.status(200).json(liftData);
   } catch (err) {
      res.status(500).json(err);
   }
});

// Create a new lift
router.post("/userLifts", withAuth, async (req, res) => {
   try {
      const userId = req.session.user_id;

      let liftData;

      if (req.body.title === "Squat") {
         console.log("Squat");
         liftData = await Lift.create({
            title: req.body.title,
            description: req.body.description,
            user_id: userId,
         });

         liftData.squat = true;
         await liftData.save();
      }

      if (req.body.title === "Bench") {
         liftData = await Lift.create({
            title: req.body.title,
            description: req.body.description,
            bench: true,
            user_id: userId,
         });

         liftData.bench = true;
         await liftData.save();
      }

      if (req.body.title === "Deadlift") {
         liftData = await Lift.create({
            title: req.body.title,
            description: req.body.description,
            deadlift: true,
            user_id: userId,
         });

         liftData.deadlift = true;
         await liftData.save();
      }

      console.log(liftData);
      res.status(200).json(liftData);
   } catch (err) {
      res.status(500).json(err);
   }
});

module.exports = router;
