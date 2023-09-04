import { ApiResponse, Artist, Genre } from "../app";
import formatDateTime from "./formatDateTime";

export interface SongInfo {
  platform: string;
  id: string;
  name: string;
  isTitle: boolean;
  duration: number;
  trackNo: number;
  releasedAt: string;
  album: AlbumInfo;
  artists: Artist[];
  lyricists: Artist[];
  composers: Artist[];
  arrangers: Artist[];
  genres: Genre[];
  createdAt: string;
  updatedAt: string;
}

interface AlbumInfo {
  platform: string;
  id: string;
  name: string;
  image: string;
  releasedAt: string;
  songs: string[];
  artists: Artist[];
  createdAt: string;
  updatedAt: string;
}

export interface BugsData {
  ranking: number;
  previous: number;
  song: SongInfo;
}

interface BugsChartDataType {
  platform: string;
  date: string;
  hour: number;
  chart: BugsSongDataType[];
}

interface BugsSongDataType {
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

export const transformBugsData = (responseData: ApiResponse<BugsData>):BugsChartDataType => {
  const formattedDateTime = formatDateTime(responseData.body.time);
  const chart: BugsSongDataType[] = responseData.body.data.map((el) => ({
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
  const transformChartResponse: BugsChartDataType = {
    platform: responseData.body.platform,
    date: formattedDateTime.year,
    hour: formattedDateTime.hour,
    chart: chart,
  };

  return transformChartResponse;
};
