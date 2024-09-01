import axios from "axios";

const BASE_URL = process.env.REACT_APP_DEV_URL;

export default axios.create({
  baseURL: BASE_URL,
});
