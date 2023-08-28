import { ApiResponse } from "../app";
import formatDateTime from "./formatDateTime";

interface FloDataType {
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
    lyricists: Lyricist[];
    composers: Composer[];
    arrangers: Arranger[];
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

interface Lyricist {
  platform: string;
  id: string;
  name: string;
  image: string;
  albums: string[];
  createdAt: string;
  updatedAt: string;
}

interface Composer {
  platform: string;
  id: string;
  name: string;
  image: string;
  albums: string[];
  createdAt: string;
  updatedAt: string;
}

interface Arranger {
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

interface FloSongDataType {
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

interface FloChartDataType {
  platform: string;
  date: string;
  hour: number;
  chart: FloSongDataType[];
}

export const transformFloData = (
  responseData: ApiResponse<FloDataType>
): FloChartDataType => {
  const formattedDateTime = formatDateTime(responseData.body.time);
  const chart: FloSongDataType[] = responseData.body.data.map((el) => ({
    rank: el.ranking,
    previous: el.previous,
    song: {
      id: Number(el.song.id),
      name: el.song.name,
      image: el.song.artists[0].image,
      artists: {
        id: Number(el.song.artists[0].id),
        name: el.song.artists[0].name,
        image: el.song.artists[0].image,
      },
    },
  }));
  const transformChartResponse: FloChartDataType = {
    platform: responseData.body.platform,
    date: formattedDateTime.year,
    hour: formattedDateTime.hour,
    chart: chart,
  };

  return transformChartResponse;
};
