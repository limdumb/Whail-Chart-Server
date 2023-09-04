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
import { FloDataType, transformFloData } from "./function/transformFloData";
import { BugsData, transformBugsData } from "./function/transformBugsData";
import { VibeData, transformVibeData } from "./function/transformVibeData";
import { MelonDailyChartType, melonDailyChart } from "./daily/melonDailyChart";
import { BugsDailyChartType } from "./daily/bugsDailyChart";

// 일간차트 Data Transform 타입 생성
//

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

export interface Artist {
  platform: string;
  id: string;
  name: string;
  image: string;
  albums: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Genre {
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

  if (type === "melon24") {
    const response: AxiosResponse<ApiResponse<MelonData>> =
      await baseInstance.get("/api/v3/chart/melon/24hits/now");
    const transformChartResponse = transformChartData(response.data);
    res.json(transformChartResponse);
  }

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
    const response: AxiosResponse<ApiResponse<FloDataType>> =
      await baseInstance.get("/api/v3/chart/flo/24hour/now");
    const transformChartResponse = transformFloData(response.data);
    res.json(transformChartResponse);
  }

  if (type === "bugs") {
    const response: AxiosResponse<ApiResponse<BugsData>> =
      await baseInstance.get(`/api/v3/chart/${type}/realtime/now`);
    const transformChartResponse = transformBugsData(response.data);
    res.json(transformChartResponse);
  }

  if (type === "vibe") {
    const response: AxiosResponse<ApiResponse<VibeData>> =
      await baseInstance.get("/api/v3/chart/vibe/daily/now");
    const transformChartResponse = transformVibeData(response.data);
    res.json(transformChartResponse);
  }
});

app.get("/songs/daily/:type/:date", async (req, res) => {
  const type = req.params.type;
  const date = req.params.date;

  if (type === "melon") {
    const response: AxiosResponse<ApiResponse<MelonDailyChartType>> =
      await baseInstance.get(`/api/v3/chart/${type}/daily/${date}`);
    const transformChartResponse = melonDailyChart(response.data);
    res.json(transformChartResponse);
  }

  if (type === "genie") {
    const response: AxiosResponse<ApiResponse<GenieDataType>> =
      await baseInstance.get(`/api/v3/chart/${type}/realtime/now`);
    const transformChartResponse = transformGenieData(response.data);
    res.json(transformChartResponse);
  }

  if (type === "flo") {
    const response: AxiosResponse<ApiResponse<FloDataType>> =
      await baseInstance.get("/api/v3/chart/flo/24hour/now");
    const transformChartResponse = transformFloData(response.data);
    res.json(transformChartResponse);
  }

  if (type === "vibe") {
    const response: AxiosResponse<ApiResponse<VibeData>> =
      await baseInstance.get("/api/v3/chart/vibe/daily/now");
    const transformChartResponse = transformVibeData(response.data);
    res.json(transformChartResponse);
  }

  if (type === "bugs") {
    const response: AxiosResponse<ApiResponse<BugsDailyChartType>> =
      await baseInstance.get(`/api/v3/chart/bugs/daily/${date}`);
    const transformChartResponse = transformBugsData(response.data);
    res.json(transformChartResponse);
  }
});

export default app;
