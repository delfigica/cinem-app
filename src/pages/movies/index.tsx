import { useEffect, useState } from "react";
import { getDataPopularMovies } from "@/services/moviesData";

import { CardMovie } from "@/components/CardMovie/CardMovie";
import { Box, Pagination, useTheme, useMediaQuery } from "@mui/material";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";

export default function Movies() {
  //Initial states
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  //Request from services
  useEffect(() => {
    getDataPopularMovies(page).then((res) => {
      setPopularMovies(res);
      setLoading(false);
    });
  }, [page]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(() => {
      return value;
    });
    setLoading(true);
  };

  //To handle responsive desing
  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
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
        {loading ? (
          <>
            <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          </>
        ) : (
          popularMovies?.map((movie: any) => (
            <CardMovie data={movie} key={movie.id} />
          ))
        )}
      </Box>
      <Box
        sx={
          laptop
            ? { display: "grid", placeItems: "center", padding: "2em" }
            : { display: "grid", placeItems: "center", padding: "1em 0" }
        }
      >
        <Pagination
          count={10}
          page={page}
          color="primary"
          siblingCount={0}
          boundaryCount={1}
          onChange={handleChangePage}
          sx={laptop ? {} : { width: "300px" }}
        />
      </Box>
    </>
  );
}
