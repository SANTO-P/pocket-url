import axios from "axios";

const getShortURL = params => {
  return axios
    .post("http://localhost:5000/api/url/shorten", params)
    .then(response => response.data)
    .catch(function(error) {
      console.log(error);
    });
};

export { getShortURL };
