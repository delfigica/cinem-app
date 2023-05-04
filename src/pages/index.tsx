import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/Layout/Container";

import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CardMovie } from "@/components/CardMovie/CardMovie";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const apiKey = process.env.API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=1`
      )
      .then((res) => {
        setPopularMovies(res.data.results.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const theme = useTheme();

  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container>
      <Box
        sx={
          laptop
            ? {
                background: "linear-gradient(to right, #3CCE88, #002C65)",
                borderRadius: "0px 0px 0px 100px",
                height: "70vh",
                display: "grid",
                placeItems: "center",
              }
            : {
                background: "linear-gradient(to right, #3CCE88, #002C65)",
                borderRadius: "0px 0px 0px 30px",
                textAlign: "center",
                height: "40vh",
                display: "grid",
                placeItems: "center",
              }
        }
      >
        <Typography
          sx={
            laptop
              ? { color: "white", fontSize: "3em" }
              : { fontSize: "2em", color: "white", textAling: "center" }
          }
        >
          Descubre las películas en tendencia
        </Typography>
      </Box>
      <Box
        sx={
          laptop
            ? {
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                padding: "2em 3em",
              }
            : {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }
        }
      >
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          popularMovies?.map((movie: any) => (
            <CardMovie data={movie} key={movie.id} />
          ))
        )}
      </Box>
      <Box sx={{ padding: "1em", display: "grid", placeItems: "center" }}>
        <Link href="/movies">
          <Button
            variant="contained"
            sx={
              laptop
                ? { width: "350px", fontWeight: 600 }
                : { width: "250px", fontWeight: 600 }
            }
          >
            Ver más
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
