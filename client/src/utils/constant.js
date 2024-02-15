/** || React API Base URL */
export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const host = "http://localhost:8080";
export const LOGIN = `${API_BASE_URL}api/v1/auth/login`;
export const REGISTER = `${API_BASE_URL}api/v1/auth/register`;
export const GET_USER = `${API_BASE_URL}api/v1/user/get-user`;
export const GET_JOB = `${API_BASE_URL}api/v1/job/get-job`;
export const UPDATE_USER = `${API_BASE_URL}api/v1/user/update-user`;
export const GET_ALL_USER = `${API_BASE_URL}api/v1/user/get-all-users`;
export const allUsersRoute = `${API_BASE_URL}api/v1/user/allusers`;
