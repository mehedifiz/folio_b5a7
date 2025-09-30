import axios from "axios";

const stored = localStorage.getItem("auth");
const tokenObj = stored ? JSON.parse(stored) : null;
const token = tokenObj?.token ?? ""; 

const axiosPublic = axios.create({
  baseURL: "http://localhost:7000/api",
  withCredentials: true,
  headers: {
    Authorization: token, 
  },
});

console.log("token " , token);

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
