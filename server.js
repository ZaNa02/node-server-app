const express = require('express');

const hbs = require('hbs'); //HBS -Handlebars...

const fs = require('fs');

const port = process.env.PORT || 3000; //Heroku will set the port for the app to run, OR we will use 3000 if unavailable
var app = express();

hbs.registerPartials(__dirname + '/views/partials');//reusable parts of code, no repetition :)

app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));//middleware :)

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to this silly page!'
  });
  //res.send('<h1>Hello express!</h1>');
  // res.send({
  //   name: 'Ania',
  //   likes: [
  //     'Cycling',
  //     'swimming',
  //     'dancing...'
  //   ]
  // });
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad',(req,res) => {
  //res.send('Bad request');
  res.send({
    errorMessage: 'Bad request'
  });
});
// /bad
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
});
