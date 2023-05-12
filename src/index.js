// error wanneer geen search. Zorg dat de code niet verder draaid na deze error

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const { env } = require("process");

const app = express();
const port = process.env.PORT || 3000;


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars en views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Bob",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must enter an address" });
  }

  geocode(
    req.query.address, (error, { longtitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast(longtitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      })
    })
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpfull text.",
    title: "Help",
    name: "Bob de Raadt",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Bob de Raadt",
    errorMessage: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Bob de Raadt",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("The server is running on port "+port);
});
