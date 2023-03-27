import axios from "axios";

const endPoint = "/posts";

const getAll = async (location) => {
  if (location) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}${endPoint}?lat=${location.latitude}&lon=${location.longitude}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}${endPoint}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

const getOne = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${endPoint}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const create = async (credentials) => {
  const formData = new FormData();
  formData.append("title", credentials.title);
  formData.append("description", credentials.description);
  formData.append("adress", credentials.adress);
  formData.append("city", credentials.city);
  formData.append("postalCode", credentials.postalCode);
  formData.append("lat", credentials.lat);
  formData.append("lon", credentials.lon);

  credentials.uploadFiles.forEach((file) => {
    formData.append("files", file.file);
  });

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${endPoint}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, credentials) => {
  const formData = new FormData();

  formData.append("title", credentials.title);
  formData.append("description", credentials.description);
  formData.append("adress", credentials.adress);
  formData.append("city", credentials.city);
  formData.append("postalCode", credentials.postalCode);
  formData.append("lat", credentials.lat);
  formData.append("lon", credentials.lon);

  credentials.uploadFiles.forEach((file) => {
    if (file._id) {
      formData.append("uploadFiles[]", file._id);
    }
    if (!file._id) {
      formData.append("files", file.file);
    }
  });

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${endPoint}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postsService = {
  getAll,
  getOne,
  create,
  update,
};

export default postsService;
