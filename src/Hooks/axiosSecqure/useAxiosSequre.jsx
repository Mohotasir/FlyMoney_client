import axios from "axios"
const axiosSequre = axios.create({
    baseURL : "http://localhost:5173"
})
export default function useAxiosSequre() {
  return axiosSequre;
}