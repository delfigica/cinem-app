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
  interface principalMovie {
    backdrop_path: string;
  }

  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [principalMovie, setprincipalMovie] = useState<principalMovie>({
    backdrop_path: "",
  });

  const [loading, setLoading] = useState(true);

  const apiKey = process.env.API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=1`
      )
      .then((res) => {
        setprincipalMovie(res.data.results[0]);
        setPopularMovies(res.data.results.slice(1, 5));
        console.log(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("principalMovie: ", principalMovie);
  const theme = useTheme();

  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container>
      <Box
        sx={
          laptop
            ? {
                backgroundImage: `url( https://image.tmdb.org/t/p/original${principalMovie?.backdrop_path})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "100vw",
                borderRadius: "0px 0px 0px 100px",
                height: "80vh",
                display: "grid",
                placeItems: "center",
              }
            : {
                backgroundImage: `url( https://image.tmdb.org/t/p/w500${principalMovie?.backdrop_path})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "0px 0px 0px 30px",
                textAlign: "center",
                height: "40vh",
                display: "grid",
                placeItems: "center",
              }
        }
      >
        <Box
          sx={{
            backgroundColor: "rgba(223, 223, 223, 0.38)",
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Typography
            sx={
              laptop
                ? {
                    color: "rgba(46, 43, 43, 1)",
                    fontSize: "3em",
                    fontWeight: "600",
                    textAlign: "center",
                  }
                : { fontSize: "1.5em", textAling: "center", color: "rgba(46, 43, 43, 1)", fontWeight: "600",}
            }
          >
            Descubre las películas en tendencia
          </Typography>
        </Box>
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
