import {FETCH_IMAGE_ERROR, FETCH_IMAGE_REQUEST, FETCH_IMAGE_SUCCESS} from "../action/galleryActions";



const initialState = {
    galleryLoading: false,
    gallery: null,
    galleryError: null,
};

const galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_IMAGE_REQUEST:
            return {...state, galleryLoading: true};
        case FETCH_IMAGE_SUCCESS:
            return {...state, galleryLoading: false, galleryError: null, gallery: action.response};
        case FETCH_IMAGE_ERROR:
            return {...state, galleryLoading: false, galleryError: action.error};

        default:
            return state;
    }
};

export default galleryReducer;