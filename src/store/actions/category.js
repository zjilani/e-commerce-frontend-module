import * as actionTypes from './actionTypes';
import axios from 'axios';

export const categorySuccess = (data) => {
    return {
        type: actionTypes.CATEGORY_SUCCESS,
        data: data
    }
};

export const categoryFail = (error) => {
    return {
        type: actionTypes.CATEGORY_FAIL,
        error: error
        
    }
};

export const categoryStart = () => {
    return {
        type: actionTypes.CATEGORY_START
    };
};

export const category = () => {
    return dispatch =>{
        dispatch(categoryStart());
        axios.get('http://localhost:3001/getSubCategory')
            .then( response => {
                dispatch(categorySuccess(response.data.data));
            })
            .catch( err => {
                dispatch(categoryFail( err ));
            })
        
    };
};