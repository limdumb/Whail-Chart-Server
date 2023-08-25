import { ApiResponse } from "../app";

interface ChartDataType {
  pletform: string;
  date: string;
  hour: number;
  chart: {
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
    };
  }[];
}
export const transformChartData = (
  responseData: ApiResponse
): ChartDataType => {
  function formatDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");

    return { year: `${year}-${month}-${day}`, hour: Number(hour) };
  }

  const chart = responseData.body.data.map((el) => ({
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
