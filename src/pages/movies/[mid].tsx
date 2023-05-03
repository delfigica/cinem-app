import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "@/components/Layout/Container";

import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Movie = () => {
  const router = useRouter();
  const { mid } = router.query;

  const [movie, setMovie] = useState<any[]>([]);

  const [reviews, setReviews] = useState<any[]>([]);

  const apiKey = process.env.API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${mid}?api_key=${apiKey}&language=es-MX`
      )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${mid}/reviews?api_key=${apiKey}&language=es-MX&page=1`
      )
      .then((res) => {
        setReviews(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [mid]);

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Container>
      <Box
        sx={
          laptop
            ? { padding: "1em 3em", display: "flex", justifyContent: "center" }
            : {}
        }
      >
        <Box
          sx={laptop ? { width: "400px" } : { width: "300px", margin: "auto" }}
        >
          <img
            src={"https://image.tmdb.org/t/p/w500" + movie?.poster_path}
            alt="poster"
          />
        </Box>
        <Box sx={laptop ? { width: "50%", padding: "0 3em" } : {}}>
          <Typography
            color="primary"
            sx={
              laptop
                ? { fontSize: "2em" }
                : { fontSize: "1.8em", textAlign: "center" }
            }
          >
            {movie?.title}
          </Typography>
          <Typography
            sx={
              laptop
                ? { width: "80%", margin: "10px 0px" }
                : { width: "90%", margin: "15px" }
            }
          >
            {movie?.overview}
          </Typography>
          <Box
            sx={
              laptop
                ? {
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80%",
                  }
                : {
                    display: "flex",
                    flexWrap: "wrap",
                  }
            }
          >
            {movie?.genres?.map((genre: any) => (
              <Chip
                label={genre.name}
                key={genre.id}
                sx={
                  laptop
                    ? { fontWeight: 600 }
                    : { fontWeight: 600, margin: "10px" }
                }
                color="secondary"
              />
            ))}
          </Box>
          <Box
            sx={
              laptop
                ? { display: "flex", justifyContent: "center", width: "80%" }
                : {
                    display: "flex",
                    justifyContent: "center",
                    width: "80%",
                    margin: "auto",
                  }
            }
          >
            <Button
              variant="contained"
              sx={{ fontWeight: 600, margin: "25px 0px", width: "350px" }}
            >
              Añadir a favoritos
            </Button>
          </Box>
          <Box
            sx={
              laptop
                ? {
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "80%",
                  }
                : {
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "80%",
                    margin: "auto",
                  }
            }
          >
            <TextField
              label="Escribe un comentario"
              multiline
              maxRows={4}
              sx={{ width: "100%" }}
              rows={4}
            />
            <Button
              variant="contained"
              sx={{ fontWeight: 600, margin: "25px 0px", width: "100%" }}
            >
              Añadir
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
          padding: "1em",
        }}
      >
        <Typography sx={{ fontSize: "1.2em" }}>Comentarios</Typography>
        <Box>
          {reviews.length > 1 ? (
            <Box></Box>
          ) : (
            <Typography sx={{ margin: "20px 0px" }}>
              Sin comentarios, agrega uno
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Movie;
