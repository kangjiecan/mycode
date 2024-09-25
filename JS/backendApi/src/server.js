const express = require('express');
const app = express();
const port = 3000;
const imageRoute= require('./routes/imageRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', imageRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
