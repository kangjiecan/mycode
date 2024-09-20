const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const photoRouter = require('./routes/photoRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/photos', photoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});