import Navbar from "../Navbar/Navbar";
import { Box } from "@mui/material";

export const Container = (props: any) => {
  return (
    <Box>
      <Navbar />
      {props.children}
    </Box>
  );
};
