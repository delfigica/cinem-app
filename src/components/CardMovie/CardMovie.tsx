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
                margin: "15px",
                cursor: "pointer",
              }
            : { widht: "250px", margin: "10px" }
        }
      >
        <CardMedia
          image={"https://image.tmdb.org/t/p/w500" + data.poster_path}
          sx={{ backgroundSize: "contained", width: "100%" }}
          component="img"
        />
      </Card>
    </Link>
  );
};
