import { Container } from "@/components/Layout/Container";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { CardMovie } from "@/components/CardMovie/CardMovie";

const WishList = () => {
  const wishListState = useSelector((state: RootState) => state.WishList);

  console.log(wishListState.movies_ids);

  const [list, setList] = useState<any[]>([]);

  const apiKey = process.env.API_KEY;

  useEffect(() => {
    wishListState.movies_ids.forEach((movieId: any) => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-MX`
        )
        .then((res: any) => {
          setList((prev) => {
            return [...prev, res.data];
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container>
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
        {list.length > 0 ? (
          list.map((movie: any) => <CardMovie data={movie} key={movie.id} />)
        ) : (
          <Typography sx={{ textAlign: "center", fontSize: '2em' }}>
            Aún no tiene peliculas en favoritos
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default WishList;
