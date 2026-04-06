import Axios from  "axios";

import { getBackendBaseUrl } from "./backend-url";

const axios = Axios.create({
    baseURL: getBackendBaseUrl(),
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json",
    },
});

export default axios;