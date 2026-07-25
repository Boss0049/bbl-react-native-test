import axios from "axios";

import { BASE_URL } from "../constants/general";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
