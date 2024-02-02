
/** || React API Base URL */
export const API_BASE_URL = process.env.REACT_APP_API_URL;

export const LOGIN = `${API_BASE_URL}api/v1/auth/login`;
export const REGISTER = `${API_BASE_URL}api/v1/auth/register`;
export const GET_USER = `${API_BASE_URL}api/v1/user/get-user`;