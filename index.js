const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({});
}
);

const AuthRouter = require('./Auth/AuthRouter');
app.use('/auth', AuthRouter);

const BookRoutes = require('./Books/BookRouter');
app.use('/books', BookRoutes);

const UserRoutes = require('./Users/UserRouter');
app.use('/users', UserRoutes);

mongoose.connect('mongodb://localhost:27017/myapp');


app.listen(8080);