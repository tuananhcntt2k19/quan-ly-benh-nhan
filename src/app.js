const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
var _ = require('lodash');


// DB Config
const db = require('./config/db/');
db.connect();

// Express Config
const app = express();
const port = 3000;

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.json());
app.use(methodOverride('_method'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());


// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine(
    'hbs',
    expressHandlebars({
        extname: '.hbs',
        helpers: {
            sumIndex: function(a, b)  {return a + b },
            characterLimit: function(length, context) {
                if (context.length > length) {
                    return context.substring(0, length) + "...";
                } 
                else {
                    return context;
                }
            },
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
const route = require('./routes');
const { count } = require('console');
route(app);

const MessageManagement = require('../src/app/models/chat.model');
app.post('/dashboard/message/store', function(req, res) {
    const chatManagement = new MessageManagement(req.body);
    chatManagement.save(function(err) {
        if(err)
            sendStatus(500);
            io.emit('message', req.body);
        res.sendStatus(200);
    })
})

io.on('connection', () =>{ 
    console.log('connecting');
});

// app.listen(port, () =>
//     console.log(`Server listening at http://localhost:${port}`),
// );

var server = http.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});