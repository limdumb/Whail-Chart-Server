import { ApiResponse, Artist, Genre } from "../app";
import formatDateTime from "./formatDateTime";
interface GenieChartDataType {
  pletform: string;
  date: string;
  hour: number;
  chart: GenieChartData[];
}

interface GenieChartData {
  rank: number;
  previous: number;
  listnerCount: string;
  playCount: string;
  song: {
    id: number;
    name: string;
    image: string;
    artists: {
      id: number;
      name: string;
      image: string;
    };
  };
}
export interface GenieDataType {
  ranking: number;
  previous: number;
  count1: number;
  count2: number;
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
export const transformGenieData = (
  responseData: ApiResponse<GenieDataType>
): GenieChartDataType => {
  const formattedDateTime = formatDateTime(responseData.body.time);
  const chart: GenieChartData[] = responseData.body.data.map((el) => {
    const transformCount1 = el.count1.toLocaleString();
    const transformCount2 = el.count2.toLocaleString();
    const transformChart = {
      rank: el.ranking,
      previous: el.previous,
      listnerCount: transformCount1,
      playCount: transformCount2,
      song: {
        id: Number(el.song.id),
        name: el.song.name,
        image: el.song.album.image,
        artists: {
          id: Number(el.song.artists[0].id),
          name: el.song.artists[0].name,
          image: el.song.artists[0].image,
        },
      },
    };
    return transformChart;
  });
  const transformChartResponse: GenieChartDataType = {
    pletform: responseData.body.platform,
    date: formattedDateTime.year,
    hour: formattedDateTime.hour,
    chart: chart,
  };
  return transformChartResponse;
};
