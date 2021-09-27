import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin":"*" 
  }
});

export const formData = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "multipart/form-data",
    "Access-Control-Allow-Origin":"*" 
  }
});
