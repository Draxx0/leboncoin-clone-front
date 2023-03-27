import { Box, Button, Chip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import postsService from "../../../../api/services/posts.service";
import { PostsContext } from "../../contexts/PostsContext";
import Autocomplete from "../autocomplete/Autocomplete";

const Filter = () => {
  const [searchTerm, setSearchTerm] = useState({});
  const [cityBadge, setCityBadge] = useState("");
  const {
    displayCity,
    setDisplayCity,
    setPosts,
    queryLocation,
    setQueryLocation,
  } = useContext(PostsContext);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQueryLocation({ latitude, longitude });
      });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await postsService.getAll(queryLocation).then((data) => {
        setPosts(data);
        setCityBadge(displayCity);
        setDisplayCity("");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setCityBadge("");
    try {
      await postsService.getAll().then((data) => {
        setPosts(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        margin: "40px auto",
        width: "50%",
      }}
    >
      <Box component="form" onSubmit={handleSearch}>
        <Autocomplete searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button
          type="submit"
          sx={{
            backgroundColor: "#ff6e14",
            color: "white",
            border: "2px solid #ff6e14",
            fontWeight: "bold",
            padding: "5px 20px",
            margin: "auto",
            width: "100%",
            "&:hover": {
              background: "transparent",
              border: "2px solid #ff6e14",
              color: "#ff6e14",
            },
          }}
        >
          Rechercher
        </Button>
      </Box>

      {cityBadge && (
        <Chip
          sx={{
            border: "2px solid #ff6e14",
            background: "transparent",
            color: "#ff6e14",
            fontWeight: "bold",
            marginTop: "20px",
            "& .MuiSvgIcon-root": {
              "& path": {
                fill: "#ff6e14",
              },
            },
          }}
          label={cityBadge}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default Filter;
