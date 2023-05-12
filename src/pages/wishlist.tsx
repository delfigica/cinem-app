import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAMovie } from "@/services/moviesData";
import { CardMovie } from "@/components/CardMovie/CardMovie";

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const WishList = () => {
  //Initial state
  const [list, setList] = useState<any[]>([]);
  
    //Managment of global state "WishList"
  const wishListState = useSelector((state: RootState) => state.WishList);

  //Request from services
  useEffect(() => {
    wishListState.movies_ids.forEach((movieId: any) => {
      getAMovie(movieId).then((res: any) => {
        setList((prev) => {
          return [...prev, res];
        });
      });
    });
  }, []);

  //To handler responsive desing
  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  console.log('wishListState: ', wishListState)

  return (
    <Box
      sx={
        laptop
          ? {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              padding: "1em 3em",
            }
          : {
              padding: "1em 0",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }
      }
    >
      {list?.length > 0 ? (
        list.map((movie: any) => <CardMovie data={movie} key={movie?.id} />)
      ) : (
        <Typography sx={{ textAlign: "center", fontSize: "2em" }}>
          Aún no tiene peliculas en favoritos
        </Typography>
      )}
    </Box>
  );
};

export default WishList;
