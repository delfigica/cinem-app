import { useDispatch } from "react-redux";
import { addItem } from "../../store/index";
import { useState } from "react";

import {
  Box,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
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
      sx={{
        display: "flex",
        margin: "10px 0px",
      }}
    >
      <Avatar src="/broken-image.jpg" sx={{ widht: "60px" }} />
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Escribe un comentario"
          multiline
          maxRows={4}
          sx={laptop ? { width: "400px", margin: "0px 10px" } : {margin: "0px 10px"}}
          variant="standard"
          value={review}
          onChange={handleChange}
        />
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </form>
    </Box>
  );
};
