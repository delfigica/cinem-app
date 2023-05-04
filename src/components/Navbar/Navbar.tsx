import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuDrawer from "./MenuDrawer";

const Navbar = () => {
  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleChangeSearch = (e: any) => {
    let query = e.target.value.replace(/ /g, "%20");
    router.push("/search?query=" + query);
    setSearch(e.target.value);
  };

  return (
    <Box
      sx={
        laptop
          ? {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1em 3em",
              boxShadow: '0px 10px 59px -29px rgba(0,0,0,0.75)'
            }
          : {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1em",
            }
      }
    >
      <Link href="/" className="Link">
        <Typography
          color="primary"
          sx={
            laptop
              ? { fontSize: "2em", fontWeight: 600, cursor: "pointer" }
              : { fontSize: "1.5em", fontWeight: 600 }
          }
        >
          CocosMovies
        </Typography>
      </Link>
      {laptop ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "70%",
          }}
        >
          <TextField
            size="small"
            sx={{ width: "350px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Búsque un título de película"
            value={search}
            onChange={handleChangeSearch}
          />
          <Link href="/movies" style={{ textDecoration: "none" }}>
            <Typography color="secondary" sx={{ fontWeight: "600" }}>
              {" "}
              Películas
            </Typography>
          </Link>
          <Link
            href="/wishlist"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Typography color="secondary" sx={{ fontWeight: 600 }}>
              Favoritos
            </Typography>
            <IconButton color="secondary">
              <FavoriteIcon />
            </IconButton>
          </Link>
        </Box>
      ) : (
        <MenuDrawer />
      )}
    </Box>
  );
};

export default Navbar;
