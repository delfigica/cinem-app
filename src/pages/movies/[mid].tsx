import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState, addId } from "@/store";
import { useEffect, useState } from "react";
import { Container } from "@/components/Layout/Container";
import { Reviews } from "@/components/Review/Reviews";
import { FormReview } from "@/components/Review/FormReview";

import {
  Box,
  Typography,
  Button,
  Chip,
  Rating,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";

const Movie = () => {
  interface Movie {
    id: string;
    title: string;
    poster_path: string;
    overview: string;
    genres: string[];
    vote_average: number;
  }

  const router = useRouter();

  const { mid } = router.query;

  const [movie, setMovie] = useState<Movie>({
    id: "",
    title: "",
    poster_path: "",
    overview: "",
    genres: [],
    vote_average: 0,
  });

  const apiKey = process.env.API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${mid}?api_key=${apiKey}&language=es-MX`
      )
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [mid]);

  const dispatch = useDispatch();

  const wishListState = useSelector((state: RootState) => state.WishList);

  const handlerFavorites = (id: string) => {
    dispatch(addId(id));
  };

  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(wishListState.movies_ids.some((id: any) => id == mid));
  }, [wishListState]);

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  const [loading, setLoading] = useState(true);
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
          {loading ? (
            <Skeleton
              variant="rectangular"
              width={300}
              height={500}
              sx={{ background: "#3CCE88" }}
            />
          ) : (
            <img
              src={"https://image.tmdb.org/t/p/w500" + movie?.poster_path}
              alt="poster"
            />
          )}
        </Box>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width={300}
            height={500}
            sx={
              laptop
                ? { background: "#3CCE88" }
                : { background: "#3CCE88", margin: "10px auto" }
            }
          />
        ) : (
          <Box sx={laptop ? { width: "50%", padding: "0 3em" } : {}}>
            <Rating
              name="read-only"
              value={movie?.vote_average / 2}
              readOnly
              sx={laptop ? {} : { margin: "12px 100px" }}
            />

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
                onClick={() => handlerFavorites(movie.id)}
                disabled={isInFavorites}
              >
                Añadir a favoritos
              </Button>
            </Box>
            <FormReview mid={mid} />
          </Box>
        )}
      </Box>
      <Reviews mid={mid} />
    </Container>
  );
};

export default Movie;
