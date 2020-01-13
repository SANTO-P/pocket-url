import axios from "axios";
import { hostName } from "../constants";

const getURLstatistics = params => {
  return axios
    .post(`${hostName}/api/url/statistics`, params)
    .then(response => response)
    .catch(function(error) {
      return error;
    });
};

export { getURLstatistics };
