import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MenuDrawer from "./MenuDrawer";

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  const [search, setSearch] = useState<any>("");

  const router = useRouter();
  const { query } = router.query;

  const handleChangeSearch = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
    let query = e.target.value.replace(/ /g, "%20");
    router.push("/search?query=" + query);
  };

  useEffect(() => {
    if (query) {
      setSearch(query);
    }
  }, []);

  return (
    <Box
      sx={
        laptop
          ? {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1em 3em",
              boxShadow: "0px 10px 59px -29px rgba(0,0,0,0.75)",
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
        <Box sx={{ width: "140px" }}>
          <img src="/logo.png" alt="cocos movies" />
        </Box>
      </Link>
      {laptop ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              href="/movies"
              style={{ textDecoration: "none", marginRight: "1rem" }}
            >
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
            </Link>
          </Box>
        </Box>
      ) : (
        <MenuDrawer />
      )}
    </Box>
  );
};

export default Navbar;
