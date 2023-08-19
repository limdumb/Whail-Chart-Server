import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";

const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/songs", (req, res) => {
  res.json({
    data: {
      date: "2023-08-14",
      hour: 17,
      platform: "Melon",
      chart: [
        {
          rank: 1,
          previous: 1,
          likes: "1,111,111",
          song: {
            id: 11,
            name: "Super Shy",
            release: "2023-07-07",
            album: {
              id: 1,
              name: "NewJeans 2nd EP 'Get Up",
              image: "이미지입니다",
            },
            artists: [
              {
                id: 12,
                name: "NewJeans",
                image: "이미지입니다",
              },
            ],
          },
        },
      ],
    },
  });
});

export default app;
