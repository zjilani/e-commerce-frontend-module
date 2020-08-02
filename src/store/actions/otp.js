import * as actionTypes from './actionTypes';
import axios from 'axios';

export const otpVerificationSuccess = (otp,customerId,otpVerified) => {
    return {
        type: actionTypes.OTP_VERIFICATION_SUCCESS,
        otp: otp,
        customerId: customerId,
        otpVerified: otpVerified
    }
};

export const otpVerificationFail = (error) => {
    return {
        type: actionTypes.OTP_VERIFICATION_FAIL,
        error: error
        
    }
};

export const otpVerficationStart = () => {
    return {
        type: actionTypes.OTP_VERIFICATION_START
    };
};

export const otpVerification = (otp,customerId, history) => {
    return dispatch => {
        dispatch(otpVerficationStart());
        console.log(otp,customerId)
        axios.post('http://localhost:5001/otpVerification?customerId=' + customerId +'&otp=' + otp)
            .then(response => {
                console.log(response.data);
                let otpVerified = response.data.data.otpVerified
                dispatch(otpVerificationSuccess(otp,customerId,otpVerified))
                if(response.data.data.otpVerified){
                    axios.post("http://localhost:5000/notifyCustomer",{customerId:customerId, subject:"ACCONUT REGISTERED SUCCESSFULLY !!!", template: "welcome"})
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                }
                

                // history.push('/');
            })
            .catch( error => {
                console.log(error)
                dispatch(otpVerificationFail( error));
            });
    };
};

export const otpByMailStart = () => {
    return {
        type: actionTypes.OTP_BY_MAIL_START
    };
};
export const otpByMailSuccess = (customerId) => {
    return {
        type: actionTypes.OTP_BY_MAIL_SUCCESS,
        customerId: customerId
    };
};
export const otpByMailFail = (error) => {
    return {
        type: actionTypes.OTP_BY_MAIL_FAIL,
        error: error
    };
};

export const otpByMail = (customerId) => {
    return dispatch => {
        dispatch(otpByMailStart());
        axios.post('http://localhost:5000/sendMail?customerId='+ customerId)
                    .then(res => {
                        console.log(res)
                        dispatch(otpByMailSuccess(customerId))
                    })
                    .catch(err => {
                        console.log(err)
                        dispatch(otpByMailFail(err))
                    })
    };
};