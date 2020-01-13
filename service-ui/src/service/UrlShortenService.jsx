import axios from "axios";

const getShortURL = params => {
  return axios
    .post("http://localhost:5000/api/url/shorten", params)
    .then(response => response)
    .catch(function(error) {
      return error;
    });
};

export { getShortURL };
