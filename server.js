const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");

const sess = {
   secret: "Super secret secret",
   cookie: {},  //* need to add timeout
   resave: false,
   saveUninitialized: true,
   store: new SequelizeStore({
      db: sequelize,
   }),
};

//* middleware for sessions
app.use(session(sess));




// const exphbs = require('express-handlebars'); //* to set up handlebars as the app's template engine of choice
// const hbs = exphbs.create({ helpers }); //* pass the helpers to the express handlebars method
// app.engine('handlebars', hbs.engine); //* sets express engine 'handlebars' from handlebars' engine
// app.set('view engine', 'handlebars'); //* sets 'view engine' from app.engine



//* middleware for backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log('Now listening in port: ', PORT));
});