import Axios from  "axios";

const axios = Axios.create({
    baseURL: "/backend/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials:true
});

export default axios;