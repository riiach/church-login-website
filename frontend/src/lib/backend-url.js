const proxyBackendBaseUrl = "/backend";

const trimTrailingSlash = value => value.replace(/\/+$/, "");

export const getBackendBaseUrl = () => {
    const envUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (typeof envUrl === "string" && envUrl.trim() !== "") {
        return trimTrailingSlash(envUrl.trim());
    }

    return proxyBackendBaseUrl;
};

export const getBackendApiBaseUrl = () => `${getBackendBaseUrl()}/api`;

export const getPlanningCenterRedirectUrl = () =>
    `${getBackendBaseUrl()}/auth/planning-center/redirect`;