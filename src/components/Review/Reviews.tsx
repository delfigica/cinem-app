import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

import {
  Box,
  Typography,
  Avatar,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export const Reviews = ({ mid }: any) => {
  const reviewsState = useSelector((state: RootState) => state.Reviews);

  const [reviews, setReviews] = useState<any[]>([]);

  const apiKey = process.env.API_KEY;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${mid}/reviews?api_key=${apiKey}&language=es-MX&page=1`
      )
      .then((res) => {
        setReviews((prev) => {
          return prev.concat(res.data.results);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [mid]);

  useEffect(() => {
    let thisMovieReviews = reviewsState.items?.filter(
      (review: any) => review.movie_id == mid
    );
    setReviews((prev) => {
      return prev.concat(thisMovieReviews);
    });
  }, [reviewsState]);

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      {loading ? (
        <Skeleton
          variant="rectangular"
          sx={
            laptop
              ? {
                  background: "#3CCE88",
                  width: "500px",
                  height: "200px",
                }
              : {
                  background: "#3CCE88",
                  width: "300px",
                  height: "300px",
                  margin: "10px auto",
                }
          }
        />
      ) : (
        <Box
          sx={{
            margin: "0 20px",
          }}
        >
          <Typography sx={{ fontSize: "1.2em" }}>Comentarios</Typography>
          <Box>
            {reviews.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  height: "400px",
                  overflowY: "scroll",
                  width: "100%",
                }}
              >
                {reviews.map((review) => (
                  <Box
                    sx={
                      laptop
                        ? {
                            display: "flex",
                            alignItems: "center",
                            margin: "10px 20px",
                          }
                        : {
                            display: "flex",
                            margin: "10px 20px",
                          }
                    }
                  >
                    <Avatar src="/broken-image.jpg" sx={{ widht: "60px" }} />
                    <Box sx={{ margin: "0px 10px" }}>
                      <Typography sx={{ fontWeight: 600, fontSize: ".8em" }}>
                        Anonimo
                      </Typography>
                      <Typography sx={{ fontSize: ".9em" }}>
                        {review?.review}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography sx={{ margin: "20px 0px" }}>
                Sin comentarios, agrega uno
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
