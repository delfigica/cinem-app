import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "@/components/Layout/Container";

import {
  Box,
  Typography,
  Button,
  Pagination,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CardMovie } from "@/components/CardMovie/CardMovie";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";

export default function Movies() {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const apiKey = process.env.API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=${page}`
      )
      .then((res) => {
        setPopularMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(() => {
      return value;
    });
    setLoading(true);
  };

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container>
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
        {loading ? (
          <>
            <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          </>
        ) : (
          popularMovies?.map((movie: any) => (
            <CardMovie data={movie} key={movie.id} />
          ))
        )}
      </Box>
      <Box
        sx={
          laptop
            ? { display: "grid", placeItems: "center", padding: "2em" }
            : { display: "grid", placeItems: "center", padding: "1em 0" }
        }
      >
        <Pagination
          count={10}
          page={page}
          color="primary"
          siblingCount={0}
          boundaryCount={1}
          onChange={handleChangePage}
          sx={laptop ? {} : { width: "300px" }}
        />
      </Box>
    </Container>
  );
}
