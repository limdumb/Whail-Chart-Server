import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import { baseInstance } from "./config/axiosConfig";
import { AxiosResponse } from "axios";
import { transformChartData } from "./function/transformChartData";
import {
  GenieDataType,
  transformGenieData,
} from "./function/transformGenieData";

export interface ApiResponse<T> {
  code: number;
  message: string;
  body: {
    platform: string;
    chart: string;
    timeUnit: string;
    time: string;
    size: number;
    data: T[];
  };
}

export interface MelonData {
  ranking: number;
  previous: number;
  like: number;
  song: {
    platform: string;
    id: string;
    name: string;
    isTitle: boolean;
    duration: number;
    trackNo: number;
    releasedAt: string;
    album: {
      platform: string;
      id: string;
      name: string;
      image: string;
      releasedAt: string;
      songs: string[];
      artists: Artist[];
      createdAt: string;
      updatedAt: string;
    };
    artists: Artist[];
    lyricists: Artist[];
    composers: Artist[];
    arrangers: Artist[];
    genres: Genre[];
    createdAt: string;
    updatedAt: string;
  };
}

interface Artist {
  platform: string;
  id: string;
  name: string;
  image: string;
  albums: string[];
  createdAt: string;
  updatedAt: string;
}

interface Genre {
  platform: string;
  id: string;
  name: string;
}

const app = express();

// Express configuration
app.set("port", process.env.PORT || 8080);
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

app.get("/songs/:type", async (req, res) => {
  const type = req.params.type;
  if (type === "melon") {
    const response: AxiosResponse<ApiResponse<MelonData>> =
      await baseInstance.get(`/api/v3/chart/${type}/realtime/now`);
    const transformChartResponse = transformChartData(response.data);
    res.json(transformChartResponse);
  }

  if (type === "genie") {
    const response: AxiosResponse<ApiResponse<GenieDataType>> =
      await baseInstance.get(`/api/v3/chart/${type}/realtime/now`);
    const transformChartResponse = transformGenieData(response.data);
    res.json(transformChartResponse);
  }

  if (type === "flo") {
  }

  if (type === "bugs") {
  }

  if (type === "vibe") {
  }
});

export default app;
