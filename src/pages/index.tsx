import { Container } from "@/components/Layout/Container";

import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Box
        sx={{
          height: "70vh",
          background: "linear-gradient(to right, #3CCE88, #002C65)",
          display: "grid",
          placeItems: "center",
          borderRadius: "0px 0px 0px 100px",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "3em" }}>
          Descubre las películas en tendencia
        </Typography>
      </Box>
    </Container>
  );
}
