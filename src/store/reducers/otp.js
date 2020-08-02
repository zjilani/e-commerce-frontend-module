import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initalState = {
    error:null,
    loading: false,
    otp: null,
    customerId: null,
    otpVerified:null

};
const otpVerificationStart = (state,action) => {
    return updateObject(state,{error:null, loading: true});
};
const otpVerificationSuccess = (state,action) => {

    return updateObject(state,{
        error:null,
        loading: false,
        otp: action.otp,
        customerId: action.customerId,
        otpVerified:action.otpVerified
    });
};
const otpVerificationFail = (state,action) => {
    return updateObject(state,{
        error: action.error,
        loading: false
    });
};

const reducer = (state=initalState , action) => {
    switch (action.type) {
        case actionTypes.OTP_VERIFICATION_START: return otpVerificationStart(state,action);
        case actionTypes.OTP_VERIFICATION_SUCCESS: return otpVerificationSuccess(state,action);
        case actionTypes.OTP_VERIFICATION_FAIL: return otpVerificationFail(state,action);
        default: return state;
    }
}

export default reducer;