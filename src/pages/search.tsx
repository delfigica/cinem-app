import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CardMovie } from "@/components/CardMovie/CardMovie";
import {
  getDataMoviesByQuery,
  getDataPopularMovies,
} from "@/services/moviesData";

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
const Search = () => {
  // Get query from url attributes
  const router = useRouter();
  const { query } = router.query;

  //Inital state
  const [searchResult, setSearchResult] = useState<any[]>([]);

  //Requests from services
  useEffect(() => {
    if (query) {
      getDataMoviesByQuery(query).then((res) => {
        setSearchResult(res);
      });
    } else {
      getDataPopularMovies(1).then((res) => {
        setSearchResult(res);
      });
    }
  }, [query]);

  //To handler responsive desing
  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Typography
        sx={{ textAlign: "center", fontSize: "1.5em", marginTop: "25px" }}
      >
        Resultados de búsqueda para: "{query}"
      </Typography>
      <Box
        sx={
          laptop
            ? {
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                padding: "1em 3em",
              }
            : {
                padding: "1em 0",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }
        }
      >
        {searchResult.length > 0 ? (
          searchResult.map((movie: any) => (
            <CardMovie data={movie} key={movie.id} />
          ))
        ) : (
          <Typography>Sin resultados de busqueda</Typography>
        )}
      </Box>
    </>
  );
};

export default Search;
