import axios from "axios";
import { hostName } from "../constants";

const getShortURL = params => {
  return axios
    .post(`${hostName}/api/url/shorten`, params)
    .then(response => response)
    .catch(function(error) {
      return error;
    });
};

export { getShortURL };
