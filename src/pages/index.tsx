import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { CardMovie } from "@/components/CardMovie/CardMovie";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";

export default function Home() {
  interface principalMovie {
    backdrop_path: string;
    title: string;
  }

  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [principalMovie, setprincipalMovie] = useState<principalMovie>({
    backdrop_path: "",
    title: "",
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const theme = useTheme();

  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Box
        sx={
          laptop
            ? {
                backgroundImage: `url( https://image.tmdb.org/t/p/original${principalMovie?.backdrop_path})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "100vw",
                borderRadius: "0px 0px 0px 100px",
                height: "70vh",
                display: "grid",
                placeItems: "center",
              }
            : {
                backgroundImage: `url( https://image.tmdb.org/t/p/w500${principalMovie?.backdrop_path})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "0px 0px 0px 30px",
                textAlign: "center",
                height: "50vh",
                display: "grid",
                placeItems: "center",
              }
        }
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.38)",
              padding: "2rem",
            }}
          >
            <Chip
              label="Estrenos más populares"
              color="primary"
              sx={{ color: "black", fontWeight: 600 }}
            />
            <Typography
              sx={
                laptop
                  ? {
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: "3em",
                      fontWeight: "600",
                      textAlign: "center",
                    }
                  : {
                      fontSize: "1.5em",
                      textAling: "center",
                      color: "rgba(255, 255, 255, 1)",
                      fontWeight: "600",
                    }
              }
            >
              {principalMovie?.title}
            </Typography>
          </div>
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
            sx={{
              fontWeight: 600,
              padding: "10px 30px",
              background: "#27CFA4",
              borderRadius: "50px",
            }}
          >
            Ver más
          </Button>
        </Link>
      </Box>
    </>
  );
}
