const express = require('express');
const app = express();
const port = 3000;
const imageRoute= require('./routes/imageRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ message: "Bad Request: Invalid JSON", error: err.message });
    }
    next();
  });

app.use('/', imageRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
