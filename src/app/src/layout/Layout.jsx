import { Box } from "@mui/material";
import { useContext } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { UiContext } from "../contexts/UiContext";

const Layout = ({ children }) => {
  const { isLoading } = useContext(UiContext);
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        filter: isLoading ? "blur(2px)" : "none",
        overflow: isLoading ? "hidden" : "auto",
      }}
    >
      <Header />

      <Box
        component="main"
        sx={{
          paddingBottom: "200px",
          position: "relative",
          marginTop: "50px",
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
