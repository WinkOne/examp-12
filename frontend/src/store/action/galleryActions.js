import axiosApi from '../../axios-api';
import {push} from 'connected-react-router';

export const FETCH_IMAGE_REQUEST = 'FETCH_IMAGE_REQUEST';
export const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS';
export const FETCH_IMAGE_ERROR = 'FETCH_IMAGE_ERROR';

export const fetchImageRequest = () => {
    return {type: FETCH_IMAGE_REQUEST}
};

export const fetchImageSuccess = (response) => {
    return {type: FETCH_IMAGE_SUCCESS, response}
};

export const fetchImageError = (error) => {
    return {type: FETCH_IMAGE_ERROR, error}
};
export const createImage = (data) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {'Authorization': 'Token ' + token};
        await axiosApi.post('/gallery', data, {headers});
        dispatch(push('/'))
    }
}
export const getImage = (id) => {
    let url = '/gallery'
    if (id){
        url += '?user=' + id
    }
    return async (dispatch) => {
        dispatch(fetchImageRequest());
        return axiosApi.get(url).then(response => {
            dispatch(fetchImageSuccess(response.data));
        }, error => {
            dispatch(fetchImageError(error));
        });
    }
};


export const deleteImage = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {'Authorization': 'Token ' + token};
        await axiosApi.delete('/gallery/' + id, {headers});
        dispatch(getImage());
    }
};