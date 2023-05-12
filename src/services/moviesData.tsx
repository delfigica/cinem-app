import axios from "axios";

const apiKey = process.env.API_KEY;

export const getDataPopularMovies = async (page: number) => {
  let data: any[] = [];
  await axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=${page}`
    )
    .then((res) => {
      data = res.data.results;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const getAMovie = async (mid: any) => {
  interface Movie {
    id: string;
    title: string;
    poster_path: string;
    overview: string;
    genres: string[];
    vote_average: number;
  }
  let data: Movie = {
    id: "",
    title: "",
    poster_path: "",
    overview: "",
    genres: [],
    vote_average: 0,
  };
  await axios
    .get(
      `https://api.themoviedb.org/3/movie/${mid}?api_key=${apiKey}&language=es-MX`
    )
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const getDataMoviesByQuery = async (query: any) => {
  let data: any[] = [];
  await axios
    .get(
      `
  https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-MX&query=${query}`
    )
    .then((res) => {
      data = res.data.results;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
