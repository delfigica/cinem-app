import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const CardMovie = ({ data }: any) => {
  console.log("data cardMovie: ", data);
  return (
    <Card sx={{ width: "330px", height: "500px" }}>
      <Box
        sx={{
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
        }}
      >
        <IconButton>
          <FavoriteIcon color="primary" sx={{ fontSize: "1.2em" }} />
        </IconButton>
        <Button
          variant="contained"
          color="secondary"
          sx={{ fontWeight: "600" }}
        >
          Ver detalle
        </Button>
      </Box>
      <CardMedia
        image={"https://image.tmdb.org/t/p/w500" + data.poster_path}
        sx={{ backgroundSize: "cover", width: "100%", height: "500px" }}
        component="img"
      />
    </Card>
  );
};
