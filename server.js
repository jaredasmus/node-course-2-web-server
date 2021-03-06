const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(`${__dirname}/views/partials`);
app.set({
    'view engine': 'hbs'
});

//middleware - order matters, put static last or you will be able to access it even in 'maintenance' mode.
app.use((req, res, next)=> {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFileSync('server.log', log + '\n');

    next();  //tell the application you are done and that it can move on.
});

// app.use((req, res, next)=> {
//     res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());
hbs.registerHelper('whisperIt', (text) => text.toLowerCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome Page',
        welcomeMessage: 'Welcome home skillet.'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Portfolio'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}.`);
});