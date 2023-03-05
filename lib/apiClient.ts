import axios from "axios";
import { BASE_API } from "../config/config";

export default axios.create({
  baseURL: `http://${BASE_API}`,
  headers: {
    "Content-Type": "application/json",
  }
});
