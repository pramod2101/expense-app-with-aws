// app.js

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors=require('cors')
const expenser=require('./models/expense')
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use('/', expenseRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
