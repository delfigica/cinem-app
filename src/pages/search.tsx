import axios from "axios";
import { useRouter } from "next/router";

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { CardMovie } from "@/components/CardMovie/CardMovie";

const Search = () => {
  const apiKey = process.env.API_KEY;

  const router = useRouter();
  const { query } = router.query;

  const [searchResult, setSearchResult] = useState<any[]>([]);

  useEffect(() => {
    if (query) {
      axios
        .get(
          `
        https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-MX&query=${query}`
        )
        .then((res) => {
          setSearchResult(res.data.results);
        })
        .catch((err) => {
          console.log(err);

        });
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=1`
        )
        .then((res) => {
          setSearchResult(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query]);

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Typography sx={{ textAlign: "center", fontSize: "1.5em", marginTop: '25px' }}>
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
        {searchResult.length > 0 ? searchResult.map((movie: any) => (
          <CardMovie data={movie} key={movie.id} />
        )) : <Typography>Sin resultados de busqueda</Typography> }
      </Box>
    </>
  );
};

export default Search;
