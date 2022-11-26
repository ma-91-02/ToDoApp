const express = require("express");
const bodyParser = require("body-parser"); // to use with json
const cors = require("cors"); // to use with different host
const mongoose = require("mongoose"); // to use with DB
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config(); // use with file env

const app = express();
app.use(bodyParser.json());
app.use(cors());

// import routes
const authRoutes = require("./routes/auth");
const postRoute = require("./routes/post");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "To Do App Library API",
    },
    servers: [
      {
        url: "http://localhost:4001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// set header
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// all routes when I use
app.use("/auth/", authRoutes);
app.use(postRoute);
// all errores
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// connect to db
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.kaav2jt.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`
  )
  .then((result) => {
    app.listen(process.env.PORT || 4001, () => {
      console.log("Listening on 4001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
