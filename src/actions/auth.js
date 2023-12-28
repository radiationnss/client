import axios from "axios";
import { GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAIL } from "./types";

const googleAuthenticate = (state, code) => async dispatch => {
    if (state && code) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const details = {
            'state': state,
            'code' : code
        }

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`http://127.0.0.1:8000/auth/o/google-oauth2/?${formBody}`, config)
            console.log(formBody)

            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: GOOGLE_AUTH_FAIL
            })
        }
    }
}

export default googleAuthenticate;