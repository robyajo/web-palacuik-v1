export const base_api = process.env.NEXT_PUBLIC_API_URL;
export const base_api_server = process.env.NEXT_PUBLIC_API_SERVER_DEV_URL;

const compare_api = base_api + "/api";

// =============== Auth ===============
export const API_LOGIN = compare_api + "/auth/login";
export const API_LOGOUT = compare_api + "/auth/logout";

// =============== PERMISSION ===============
export const API_PROFILE = `${compare_api}/profile`;