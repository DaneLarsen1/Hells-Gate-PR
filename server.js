const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
   secret: "Super secret secret",
   cookie: {   //* Added cookie stuff from mini project example Module 14
      maxAge: 3600000,
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

app.engine('handlebars', exphbs.engine({
   defaultLayout: 'main',
   helpers: helpers, 
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

//* middleware for backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log('Now listening in port: ', PORT));
});
