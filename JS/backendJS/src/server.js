const express = require("express");
const app = express();
const port = 3000;
const imageRoute = require("./routes/imageRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    express.json()(req, res, (err) => {
      if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
          message: "Bad Request: Invalid JSON",
          error: err.message,
        });
      }
      next();
    });
  } else {
    next();
  }
});

app.use("/", imageRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
