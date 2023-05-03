import axios from "axios";
import { useRouter } from "next/router";
import { Container } from "@/components/Layout/Container";

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { CardMovie } from "@/components/CardMovie/CardMovie";

const Search = () => {
  const apiKey = process.env.API_KEY;

  const router = useRouter();
  const { query } = router.query;

  const [searchResult, setSearchResult] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        `
    https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-MX&query=${query}`
      )
      .then((res) => {
        console.log(res.data);
        setSearchResult(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container>
      <Typography sx={{ textAlign: 'center', fontSize: '1.5em'}}>Resultados de búsqueda</Typography>
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
        {searchResult?.map((movie: any) => (
          <CardMovie data={movie} key={movie.id} />
        ))}
      </Box>
    </Container>
  );
};

export default Search;
