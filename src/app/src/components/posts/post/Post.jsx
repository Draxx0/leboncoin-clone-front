import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import './Post.css'

const Post = ({ post }) => {
  return (
    <Card
      className="post"
      sx={{
        display: "flex",
        height: "300px",
        transition: "all 0.3s ease-in-out",
        border: "2px solid transparent",
        cursor: "pointer",
        "&:hover": { transform: "translateY(-10px)", border: "2px solid #ff6e14"},
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
        }}
      >
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography component="div" variant="h5">
            {post.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {post.description.length > 100
              ? post.description.substring(0, 100) + "..."
              : post.description}
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="small"
          >
            {post.adress}
          </Typography>

          <Button
            componentlink="Link"
            variant="outlined"
            to={`post/${post._id}`}
            sx={{
              backgroundColor: "transparent",
              color: "#ff6e14",
              border: "2px solid #ff6e14",
              fontWeight: "bold",
              "&:hover": {
                background: "#ff6e14",
                border: "2px solid #ff6e14",
                color: "white",
              },
            }}
          >
            Voir plus
          </Button>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "40%" }}
        image={post.uploadFiles[0]?.Location}
      />
    </Card>
  );
};

export default Post;
