import { Grid, Icon, Input, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useParams } from "react-router-dom";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#ff6e14",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

function Dropzone({ files, setFiles, credentials }) {
  const [photos, setPhotos] = useState([{}, {}, {}, {}, {}, {}, {}]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setFiles(credentials.uploadFiles);
    }
  }, [id]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop: (acceptedFiles) => {
        const newFiles = [...files];
        acceptedFiles.forEach((file) => {
          console.log("new File", file)
          newFiles.push({
            file,
            preview: URL.createObjectURL(file),
          });
        });
        setFiles(newFiles);
      },
    });

  const handleDeleteImage = (e, index) => {
    e.stopPropagation();

    const newPhotos = [...photos];
    newPhotos[index] = {};
    newPhotos.sort((a, b) => {
      if (Object.keys(a).length > Object.keys(b).length) return -1;
      if (Object.keys(b).length > Object.keys(a).length) return 1;
      return 0;
    });
    setPhotos(newPhotos);

    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    const newPhotos = [...photos];
    files.forEach((file, index) => {
      newPhotos[index] = file;
    });
    setPhotos(newPhotos);
  }, [files]);

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Box className="container" sx={{ width: "100%" }}>
      <Box {...getRootProps({ style })}>
        <Input {...getInputProps()} />
        <Typography>
          Glisser ou seléctionner les images de votre produit
        </Typography>

        <Typography componenent="h4">Images :</Typography>
        <Box sx={{ width: "100%", marginTop: "40px" }}>
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              justifyContent: "center",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "2",
            }}
          >
            <Grid item xs={3}>
              <Box
                sx={{
                  border: "2px solid #ff6e14",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  height: "100%",
                  borderRadius: "5px",
                  transition: "all .2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#ff6e14",
                    color: "#fff",
                  },
                  "&:hover .MuiTypography-root": {
                    color: "#fff",
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "#fff",
                  },
                }}
              >
                <AddAPhotoIcon
                  sx={{ fontSize: "50px", color: "#ff6e14" }}
                ></AddAPhotoIcon>
                <Typography sx={{ color: "#ff6e14" }}>
                  Ajouter une image
                </Typography>
              </Box>
            </Grid>

            {photos.map((photo, index) => (
              <Grid key={index} item xs={3}>
                {photo.preview || photo.Location ? (
                  <Box
                    sx={{
                      border: "2px dashed #eeeeee",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      borderRadius: "5px",
                      height: "100%",
                      transition: "all .2s ease-in-out",
                      position: "relative",
                    }}
                  >
                    <Box
                      component="img"
                      src={id ? photo.Location || photo.preview : photo.preview}
                      style={img}
                      sx={{ boxSizing: "border-box" }}
                      alt=""
                      onLoad={
                        !id
                          ? () => {
                              URL.revokeObjectURL(photo.preview);
                            }
                          : null
                      }
                    />
                    <CancelIcon
                      sx={{
                        position: "absolute",
                        top: "-15px",
                        right: "-15px",
                        cursor: "pointer",
                        color: "#ff6e14",
                        fontSize: "40px",
                      }}
                      onClick={(e) => handleDeleteImage(e, index)}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      border: "2px dashed #eeeeee",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      borderRadius: "5px",
                      transition: "all .2s ease-in-out",
                    }}
                  >
                    <CameraAltIcon
                      sx={{ fontSize: "50px", color: "gray" }}
                    ></CameraAltIcon>
                    <Typography sx={{ color: "gray" }}>
                      Ajouter une image
                    </Typography>
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Dropzone;
