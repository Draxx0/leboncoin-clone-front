import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Filter from "../../components/filter/Filter";
import PostsList from "../../components/posts/postsList/postsList";

const Home = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        component="h1"
        sx={{ fontSize: "30px", textAlign: "center", fontWeight: "bold" }}
      >
        Des millions de petites annonces et autant d’occasions de se faire
        plaisir
      </Typography>
      <Filter />
      <PostsList />
    </Box>
  );
};

export default Home;
