const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");
const axios = require("axios");
const xml2js = require("xml2js");
const { get } = require("http");

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/sport", (req, res) => {
  const rssUrl = "https://www.nrk.no/sport/toppsaker.rss";

  axios
    .get(rssUrl)
    .then((response) => {
      // Parse the XML to JSON using xml2js
      xml2js.parseString(response.data, { trim: true }, (err, result) => {
        if (err) {
          console.error("Error parsing RSS feed:", err);
          res.status(500).send("Error retrieving feed");
        } else {
          // Access feed items in result.rss.channel[0].item
          const data = result.rss.channel[0].item;
          res.render("sport.ejs", { data });
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching RSS feed:", error);
      res.status(500).send("Error fetching feed");
    });
});

app.get("/kultur", (req, res) => {
  const rssUrl = "https://www.nrk.no/kultur/toppsaker.rss";

  axios
    .get(rssUrl)
    .then((response) => {
      // Parse the XML to JSON using xml2js
      xml2js.parseString(response.data, { trim: true }, (err, result) => {
        if (err) {
          console.error("Error parsing RSS feed:", err);
          res.status(500).send("Error retrieving feed");
        } else {
          // Access feed items in result.rss.channel[0].item
          const data = result.rss.channel[0].item;
          res.render("kultur.ejs", { data });
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching RSS feed:", error);
      res.status(500).send("Error fetching feed");
    });
});

app.get("/nyheter", (req, res) => {
  const rssUrl = "https://www.nrk.no/nyheter/siste.rss";

  axios
    .get(rssUrl)
    .then((response) => {
      // Parse the XML to JSON using xml2js
      xml2js.parseString(response.data, { trim: true }, (err, result) => {
        if (err) {
          console.error("Error parsing RSS feed:", err);
          res.status(500).send("Error retrieving feed");
        } else {
          // Access feed items in result.rss.channel[0].item
          const data = result.rss.channel[0].item;
          res.render("nyheter.ejs", { data });
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching RSS feed:", error);
      res.status(500).send("Error fetching feed");
    });
});

app.get("*", (req, res) => {
  res.render("notfound");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
