import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postsService from "../../../../../api/services/posts.service";
import Dropzone from "../../dropzone/Dropzone";
import AutocompleteInput from "../../autocomplete/Autocomplete";
import "./FormPost.css";
import { UiContext } from "../../../contexts/UiContext";
import Stepform from "../../stepform/Stepform";

const FormPost = () => {
  const [credentials, setCredentials] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);
  const { setIsLoading, isLoading } = useContext(UiContext);
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams();

  const navigate = useNavigate();

  const getPost = async () => {
    try {
      await postsService.getOne(id).then((res) => setCredentials(res));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let editMode = id ? true : false;
    setIsLoading(true);
    try {
      const method = editMode ? "update" : "create";
      if (method === "create") {
        await postsService.create(credentials);
      } else {
        await postsService.update(id, credentials);
      }
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);

  useEffect(() => {
    if (files) {
      setCredentials({ ...credentials, uploadFiles: files });
    }
  }, [files]);

  useEffect(() => {
    if (searchTerm) {
      setCredentials({ ...credentials, ...searchTerm });
    }
  }, [searchTerm]);

  return (
    <>
      {isLoading && (
        <Box component="div" className="loader_wrap">
          <Box className="loader-overlay"></Box>
          <Box className="loader"></Box>
        </Box>
      )}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "60px",
          width: "60%",
          margin: "auto",
          position: "relative",
        }}
      >
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          sx={{
            backgroundColor: "#ff6e14",
            color: "white",
            border: "2px solid #ff6e14",
            fontWeight: "bold",
            position: "absolute",
            top: "0px",
            left: "-250px",
            "&:hover": {
              background: "transparent",
              border: "2px solid #ff6e14",
              color: "#ff6e14",
            },
          }}
        >
          Revenir à l'accueil
        </Button>

        <Stepform
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          credentials={credentials}
          handleSubmit={handleSubmit}
        />

        {activeStep === 0 && (
          <>
            <Typography
              variant="h3"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {id ? "Modifier votre annonce" : "Déposer une annonce"}
            </Typography>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel
                htmlFor="title"
                sx={{
                  "&.Mui-focused": {
                    color: "#ff6e14",
                  },
                }}
              >
                Que vendez-vous ?
              </InputLabel>
              <Input
                id="title"
                aria-describedby="my-helper-text"
                name="title"
                onChange={handleChange}
                value={credentials.title || ""}
                sx={{
                  "&:after": {
                    borderBottom: "2px solid #ff6e14",
                  },
                }}
                required
              />
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <InputLabel
                htmlFor="title"
                sx={{
                  "&.Mui-focused": {
                    color: "#ff6e14",
                  },
                }}
              >
                Votre addresse
              </InputLabel>
              <AutocompleteInput
                setCredentials={setCredentials}
                credentials={credentials}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <InputLabel
                htmlFor="my-input"
                sx={{
                  "&.Mui-focused": {
                    color: "#ff6e14",
                  },
                }}
              >
                Description de l'annonce
              </InputLabel>
              <Input
                id="description"
                aria-describedby="description-text"
                name="description"
                onChange={handleChange}
                value={credentials.description || ""}
                rows={4}
                multiline
                sx={{
                  "&:after": {
                    borderBottom: "2px solid #ff6e14",
                  },
                }}
                required
              />
            </FormControl>
          </>
        )}

        {activeStep === 1 && (
          <>
            <Dropzone
              files={files}
              setFiles={setFiles}
              credentials={credentials}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default FormPost;
