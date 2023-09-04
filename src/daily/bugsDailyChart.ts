import formatDateTime from "../function/formatDateTime";
import { ApiResponse, Artist, Genre } from "../app";

export interface BugsDailyChartType {
  ranking: number;
  previous: number;
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

interface BugsDailySongType {
  rank: number;
  previous: number;
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

export interface TransformBugsDailyChart {
  platform: string;
  date: string;
  hour: number;
  chart: BugsDailySongType[];
}

export const melonDailyChart = (
  responseData: ApiResponse<BugsDailyChartType>
): TransformBugsDailyChart => {
  const formattedDateTime = formatDateTime(responseData.body.time);

  const chart: BugsDailySongType[] = responseData.body.data.map((el) => {
    const transformData: BugsDailySongType = {
      rank: el.ranking,
      previous: el.previous,
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
    return transformData;
  });

  const transformChartResponse: TransformBugsDailyChart = {
    platform: responseData.body.platform,
    date: formattedDateTime.year,
    hour: formattedDateTime.hour,
    chart: chart,
  };

  return transformChartResponse;
};
