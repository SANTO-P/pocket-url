import axios from "axios";

const getURLstatistics = params => {
  return axios
    .post("http://localhost:5000/api/url/statistics", params)
    .then(response => response)
    .catch(function(error) {
      return error;
    });
};

export { getURLstatistics };
