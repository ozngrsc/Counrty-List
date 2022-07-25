import axios from "axios";

const instance = axios.create({
  baseURL: "https://restcountries.com/v2/all",
});

export default instance;
