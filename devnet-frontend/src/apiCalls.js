import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const userLogin = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const response = await axios.post(BASE_URL + "/auth/login", userCredentials);
        dispatch({type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) { 
        dispatch({type: "LOGIN_FAILURE", payload: error });
    }
}