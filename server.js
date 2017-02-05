'use strict';
const express = require('express');
const path = require('path');
const uuid = require('uuid');
const exphbs = require('express-handlebars');
const socketIO = require('socket.io');
const app = express();
const hbs = exphbs.create({
  extname: '.hbs'
});

// router
const callRouter = require('./routes/call');
const indexRouter = require('./routes/index');

// socket handler
const handleSocket = require('./socket.js');

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/call', callRouter);
app.use('/', indexRouter);

const io = socketIO.listen(
  app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  })
);

io.on('connection', socket => handleSocket(socket, io));
