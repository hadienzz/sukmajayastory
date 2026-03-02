import axios from "axios";
import { getBackendBaseUrl } from "./backend-url";

const axiosInstance = axios.create({
  baseURL: getBackendBaseUrl(),
});

export default axiosInstance;
