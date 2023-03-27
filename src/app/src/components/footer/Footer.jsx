import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        padding: "20px 0",
        textAlign: "center",
        borderTop: "1px solid gray",
        height: "100px",
      }}
    >
      <p>© 2023 - All rights reserved</p>
    </Box>
  );
};

export default Footer;
