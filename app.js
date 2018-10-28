const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const keys = require('./keys');
const flash = require('connect-flash');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

// Setup express session
app.use(require('express-session')({
  secret: keys.session,
  resave: false,
  saveUninitialized: false,
  maxAge: 365 * 24 * 60 * 60 * 1000
}));

// Add flash message handler to all pages
app.use((req, res, next) => {
  res.locals.info = req.flash('info');
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  // create reusable transporter object
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: keys.google.user,
      pass: keys.google.pass
    }
  });

  // setup email data
  let mailOptions = {
    from: '"Contact Form" <kaden.zipfel@hotmail.com>', // sender address
    to: 'kaden.zipfel@hotmail.com', // list of receivers
    subject: req.body.subject + ' - ' + req.body.email, // Subject line
    text: req.body.message, // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent');
  });
  req.flash('info', "Message Sent!");
  res.redirect('back');
});

app.get('*', (req, res) => {
  res.render('error');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('The server is running.');
});