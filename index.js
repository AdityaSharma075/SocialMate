const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
app.use(
  sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
  })
);

app.use(express.urlencoded());

app.use(cookieParser());
app.use(expressLayouts);

//settig up static files
app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(
  session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    // cookie: {
    //     maxAge: (1000 * 60 * 100)
    // }
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://dbSocialMate:SocialMate@cluster0.cuvwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      autoRemove: 'disabled',
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// set user in locals.user

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMWare.setFlash);
//use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.log(`error in loading the server :${port}`);
    return;
  }
  console.log(`System is up and running on port :${port}`);
});
