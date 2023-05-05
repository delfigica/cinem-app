import Link from "next/link";
import { useState } from "react";

import {
  Drawer,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";

const MenuDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleChangeSearch = (e: any) => {
    let query = e.target.value.replace(/ /g, "%20");
    router.push("/search?query=" + query);
    setSearch(e.target.value);
  };

  return (
    <>
      <IconButton onClick={() => setOpenDrawer((prev) => !prev)}>
        <MenuIcon color="secondary" sx={{ fontSize: "1.2em" }} />
      </IconButton>
      <Drawer
        onClose={() => setOpenDrawer(false)}
        anchor="right"
        open={openDrawer}
      >
        <Box
          role="presentation"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "280px",
          }}
        >
          <IconButton
            color="info"
            sx={{
              textAling: "left",
              width: "50px",
              height: "50px",
            }}
            onClick={() => setOpenDrawer(false)}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              padding: "1em",
            }}
          >
            <TextField
              size="small"
              sx={{ width: "100%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Búsque un título de película"
              onChange={handleChangeSearch}
              value={search}
            />
            <Link
              href="/movies"
              style={{ textDecoration: "none", margin: "10px 0px" }}
            >
              <Typography
                color="secondary"
                sx={{
                  fontWeight: "600",
                  margin: "20px 0px",
                  textAlign: "center",
                }}
              >
                Películas
              </Typography>
            </Link>

            <Link
              href="/wishlist"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Typography color="secondary" sx={{ fontWeight: 600 }}>
                Favoritos
              </Typography>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
