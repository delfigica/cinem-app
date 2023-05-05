import { useDispatch } from "react-redux";
import { addItem } from "../../store/index";
import { Box, Button, TextField, useTheme, useMediaQuery, Typography } from "@mui/material";
import { useState } from "react";

export const FormReview = ({ mid }: any) => {
  const dispatch = useDispatch();

  const [review, setReview] = useState("");

  const handleChange = (e: any) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (review.length > 0) {
      let newReview = {
        movie_id: mid,
        review: review,
      };
      dispatch(addItem(newReview));
      setReview("");
    }
  };

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Box
      sx={
        laptop
          ? {
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "40%",
              margin: "0px 20px",
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
      <Typography sx={{ margin: '10px 0px'}}>Agregar comentario</Typography>
      <TextField
        placeholder="Escribe un comentario"
        multiline
        maxRows={4}
        sx={{ width: "100%" }}
        rows={4}
        value={review}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        sx={{ fontWeight: 600, margin: "25px 0px", width: "100%" }}
        onClick={handleSubmit}
      >
        Agregar
      </Button>
    </Box>
  );
};
