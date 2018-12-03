const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/Partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
app.set('view engine', 'hbs');
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
});

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page.',
    welcomeMessage: 'Welcome here!'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About page.'
  });
});

app.get('/json', (req,res) => {
  res.send({
    name: 'Viacheslav',
    likes: ['Sleeping',
            'Coding']
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
});
