const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const mongoose = require('mongoose');
const db = require('./config/db');

const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const peonRoutes = require('./routes/peonRoutes');

const app = express();

// DB connect
db.connect();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// simple homepage
app.get('/', async (req, res) => {
  res.render('index', { title: 'School Management' });
});

// routes
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/peons', peonRoutes);

// API root info
app.get('/api', (req, res) => {
  res.json({
    message: 'School API',
    resources: ['/api/students', '/api/teachers', '/api/peons']
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
