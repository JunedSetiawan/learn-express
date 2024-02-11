const express = require('express');
const route = express();
const path = require('path');

const PORT = process.env.PORT || 3500;

route.use(express.urlencoded({extended: false}));

route.use(express.json());

route.use(express.static(path.join(__dirname, '/public')));

route.get('/', (req, res) =>{
    res.sendFile('./views/index.html', {root: __dirname});
});

route.get('/new-page(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

route.get('/old-page', (req, res) =>{
    res.redirect(301,'/new-page');
});

const one = (req, res, next) =>{
    console.log('Middleware One');
    next();
}

const two = (req, res, next) =>{
    console.log('Middleware Two');
    next();
}

const three = (req, res) =>{
    console.log('final middleware');
    res.send('finished');
}

route.get('/middleware', [one, two, three]);

route.get('/*', (req, res) =>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

route.listen(PORT, () => console.log(`Server running on port ${PORT}`));