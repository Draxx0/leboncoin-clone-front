import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        borderBottom: "1px solid gray",
        padding: "20px 0",
        displat: "flex",
        flexDirection: "column",
        gap: "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Typography
          component="span"
          sx={{ fontSize: "40px", color: "#ff6e14", fontWeight: "bold" }}
        >
          leboncoin
        </Typography>

        <Button
          LinkComponent={Link}
          to="/create-post"
          variant="outlined"
          sx={{
            backgroundColor: "#ff6e14",
            color: "white",
            border: "2px solid #ff6e14",
            fontWeight: "bold",
            "&:hover": {
              background: "transparent",
              border: "2px solid #ff6e14",
              color: "#ff6e14",
            },
          }}
        >
          Déposer une annonce
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
