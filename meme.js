const express = require('express');

const app = express();

// set up handlebars view engine
const handlebars =  require('express3-handlebars').create({ defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.render('home');
});

app.get('/about', (req,res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune:randomFortune});
});

// fortune cookies
const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
]

// express custom 404 page
app.use((req,res, next) => {
    res.status(404);
    res.render('400');
});

// express custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);   // Describing the point at which the error was instantiated.
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on' + app.get('port'));
});

