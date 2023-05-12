import Link from "next/link";
import { useEffect, useState } from "react";
import { getDataPopularMovies } from "@/services/moviesData";
import { CardMovie } from "@/components/CardMovie/CardMovie";

import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Chip,
  Skeleton,
} from "@mui/material";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";

export default function Home() {
  //Model from object state
  interface principalMovie {
    backdrop_path: string;
    title: string;
  }

  //Inital states
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [principalMovie, setprincipalMovie] = useState<principalMovie>({
    backdrop_path: "",
    title: "",
  });
  const [loading, setLoading] = useState(true);

  //Request from services
  useEffect(() => {
    getDataPopularMovies(1).then((res) => {
      setprincipalMovie(res[0]);
      setPopularMovies(res.slice(1, 5));
      setLoading(false);
    });
  }, []);

  //To handler responsive desing
  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      {loading ? (
        <>
          <Skeleton
            variant="rectangular"
            sx={
              laptop
                ? {
                    widht: "100%",
                    height: "70vh",
                    backgroundColor: "#3CCE88",
                  }
                : { width: "100%", height: "50vh", backgroundColor: "#3CCE88" }
            }
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              padding: "2em 3em",
              justifyContent: "space-between",
            }}
          >
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </Box>
        </>
      ) : (
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
            {popularMovies?.map((movie: any) => (
              <CardMovie data={movie} key={movie.id} />
            ))}
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
      )}
    </>
  );
}
