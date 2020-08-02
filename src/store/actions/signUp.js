import * as actionTypes from './actionTypes';
import axios from 'axios';


export const signUpSuccess = (formData,customerId) => {
    return {
        type: actionTypes.SIGN_UP_SUCCESS,
        fromData: formData,
        customerId: customerId
    }
};

export const signUpFail = (error) => {
    return {
        type: actionTypes.SIGN_UP_FAIL,
        error: error
        
    }
};

export const signUpStart = () => {
    return {
        type: actionTypes.SIGN_UP_START
    };
};

export const signUp = (formData,history) => {
    return dispatch => {
        dispatch(signUpStart());
        axios.post('http://localhost:3000/createCustomer',{...formData})
            .then(response => {
                console.log(response.data.data,response.data.data.customerId);
                dispatch(signUpSuccess(response.data.data,response.data.data.customerId));
                history.push('/otp');
            })
            .catch( error => {
                console.log(error.message)
                dispatch(signUpFail( error));
            });
    };
};