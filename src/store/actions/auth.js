import axios from 'axios';

import  * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, customerId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        customerId: customerId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authOtpFail = (customerId) => {
    return {
        type: actionTypes.AUTH_OTP_FAIL,
        customerId: customerId
    };
};

export const auth = (formData,history) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:5001/loginVerification',{...formData})
            .then( response => {
                if(response.data.message){
                    console.log("Success ",response.data)
                    if(response.data.message === "OTP Verification Needed !!!"){
                        history.push('/otp');
                        dispatch(authOtpFail( response.data.data.customerId ))
                    }
                    else{
                        dispatch(authFail( response.data ))
                    }
                    
                }
                else{
                    console.log(response.data.data.tokens[0].token)
                    localStorage.setItem('token', response.data.data.tokens[0].token);
                    localStorage.setItem('customerId', response.data.data.customerId);
                    dispatch(authSuccess(response.data.data.tokens[0].token,response.data.data.customerId))
                }
            })
            .catch(error => {
                console.log("ERROR ", error)
                dispatch(authFail( error ))
            })
    };
};