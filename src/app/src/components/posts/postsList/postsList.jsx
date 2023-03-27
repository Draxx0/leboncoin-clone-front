import { Grid, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postsService from "../../../../../api/services/posts.service";
import { PostsContext } from "../../../contexts/PostsContext";
import Post from "../post/Post";

const PostsList = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const navigate = useNavigate();

  const getPosts = async () => {
    await postsService.getAll().then((data) => {
      setPosts(data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Grid container spacing={2} sx={{ marginTop: "50px" }}>
      {posts?.length > 0 ? (
        posts?.map((post) => (
          <Grid
            item
            xs={4}
            key={post._id}
            onClick={() => navigate(`post/${post._id}`)}
          >
            <Post post={post} />
          </Grid>
        ))
      ) : (
        <Typography component="p" sx={{ textAlign: "center", width: "100%" }}>
          Aucune annonce pour l'instant ...
        </Typography>
      )}
    </Grid>
  );
};

export default PostsList;
