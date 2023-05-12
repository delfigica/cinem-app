import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { FormReview } from "@/components/Review/FormReview";

import {
  Box,
  Typography,
  Avatar,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export const Reviews = ({ mid }: any) => {
  
  //Initial states
  const reviewsState = useSelector((state: RootState) => state.Reviews);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Get revies from store
  useEffect(() => {
    let thisMovieReviews = reviewsState.items?.filter(
      (review: any) => review.movie_id == mid
    );
    const arrayWithRepeated = reviews.concat(thisMovieReviews);
    const arrayWithOutRepeated = arrayWithRepeated.filter(
      (review, index, array) =>
        array.findIndex((e) => e.review === review.review) === index
    );
    setReviews(() => {
      return arrayWithOutRepeated;
    });
    setLoading(false)
  }, [reviewsState]);

  //To handler responsive desing
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
                  width: "100%",
                  maxHeight: "200px",
                }
              : {
                  background: "#3CCE88",
                  width: "100%",
                  maxHeight: "300px",
                  margin: "10px auto",
                }
          }
        />
      ) : (
        <Box sx={{ paddingBottom: "1rem" }}>
          <Typography sx={{ fontSize: "1.2em" }}>Comentarios</Typography>
          <FormReview mid={mid} />

          <Box>
            {reviews.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  maxHeight: "400px",
                  overflowY: "scroll",
                  width: "100%",
                }}
              >
                {reviews.map((review) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
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
