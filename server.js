const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
   secret: "Super secret secret",
   cookie: {   //* Added cookie stuff from mini project example Module 14
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
   },
   resave: false,
   saveUninitialized: true,
   store: new SequelizeStore({
      db: sequelize,
   }),
};

//* middleware for sessions
app.use(session(sess));

// const hbs = exphbs.create({ helpers }); //* pass the helpers to the express handlebars method
// app.engine('handlebars', hbs.engine); //* sets express engine 'handlebars' from handlebars' engine
// app.set('view engine', 'handlebars'); //* sets 'view engine' from app.engine

//* middleware for backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log('Now listening in port: ', PORT));
});

app.engine('handlebars', exphbs.engine({
   defaultLayout: 'main', 
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 
 
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/progress', (req, res) => {
   const goalsData = [
       { description: 'Bench Press 300 lbs', percentage: 75 },
       { description: 'Run 5 miles without stopping', percentage: 50 },
   ];
 
   res.render('progress', { goals: goalsData });
});