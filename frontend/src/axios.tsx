import axios from "axios";

const instance = axios.create({
    baseURL: "https://medium.devxhustler.workers.dev/api/v1",
});

export default instance;