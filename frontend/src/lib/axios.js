import Axios from  "axios";

const axios = Axios.create({
    baseURL: "/backend",
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json",
    },
});

export default axios;