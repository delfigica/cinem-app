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
    <Card
      sx={
        laptop
          ? { width: "330px", height: "500px", margin: "15px" }
          : { widht: "250px", height: "550px", margin: "10px" }
      }
    >
      <Box
        sx={
          laptop
            ? {
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                background: "rgba(223, 223, 223, 0.38)",
                width: "330px",
                height: "500px",
                position: "absolute",
                cursor: "pointer",
                //   visibility: "collapse",
                //   "&:hover": {
                //       visibility: "visible",
                //   },
              }
            : {
                display: "none",
              }
        }
      >
        <IconButton
          onClick={() => {
            handlerFavorites(data.id);
          }}
        >
          {wishListState.movies_ids.includes(data.id) ? (
            <FavoriteIcon color="secondary" sx={{ fontSize: "1.2em" }} />
          ) : (
            <FavoriteBorderIcon color="secondary" sx={{ fontSize: "1.2em" }} />
          )}
        </IconButton>
        <Link href={"/movies/" + data.id}>
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: "600" }}
          >
            Ver detalle
          </Button>
        </Link>
      </Box>
      <CardMedia
        image={"https://image.tmdb.org/t/p/w500" + data.poster_path}
        sx={{ backgroundSize: "contained", width: "100%", height: "500px" }}
        component="img"
      />
      {!laptop && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "50px",
          }}
        >
          <IconButton>
            <FavoriteBorderIcon color="secondary" sx={{ fontSize: "1.2em" }} />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: "600" }}
          >
            Ver detalle
          </Button>
        </Box>
      )}
    </Card>
  );
};
