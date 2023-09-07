import formatDateTime from "../function/formatDateTime";
import { ApiResponse, Artist, Genre } from "../app";

export interface MelonDailyChartType {
  ranking: number;
  previous: number;
  count: number;
  ratio: Ration;
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

export interface Ration {
  male: number;
  female: number;
  age10: number;
  age20: number;
  age30: number;
  age40: number;
  age50: number;
  age60: number;
}

interface MelonDailySongType {
  rank: number;
  previous: number;
  count:number;
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

export interface TransformMelonDailyChart {
  platform: string;
  date: string;
  hour: number;
  chart: MelonDailySongType[];
}

export const melonDailyChart = (
  responseData: ApiResponse<MelonDailyChartType>
): TransformMelonDailyChart => {
  const formattedDateTime = formatDateTime(responseData.body.time);

  const chart: MelonDailySongType[] = responseData.body.data.map((el) => {
    const transformData: MelonDailySongType = {
      rank: el.ranking,
      previous: el.previous,
      count:el.count,
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

  const transformChartResponse: TransformMelonDailyChart = {
    platform: responseData.body.platform,
    date: formattedDateTime.year,
    hour: formattedDateTime.hour,
    chart: chart,
  };

  return transformChartResponse;
};
