import Link from "next/link";

import { Card, CardMedia, useTheme, useMediaQuery } from "@mui/material";

export const CardMovie = ({ data }: any) => {
  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

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
