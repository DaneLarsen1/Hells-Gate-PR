const withAuth = (req, res, next) => {
   if (!req.session.logged_in) {
      res.redirect("/login"); //*fixed path its not from root
   } else {
      next();
   }
};

module.exports = withAuth;
