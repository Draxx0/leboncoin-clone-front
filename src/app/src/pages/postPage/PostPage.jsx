import { Button, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postsService from "../../../../api/services/posts.service";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "95%",
  border: "2px solid #000",
  boxShadow: 24,
};

const PostPage = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxImage, setMaxImage] = useState(0);
  const navigate = useNavigate();

  const getPost = async () => {
    await postsService.getOne(id).then((res) => setPost(res));
  };

  const handleNext = () => {
    if (currentIndex < maxImage - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(maxImage - 1);
    }
  };

  const handleOpen = (index) => {
    setOpen(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (id) getPost();
  }, [id]);

  useEffect(() => {
    if (post) {
      setMaxImage(post.uploadFiles?.length);
    }
  }, [post]);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          position: "relative",
          cursor: post.uploadFiles?.length > 1 ? "pointer" : "default",
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: "20px",
            left: "50px",
            backgroundColor: "#ff6e14",
            color: "white",
            border: "2px solid #ff6e14",
            fontWeight: "bold",
            zIndex: "100",
            "&:hover": {
              background: "transparent",
              border: "2px solid #ff6e14",
              color: "#ff6e14",
            },
          }}
        >
          Retour
        </Button>
        <Grid xs={post?.uploadFiles?.length >= 3 ? 6 : 12}>
          {post._id && post.uploadFiles.length > 0 && (
            <Box
              onClick={
                post?.uploadFiles?.length > 1 ? () => handleOpen(0) : null
              }
              sx={{
                width: "100%",
                height: "500px",
                backgroundImage: `url(${post?.uploadFiles[0]?.Location})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transition: "all 0.4s ease-in-out",
                "&:hover": {
                  opacity: post?.uploadFiles?.length > 1 ? "0.8" : "1",
                },
              }}
            ></Box>
          )}
        </Grid>
        <Grid xs={post?.uploadFiles?.length >= 3 ? 6 : 0}>
          {post._id && post.uploadFiles.length > 0 && (
            <>
              <Box
                onClick={() => handleOpen(1)}
                sx={{
                  width: "100%",
                  height: "250px",
                  backgroundImage: `url(${post?.uploadFiles[1]?.Location})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  transition: "all 0.4s ease-in-out",
                  "&:hover": {
                    opacity: "0.8",
                  },
                }}
              ></Box>
              <Box
                onClick={() => handleOpen(2)}
                sx={{
                  width: "100%",
                  height: "250px",
                  backgroundImage: `url(${post?.uploadFiles[2]?.Location})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  transition: "all 0.4s ease-in-out",
                  "&:hover": {
                    opacity: "0.8",
                  },
                }}
              ></Box>
            </>
          )}
        </Grid>

        {post.uploadFiles?.length > 1 && (
          <Button
            sx={{
              position: "absolute",
              right: "20px",
              bottom: "20px",
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
            onClick={() => setOpen(true)}
          >
            Voir les photos
          </Button>
        )}
      </Grid>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {post.uploadFiles?.length > 0 && (
            <Box>
              <Box
                src={post.uploadFiles[currentIndex].Location}
                alt=""
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundImage: `url(${post?.uploadFiles[currentIndex]?.Location})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  border: "2px solid #ff6e14",
                }}
              ></Box>
              <CancelIcon
                onClick={() => setOpen(false)}
                sx={{
                  position: "absolute",
                  right: "20px",
                  top: "20px",
                  fontSize: "3rem",
                  cursor: "pointer",
                  color: "#ff6e14",
                }}
              />
              <ArrowForwardIcon
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: "2%",
                  top: "50%",
                  transform: "translateX(50%)",
                  fontSize: "3rem",
                  color: "#ff6e14",
                  cursor: "pointer",
                }}
              />
              <ArrowBack
                onClick={handlePrevious}
                sx={{
                  position: "absolute",
                  left: "2%",
                  top: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "3rem",
                  color: "#ff6e14",
                  cursor: "pointer",
                }}
              />
            </Box>
          )}
        </Box>
      </Modal>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "80%",
          margin: "50px auto auto auto",
        }}
      >
        <Typography variant="h4">{post.title}</Typography>
        <Typography variant="p" sx={{ color: "text.secondary" }}>
          {post.description}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <LocationOnIcon sx={{ color: "#ff6e14", fontSize: "40px" }} />
          <Typography variant="p">{post.adress}</Typography>
          <Button
            LinkComponent={Link}
            to={`/create-post/${post._id}`}
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
            Modifier l'annonce
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PostPage;
