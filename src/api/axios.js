import axios from "axios";

const BASE_URL = "https://server-trading-app-production.up.railway.app/";

export default axios.create({
  baseURL: BASE_URL,
});
