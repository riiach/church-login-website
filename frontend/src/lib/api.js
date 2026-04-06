import Axios from  "axios";

import { getBackendApiBaseUrl } from "./backend-url";

const axios = Axios.create({
    baseURL: getBackendApiBaseUrl(),
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials:true
});

export default axios;