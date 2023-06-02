// Import necessary modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import routes and helpers
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Import Sequelize connection
const sequelize = require('./config/connection');

// Set up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Create Handlebars engine with helpers
const hbs = exphbs.create({ helpers });

// Configure session options
const sess = {
  secret: 'Super duper secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Set up session middleware
app.use(session(sess));

// Set up Handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use(routes);

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Listening...'));
});
