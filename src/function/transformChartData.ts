import { ApiResponse,MelonData } from "../app";
import formatDateTime from "./formatDateTime";

interface ChartDataType {
  pletform: string;
  date: string;
  hour: number;
  chart: MelonChartData[]
}

interface MelonChartData{
    rank: number;
    previous: number;
    likes: string;
    song: {
      id: number;
      name: string;
      image: string;
      artists: {
        id: number;
        name: string;
        image: string;
      };
    }
}
export const transformChartData = (
  responseData: ApiResponse<MelonData>
): ChartDataType => {

  const chart:MelonChartData[] = responseData.body.data.map((el) => ({
    rank: el.ranking,
    previous: el.previous,
    likes: el.like.toString(),
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
  }));

  const formattedDateTime = formatDateTime(responseData.body.time);

  const transformChartResponse: ChartDataType = {
    pletform: responseData.body.platform,
    date: formattedDateTime.year,
    hour: formattedDateTime.hour,
    chart: chart,
  };
  return transformChartResponse;
};
