import { Input, List, ListItemButton, ListItemText } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PostsContext } from "../../contexts/PostsContext";
const AutocompleteInput = ({ setSearchTerm, setCredentials, credentials }) => {
  const [predictions, setPredictions] = useState([]);
  const { setQueryLocation, displayCity, setDisplayCity, queryLocation } =
    useContext(PostsContext);
  const { id } = useParams();
  const location = useLocation();

  const getCityData = () => {
    if (
      location.pathname === "/" &&
      queryLocation &&
      queryLocation.latitude &&
      queryLocation.longitude
    ) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${queryLocation?.latitude},${queryLocation?.longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        )
        .then((res) => {
          setDisplayCity(res.data.results[0].formatted_address);
        });
    }

    if (location.pathname === "/create-post" && queryLocation) {
      console.log("coucou from create");
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${queryLocation?.latitude},${queryLocation?.longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        )
        .then((res) => {
          const result = res.data.results[0];
          const lastIndex = result.address_components.length - 1;
          setDisplayCity(result.formatted_address);
          setCredentials({
            ...credentials,
            lat: result.geometry.location.lat,
            lon: result.geometry.location.lng,
            postalCode:
              result.address_components[lastIndex] !== undefined
                ? result.address_components[lastIndex].long_name
                : "Non connu",
            adress: result.formatted_address,
          });
        });
    }
  };

  useEffect(() => {
    if (credentials) console.log(credentials);
  }, [credentials]);

  useEffect(() => {
    getCityData();
  }, [location.pathname, queryLocation]);

  useEffect(() => {
    if (id && credentials.adress) {
      console.log("coucou from update");
      console.log("credentials", credentials);
      setDisplayCity(credentials?.adress);
    }
  }, [id, credentials]);

  const handleInputChange = (event) => {
    setDisplayCity(event.target.value);
    if (event.target.value) {
      if (window.google) {
        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
          { input: event.target.value },
          (predictions) => {
            setPredictions(predictions);
          }
        );
      }
    } else {
      setPredictions([]);
    }
  };

  const handlePredictionClick = (prediction) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId: prediction.place_id }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const lastIndex = place.address_components.length - 1;
        setSearchTerm({
          lat: place.geometry.location.lat(),
          lon: place.geometry.location.lng(),
          city: place.name,
          postalCode:
            place.address_components[lastIndex] !== undefined
              ? place.address_components[lastIndex].long_name
              : "Non connu",
          adress: place.formatted_address,
        });
        setQueryLocation({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
        setDisplayCity(place.name);
        setPredictions([]);
      }
    });
  };

  return (
    <>
      <Input
        type="text"
        value={displayCity || ""}
        onChange={handleInputChange}
        sx={{
          width: "100%",
          "&:after": {
            borderBottom: "2px solid #ff6e14",
          },
        }}
        required
      />

      <List>
        {predictions ? (
          predictions.map((prediction, index) => (
            <ListItemButton
              sx={{ cursor: "pointer" }}
              key={index}
              onClick={() => handlePredictionClick(prediction)}
            >
              <ListItemText>{prediction.description}</ListItemText>
            </ListItemButton>
          ))
        ) : (
          <ListItemButton sx={{ cursor: "pointer" }}>
            <ListItemText>Aucune ville trouvée</ListItemText>
          </ListItemButton>
        )}
      </List>
    </>
  );
};

export default AutocompleteInput;
