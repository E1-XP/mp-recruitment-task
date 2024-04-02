import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  const content = {
    titleText: "Mediporta task",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Container maxWidth="lg">
          <Toolbar>
            <Link href="/" className="text-decoration-none">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {content.titleText}
              </Typography>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
