import Link from "next/link";
import { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuDrawer from "./MenuDrawer";

const Navbar = () => {
  const [user, setUser] = useState(true);

  const theme = useTheme();

  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={
        laptop
          ? {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1em 3em",
            }
          : {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1em",
            }
      }
    >
      <Typography color="primary" sx={laptop ? { fontSize: "2em", fontWeight: 600 } : { fontSize: "1.5em", fontWeight: 600 }}>
        CocosMovies
      </Typography>
      {
        laptop ? (<Box
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
          />
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography color="secondary" sx={{ fontWeight: "600" }}>
              {" "}
              Películas
            </Typography>
          </Link>
          {user ? (
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Typography color="primary" sx={{ fontWeight: 600 }}>
                Lista de favoritos
              </Typography>
              <IconButton color="primary">
                <FavoriteIcon />
              </IconButton>
            </Link>
          ) : (
            <>
              <Link href="/">
                <Button sx={{ fontWeight: 600 }} color="secondary">
                  Registrarse
                </Button>
              </Link>
              <Link href="/">
                <Button variant="contained" sx={{ fontWeight: 600 }}>
                  Iniciar Sesión
                </Button>
              </Link>
            </>
          )}
        </Box>) : (<MenuDrawer />)
      }
      
    </Box>
  );
};

export default Navbar;
