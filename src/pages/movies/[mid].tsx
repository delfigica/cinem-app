import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState, addId, removeId } from "@/store";
import { useEffect, useState } from "react";
import { Reviews } from "@/components/Review/Reviews";

import {
  Box,
  Typography,
  Chip,
  Rating,
  useTheme,
  useMediaQuery,
  Skeleton,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
    if (wishListState.movies_ids.includes(id)) {
      dispatch(removeId(id));
    } else {
      dispatch(addId(id));
    }
  };

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  const [loading, setLoading] = useState(true);
  return (
    <>
      <Box
        sx={
          laptop
            ? {
                padding: "1em 3em",
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
              }
            : {
                padding: "0 1rem",
              }
        }
      >
        <Box
          sx={laptop ? { width: "400px" } : { width: "250px", margin: "auto" }}
        >
          {loading ? (
            <Skeleton
              variant="rectangular"
              width={300}
              height={500}
              sx={{ background: "#3CCE88", width: "300px", height: "500px" }}
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
            sx={laptop ? { background: "#3CCE88" } : { background: "#3CCE88" }}
          />
        ) : (
          <Box sx={laptop ? { width: "50%", padding: "0 2rem" } : {}}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                color="secondary"
                sx={
                  laptop
                    ? { fontSize: "2em", marginRight: "10px" }
                    : {
                        fontSize: "1.8em",
                        lineHeight: "1em",
                        marginTop: "1rem",
                      }
                }
              >
                {movie?.title}
              </Typography>
              <IconButton onClick={() => handlerFavorites(movie.id)}>
                {wishListState.movies_ids.includes(movie.id) ? (
                  <FavoriteIcon sx={{ color: "red", fontSize: "1.3em" }} />
                ) : (
                  <FavoriteBorderIcon
                    sx={{ color: "red", fontSize: "1.3em" }}
                  />
                )}
              </IconButton>
            </Box>
            <Rating
              name="read-only"
              value={movie?.vote_average / 2}
              readOnly
              sx={laptop ? {} : { padding: "1rem 0" }}
            />
            <Typography>{movie?.overview}</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "1rem" }}>
              {movie?.genres?.map((genre: any) => (
                <Chip
                  label={genre.name}
                  key={genre.id}
                  sx={{
                    fontWeight: 600,
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                  color="secondary"
                />
              ))}
            </Box>
            <Reviews mid={mid} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Movie;
