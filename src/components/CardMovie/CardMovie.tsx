import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { addId } from "@/store";
import { removeId } from "@/store";
import Link from "next/link";

import {
  Box,
  Card,
  CardMedia,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const CardMovie = ({ data }: any) => {
  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  const dispatch = useDispatch();

  const wishListState = useSelector((state: RootState) => state.WishList);

  const handlerFavorites = (id: string) => {
    if (wishListState.movies_ids.includes(id)) {
      dispatch(removeId(id));
    } else {
      dispatch(addId(id));
    }
  };

  return (
    <Link href={"/movies/" + data.id}>
      <Card
        sx={
          laptop
            ? {
                width: "280px",
                height: "440px",
                margin: "15px",
                cursor: "pointer",
              }
            : { widht: "250px", height: "550px", margin: "10px" }
        }
      >
        <CardMedia
          image={"https://image.tmdb.org/t/p/w500" + data.poster_path}
          sx={{ backgroundSize: "contained", width: "100%", height: "500px" }}
          component="img"
        />
      </Card>
    </Link>
  );
};
