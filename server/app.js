/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const { session, sessionConfig } = require('./config/sessions');
require('dotenv').config();

const app = express();
const userLocation = require('./routes/user/location');
const userTicket = require('./routes/user/personalticket');
const ticketList = require('./routes/ticketList/ticketList');
const airlineName = require('./routes/airline');
const citiesList = require('./routes/citiesList');
const authRouter = require('./routes/user/auth');
const excursionsRouter = require('./routes/excursions');
const emailRouter = require('./routes/user/email');
const userExcursions = require('./routes/user/personalExcursions');

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

app.use('/auth', authRouter);
app.use('/user', userExcursions);
app.use('/user/location', userLocation);
app.use('/user/personalticket', userTicket);
app.use('/excursions', excursionsRouter);
app.use('/tickets', ticketList);
app.use('/airline', airlineName);
app.use('/cities', citiesList);
app.use('/auth', authRouter);
app.use('/user/sendticketbyemail', emailRouter);

module.exports = app;
