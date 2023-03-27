import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ImageList, ImageListItem } from "@mui/material";
const Stepform = ({ activeStep, setActiveStep, handleSubmit, credentials }) => {
  const steps = ["Informations de l'annonce", "Ajouter des photos"];

  const handleNext = () => {
    window.scrollTo(0, 0);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const displayBlobImages = (files) => {
    files.map((file) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file.preview);

      return (
        <ImageList>
          <ImageListItem>
            <img src={link.href} alt="uploaded" />
          </ImageListItem>
        </ImageList>
      );
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step
              key={label}
              {...stepProps}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "#ff6e14",
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white",
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#ff6e14",
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white",
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "common.white",
                },
              }}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep !== steps.length && (
        <>
          <Typography
            sx={{ mt: 2, mb: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Etape {activeStep + 1}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              position: "absolute",
              bottom: "-75px",
              width: "100%",
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Retour
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
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
              type="button"
            >
              {activeStep === steps.length - 1 ? "Publier" : "Suivant"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Stepform;
