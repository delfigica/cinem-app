import Link from "next/link";
import { useState } from "react";

import {
  Drawer,
  IconButton,
  Box,
  TextField,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";

const MenuDrawer = () => {
  const [user, setUser] = useState(true);

  const [openDrawer, setOpenDrawer] = useState(false);

  const theme = useTheme();

  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

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
            />
            <Link
              href="/"
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
            {user ? (
              <Link
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  justifyContent: "center",
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
                <hr />
                <Link href="/">
                  <Button
                    sx={{ fontWeight: 600, margin: "15px 0px" }}
                    fullWidth
                    color="secondary"
                  >
                    Registrarse
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ fontWeight: 600 }}
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
