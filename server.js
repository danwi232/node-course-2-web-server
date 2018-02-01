const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    console.log(`${now}: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        currentYear: new Date().getUTCFullYear(),
        welcomeText: 'Welcome to my web site'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getUTCFullYear()
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page',
        currentYear: new Date().getUTCFullYear(),
        welcomeText: 'Welcome to my projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad Request page'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});